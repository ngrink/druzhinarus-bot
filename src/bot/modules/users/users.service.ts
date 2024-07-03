import { User } from "@prisma/client"
import { CreateUserDto, UpdateUserDto } from "./dto"

type IUsersRepository = {
  createUser: (data: CreateUserDto) => Promise<User>
  getUsers: () => Promise<User[]>
  getUser: (id: number) => Promise<User | null>
  updateUser: (id: number, data: UpdateUserDto) => Promise<User | null>
  deleteUser: (id: number) => Promise<void>
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

    return user
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const user = await this.usersRepository.updateUser(id, data)

    return user
  }

  async deleteUser(id: number) {
    await this.usersRepository.deleteUser(id)
  }
}