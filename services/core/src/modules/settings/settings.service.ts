import { Injectable } from '@nestjs/common';

import { UpdateSettingsDto } from '@/shared/dto/settings';
import { SettingsRepository } from './settings.repository';

@Injectable()
export class SettingsService {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async getSettings() {
    return await this.settingsRepository.getSettings()
  }

  async updateSettings(data: UpdateSettingsDto) {
    return await this.settingsRepository.updateSettings(data)
  }
}
