import { PrismaClient, Settings } from '@prisma/client'
import { UpdateSettingsDto } from './dto/update-settings.dto'

export class SettingsRepository {
  prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async getSettings(): Promise<Settings> {
    let settings: Settings;

    try {
      settings = await this.prisma.settings.findFirstOrThrow()
    } catch (err) {
      settings = await this.prisma.settings.create({
        data: {
          photoSchedulerSpec: "0 18,21 * * *"
        }
      })
    }

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