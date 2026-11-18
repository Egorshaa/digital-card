import { Injectable } from '@nestjs/common';

import type { Project } from '@prisma/client';

import { groupByKey } from '../../common/group-by';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ListByProfileIdsQuery } from './projects.params';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Один запрос на пачку профилей (используется DataLoader'ом). */
  async listByProfileIds(params: ListByProfileIdsQuery): Promise<Project[][]> {
    const rows = await this.prisma.project.findMany({
      where: { profileId: { in: [...params.profileIds] } },
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
    return groupByKey(params.profileIds, rows, row => row.profileId);
  }
}
