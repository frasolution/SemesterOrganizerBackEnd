import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as config from 'config';

import { AppModule } from './app.module';

async function bootstrap() {
  const serverConfig: any = config.get('server');
  const logger = new Logger('bootstrap');
  const port = serverConfig.port;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  await app.listen(3000);
  logger.log(`App is listening on port ${port}`);
}

bootstrap();
