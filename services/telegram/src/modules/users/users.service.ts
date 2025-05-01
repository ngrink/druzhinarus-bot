import { User } from "@prisma/client"
import { CreateUserDto, UpdateUserDto } from "./dto"

type IUsersRepository = {
  createUser: (data: CreateUserDto) => Promise<User>
  getUsers: () => Promise<User[]>
  getUser: (id: number) => Promise<User | null>
  updateUser: (id: number, data: UpdateUserDto) => Promise<User | null>
  deleteUser: (id: number) => Promise<User>
}

export class UsersService {
  usersRepository: IUsersRepository

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async createUser(data: CreateUserDto) {
    const user = await this.usersRepository.createUser(data)

    return user
  }
  
  async getUsers() {
    const users = await this.usersRepository.getUsers()

    return users
  }

  async getUser(id: number) {
    const user = await this.usersRepository.getUser(id)
    if (!user) {
      throw new Error(`User ${id} does not exist`);
    }

    return user
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const user = await this.usersRepository.updateUser(id, data)
    if (!user) {
      throw new Error(`User ${id} does not exist`);
    }

    return user
  }

  async deleteUser(id: number) {
    const user = await this.usersRepository.deleteUser(id)
    if (!user) {
      throw new Error(`User ${id} does not exist`);
    }
  }
}