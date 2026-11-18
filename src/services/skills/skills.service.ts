import { Injectable } from '@nestjs/common';

import type { Skill } from '@prisma/client';

import { groupByKey } from '../../common/group-by';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ListByProfileIdsQuery } from './skills.params';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Один запрос на пачку профилей (используется DataLoader'ом). */
  async listByProfileIds(params: ListByProfileIdsQuery): Promise<Skill[][]> {
    const rows = await this.prisma.skill.findMany({
      where: { profileId: { in: [...params.profileIds] } },
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
    return groupByKey(params.profileIds, rows, row => row.profileId);
  }
}
