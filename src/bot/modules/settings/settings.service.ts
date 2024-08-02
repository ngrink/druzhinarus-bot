import { Settings } from "@prisma/client"
import { UpdateSettingsDto } from "./dto/update-settings.dto"

type ISettingsRepository = {
  getSettings(): Promise<Settings>
  updateSettings(data: UpdateSettingsDto): Promise<Settings>
}

export class SettingsService {
  settingsRepository: ISettingsRepository

  constructor(settingsRepository: ISettingsRepository) {
    this.settingsRepository = settingsRepository
  }

  async getSettings() {
    return await this.settingsRepository.getSettings()
  }

  async updateSettings(data: UpdateSettingsDto) {
    return await this.settingsRepository.updateSettings(data)
  }
}