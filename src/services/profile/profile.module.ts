import { Module } from '@nestjs/common';

import { ExperienceModule } from '../experience/experience.module';
import { LinksModule } from '../links/links.module';
import { ProjectsModule } from '../projects/projects.module';
import { SkillsModule } from '../skills/skills.module';
import { ProfileController } from './profile.controller';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

@Module({
  imports: [LinksModule, SkillsModule, ExperienceModule, ProjectsModule],
  controllers: [ProfileController],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
