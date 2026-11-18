import { Injectable } from '@nestjs/common';

import type { Experience } from '@prisma/client';

import { groupByKey } from '../../common/group-by';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ListByProfileIdsQuery } from './experience.params';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  /** Один запрос на пачку профилей (используется DataLoader'ом). */
  async listByProfileIds(params: ListByProfileIdsQuery): Promise<Experience[][]> {
    const rows = await this.prisma.experience.findMany({
      where: { profileId: { in: [...params.profileIds] } },
      orderBy: [{ startDate: 'desc' }, { id: 'asc' }],
    });
    return groupByKey(params.profileIds, rows, row => row.profileId);
  }
}
