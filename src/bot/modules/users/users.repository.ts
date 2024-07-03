import { User, PrismaClient } from '@prisma/client'
import { CreateUserDto, UpdateUserDto } from './dto'

export class UsersRepository {
  prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: data
    })

    return user
  }
  
  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    return users
  }

  async getUser(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })

    return user
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User | null> {
    const user = await this.prisma.user.update({
      where: {
        id: id
      },
      data: data,
    })

    return user
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.prisma.user.delete({
      where: {
        id: id
      }
    })

    return user
  }
}