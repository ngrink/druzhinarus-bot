import { SettingsRepository } from "./settings.repository";
import { SettingsService } from "./settings.service";

const settingsRepository = new SettingsRepository()
const settingsService = new SettingsService(settingsRepository)

export { 
  settingsService 
}