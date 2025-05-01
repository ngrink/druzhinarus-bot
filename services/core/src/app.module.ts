import { Module } from '@nestjs/common';

import { ConfigModule, PrismaModule } from '@/config';

import { AccountsModule } from '@/modules/accounts';
import { UsersModule } from '@/modules/users';
import { EventsModule } from '@/modules/events';
import { PhotosModule } from '@/modules/photos';
import { SettingsModule } from '@/modules/settings';
import { CategoriesModule } from '@/modules/categories';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    AccountsModule,
    UsersModule,
    EventsModule,
    PhotosModule,
    SettingsModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
