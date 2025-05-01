import { Controller, Get, Body, Patch } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { SettingsDto } from '@/shared/generated/prisma/types/settings.dto';
import { UpdateSettingsDto } from '@/shared/dto/settings';

import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  /**
  * Get settings
  */
  @Get()
  @ApiOkResponse({type: SettingsDto})
  getSettings() {
    return this.settingsService.getSettings();
  }

  /**
  * Update settings
  */
  @Patch()
  @ApiOkResponse({type: SettingsDto})
  updateSettings(@Body() updateSettingDto: UpdateSettingsDto) {
    return this.settingsService.updateSettings(updateSettingDto);
  }
}
