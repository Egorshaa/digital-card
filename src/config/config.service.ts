import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { AppType } from './config.schema';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get app() {
    return {
      port: Number(this.configService.get('PORT') ?? this.configService.get('APP_PORT') ?? 3000),
      appType: this.configService.get<AppType | keyof typeof AppType>('APP_TYPE') ?? AppType.prod,
    };
  }

  get corsOrigins(): string | string[] | boolean {
    const raw = this.configService.get<string>('CORS_ORIGINS')?.trim();
    if (!raw || raw === '*') {
      return this.app.appType === AppType.prod ? false : '*';
    }
    const origins = raw
      .split(',')
      .map(origin => origin.trim())
      .filter(Boolean);
    return origins.length === 1 ? origins[0]! : origins;
  }

  get db() {
    return { url: this.configService.getOrThrow<string>('DATABASE_URL') };
  }
}
