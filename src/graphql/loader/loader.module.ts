import { Module } from '@nestjs/common';

import { ExperienceModule } from '../../services/experience/experience.module';
import { LinksModule } from '../../services/links/links.module';
import { ProjectsModule } from '../../services/projects/projects.module';
import { SkillsModule } from '../../services/skills/skills.module';
import { LoaderService } from './loader.service';

@Module({
  imports: [LinksModule, SkillsModule, ExperienceModule, ProjectsModule],
  providers: [LoaderService],
  exports: [LoaderService],
})
export class LoaderModule {}
