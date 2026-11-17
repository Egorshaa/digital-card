import { Injectable } from '@nestjs/common';

import DataLoader from 'dataloader';

import { ExperienceService } from '../../services/experience/experience.service';
import { LinksService } from '../../services/links/links.service';
import { ProjectsService } from '../../services/projects/projects.service';
import { SkillsService } from '../../services/skills/skills.service';
import type { GqlLoaders, ProfileLoader } from './loader.type';

const byProfile = <T>(batch: (profileIds: readonly number[]) => Promise<T[][]>): ProfileLoader<T> =>
  new DataLoader<number, T[]>(batch);

@Injectable()
export class LoaderService {
  constructor(
    private readonly links: LinksService,
    private readonly skills: SkillsService,
    private readonly experience: ExperienceService,
    private readonly projects: ProjectsService,
  ) {}

  /**
   * Создает набор загрузчиков для одного GraphQL-запроса.
   * Кэш DataLoader живет только внутри запроса, поэтому данные между пользователями не смешиваются.
   */
  create(): GqlLoaders {
    return {
      links: byProfile(ids => this.links.listByProfileIds(ids)),
      skills: byProfile(ids => this.skills.listByProfileIds(ids)),
      experience: byProfile(ids => this.experience.listByProfileIds(ids)),
      projects: byProfile(ids => this.projects.listByProfileIds(ids)),
    };
  }
}
