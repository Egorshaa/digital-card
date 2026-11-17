import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const swagger = new DocumentBuilder()
    .setTitle('Digital Card API')
    .setDescription(
      [
        'Цифровая визитка. **Основной API — GraphQL**: Apollo Sandbox доступен на `/graphql`.',
        '',
        'Эти REST-ручки — тонкий фасад над теми же сервисами, они нужны для быстрого просмотра данных.',
      ].join('\n'),
    )
    .setVersion('1.0')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swagger));

  await app.listen(config.app.port, '0.0.0.0');
}
bootstrap();
