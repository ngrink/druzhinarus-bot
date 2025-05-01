import { Injectable } from '@nestjs/common';

import { User } from '@/shared/generated/prisma/client';
import { CreateUserDto, UpdateUserDto} from '@/shared/dto/users';
import { PrismaService } from '@/config/';


@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: data
    });

    return user
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    return users
  }

  async getUser(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })

    return user
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id: id
      },
      data: data,
    }).catch((error) => {
      if (error.code === 'P2025') {
        return null;
      } else {
        throw error;
      }
    })

    return user
  }

  async removeUser(id: number): Promise<User | null> {
    const user = await this.prisma.user.delete({
      where: {
        id: id
      },
    }).catch((error) => {
      if (error.code === 'P2025') {
        return null;
      } else {
        throw error;
      }
    })

    return user
  }
}
