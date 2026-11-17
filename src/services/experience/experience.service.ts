import { Injectable } from '@nestjs/common';

import type { Experience } from '@prisma/client';

import { groupByKey } from '../../common/group-by';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  /** Один запрос на пачку профилей (используется DataLoader'ом). */
  async listByProfileIds(profileIds: readonly number[]): Promise<Experience[][]> {
    const rows = await this.prisma.experience.findMany({
      where: { profileId: { in: [...profileIds] } },
      orderBy: [{ startDate: 'desc' }, { id: 'asc' }],
    });
    return groupByKey(profileIds, rows, row => row.profileId);
  }
}
