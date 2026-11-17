import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { AppType } from '../../config/config.schema';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(config: ConfigService) {
    super({
      datasourceUrl: config.db.url,
      // В dev-режиме печатаем SQL, чтобы видеть, сколько запросов реально уходит в БД.
      log: config.app.appType === AppType.dev ? ['query', 'warn', 'error'] : ['warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
