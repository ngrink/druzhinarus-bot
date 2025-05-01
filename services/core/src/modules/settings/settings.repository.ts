import { Injectable } from '@nestjs/common';

import { Settings } from '@/shared/generated/prisma/types/settings.entity';
import { UpdateSettingsDto } from '@/shared/dto/settings'
import { PrismaService } from '@/config';


@Injectable()
export class SettingsRepository {
  constructor(private readonly prisma: PrismaService) {}

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
