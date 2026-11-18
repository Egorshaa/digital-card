import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../common/prisma/prisma.service';
import { ExperienceService } from '../experience/experience.service';
import { LinksService } from '../links/links.service';
import { ProjectsService } from '../projects/projects.service';
import { SkillsService } from '../skills/skills.service';
import { toExperience, toLink, toProfile, toProject, toSkill } from './profile.mapper';
import { GetBySlugQuery } from './profile.params';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly linksService: LinksService,
    private readonly skillsService: SkillsService,
    private readonly experienceService: ExperienceService,
    private readonly projectsService: ProjectsService,
  ) {}

  async get(params: GetBySlugQuery) {
    const profile = await this.prisma.profile.findFirst({
      where: params.slug ? { slug: params.slug } : undefined,
      orderBy: { id: 'asc' },
    });
    if (!profile) {
      throw new NotFoundException(params.slug ? `Profile "${params.slug}" not found` : 'Profile not found');
    }
    return profile;
  }

  /** Визитка целиком для REST: профиль + 4 параллельных запроса к связанным таблицам. */
  async getFull(params: GetBySlugQuery) {
    const profile = await this.get(params);
    const ids = [profile.id];
    const [[links], [skills], [experience], [projects]] = await Promise.all([
      this.linksService.listByProfileIds({ profileIds: ids }),
      this.skillsService.listByProfileIds({ profileIds: ids }),
      this.experienceService.listByProfileIds({ profileIds: ids }),
      this.projectsService.listByProfileIds({ profileIds: ids }),
    ]);
    return toProfile(profile, { links, skills, experience, projects });
  }

  async links(params: GetBySlugQuery) {
    const profile = await this.get(params);
    const [rows] = await this.linksService.listByProfileIds({ profileIds: [profile.id] });
    return rows.map(toLink);
  }

  async skills(params: GetBySlugQuery) {
    const profile = await this.get(params);
    const [rows] = await this.skillsService.listByProfileIds({ profileIds: [profile.id] });
    return rows.map(toSkill);
  }

  async experience(params: GetBySlugQuery) {
    const profile = await this.get(params);
    const [rows] = await this.experienceService.listByProfileIds({ profileIds: [profile.id] });
    return rows.map(toExperience);
  }

  async projects(params: GetBySlugQuery) {
    const profile = await this.get(params);
    const [rows] = await this.projectsService.listByProfileIds({ profileIds: [profile.id] });
    return rows.map(toProject);
  }
}
