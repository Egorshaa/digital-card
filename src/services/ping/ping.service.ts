import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class PingService {
  constructor(private readonly prisma: PrismaService) {}

  /** Проверяет не только процесс, но и доступность БД. */
  async status() {
    await this.prisma.$queryRaw`SELECT 1`;
    return { status: 'ok' };
  }
}
