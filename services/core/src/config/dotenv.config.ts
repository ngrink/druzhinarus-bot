import * as path from 'path';
import { ConfigModule as ConfigModule_, ConfigModuleOptions } from "@nestjs/config";

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: path.resolve(process.cwd(), 'env', `.env.${process.env.NODE_ENV}`)
}

export const ConfigModule = ConfigModule_.forRoot(configOptions)
