import { PrismaClient, Settings } from '@prisma/client'
import { UpdateSettingsDto } from './dto/update-settings.dto'

export class SettingsRepository {
  prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async getSettings(): Promise<Settings> {
    const settings = await this.prisma.settings.findFirstOrThrow()

    return settings
  }

  async updateSettings(data: UpdateSettingsDto): Promise<Settings> {
    const settings = await this.prisma.settings.update({
      where: {
        id: 1
      },
      data: data,
    })

    return settings
  }
}