import { Injectable } from '@nestjs/common';

import type { ProfileLink } from '@prisma/client';

import { groupByKey } from '../../common/group-by';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class LinksService {
  constructor(private readonly prisma: PrismaService) {}

  /** Один запрос на пачку профилей (используется DataLoader'ом). */
  async listByProfileIds(profileIds: readonly number[]): Promise<ProfileLink[][]> {
    const rows = await this.prisma.profileLink.findMany({
      where: { profileId: { in: [...profileIds] } },
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
    return groupByKey(profileIds, rows, row => row.profileId);
  }
}
