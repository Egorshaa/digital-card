import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../common/prisma/prisma.service';
import { ExperienceService } from '../experience/experience.service';
import { LinksService } from '../links/links.service';
import { ProjectsService } from '../projects/projects.service';
import { SkillsService } from '../skills/skills.service';
import { toExperience, toLink, toProfile, toProject, toSkill } from './profile.mapper';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly linksService: LinksService,
    private readonly skillsService: SkillsService,
    private readonly experienceService: ExperienceService,
    private readonly projectsService: ProjectsService,
  ) {}

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

  /** Визитка целиком для REST: профиль + 4 параллельных запроса к связанным таблицам. */
  async getFull(slug?: string) {
    const profile = await this.get(slug);
    const ids = [profile.id];
    const [[links], [skills], [experience], [projects]] = await Promise.all([
      this.linksService.listByProfileIds(ids),
      this.skillsService.listByProfileIds(ids),
      this.experienceService.listByProfileIds(ids),
      this.projectsService.listByProfileIds(ids),
    ]);
    return toProfile(profile, { links, skills, experience, projects });
  }

  async links(slug?: string) {
    const profile = await this.get(slug);
    const [rows] = await this.linksService.listByProfileIds([profile.id]);
    return rows.map(toLink);
  }

  async skills(slug?: string) {
    const profile = await this.get(slug);
    const [rows] = await this.skillsService.listByProfileIds([profile.id]);
    return rows.map(toSkill);
  }

  async experience(slug?: string) {
    const profile = await this.get(slug);
    const [rows] = await this.experienceService.listByProfileIds([profile.id]);
    return rows.map(toExperience);
  }

  async projects(slug?: string) {
    const profile = await this.get(slug);
    const [rows] = await this.projectsService.listByProfileIds([profile.id]);
    return rows.map(toProject);
  }
}
