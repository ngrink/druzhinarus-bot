import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { Swagger, corsOptions } from '@/config';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swagger = new Swagger(app);

  app.enableCors(corsOptions)
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }))

  swagger.setup()
  await swagger.generate()

  await app.listen(process.env.APP_PORT ?? 7000);
}

bootstrap();
