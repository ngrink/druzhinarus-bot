import { Injectable } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '@/shared/dto/users';

import { UsersRepository } from './users.repository';
import { UsersException } from './users.exception';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: CreateUserDto) {
    const user = await this.usersRepository.createUser(data)

    return user
  }

  async getAllUsers() {
    const users = await this.usersRepository.getAllUsers()

    return users
  }

  async getUser(id: number) {
    const user = await this.usersRepository.getUser(id)
    if (!user) {
      throw UsersException.UserNotFound(id);
    }

    return user
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const user = await this.usersRepository.updateUser(id, data)
    if (!user) {
      throw UsersException.UserNotFound(id);
    }

    return user
  }

  async removeUser(id: number) {
    const user = await this.usersRepository.removeUser(id)
    if (!user) {
      throw UsersException.UserNotFound(id);
    }

    return user
  }
}
