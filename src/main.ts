import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppType } from './config/config.schema';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);

  app.enableCors({ origin: config.corsOrigins });
  app.useLogger(config.app.appType === AppType.prod ? ['error', 'warn', 'log'] : ['error', 'warn', 'log', 'debug']);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();

  await app.listen(config.app.port, '0.0.0.0');
}
bootstrap();
