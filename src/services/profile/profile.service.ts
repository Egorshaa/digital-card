import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async get(slug?: string) {
    const profile = await this.prisma.profile.findFirst({
      where: slug ? { slug } : undefined,
      orderBy: { id: 'asc' },
    });
    if (!profile) {
      throw new NotFoundException(slug ? `Profile "${slug}" not found` : 'Profile not found');
    }
    return profile;
  }
}
