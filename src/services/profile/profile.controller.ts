import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { controllerKey } from '../../common/controller.key';
import {
  ExperienceResponseDto,
  ProfileLinkResponseDto,
  ProfileQueryDto,
  ProfileResponseDto,
  ProjectResponseDto,
  SkillResponseDto,
} from './profile.rest.dto';
import { GetBySlugQuery } from './profile.params';
import { ProfileService } from './profile.service';

/** REST-фасад над теми же сервисами, что использует GraphQL. Нужен для удобного просмотра в Swagger. */
@ApiTags('profile')
@Controller()
export class ProfileController {
  constructor(private readonly profile: ProfileService) {}

  @Get(controllerKey.profile.root)
  @ApiOperation({ summary: 'Визитка целиком: профиль, ссылки, навыки, опыт и проекты' })
  @ApiOkResponse({ type: ProfileResponseDto })
  get(@Query() query: ProfileQueryDto) {
    const params: GetBySlugQuery = { slug: query.slug };
    return this.profile.getFull(params);
  }

  @Get(controllerKey.profile.links)
  @ApiOperation({ summary: 'Ссылки на профессиональные ресурсы' })
  @ApiOkResponse({ type: ProfileLinkResponseDto, isArray: true })
  links(@Query() query: ProfileQueryDto) {
    const params: GetBySlugQuery = { slug: query.slug };
    return this.profile.links(params);
  }

  @Get(controllerKey.profile.skills)
  @ApiOperation({ summary: 'Список навыков' })
  @ApiOkResponse({ type: SkillResponseDto, isArray: true })
  skills(@Query() query: ProfileQueryDto) {
    const params: GetBySlugQuery = { slug: query.slug };
    return this.profile.skills(params);
  }

  @Get(controllerKey.profile.experience)
  @ApiOperation({ summary: 'Опыт работы' })
  @ApiOkResponse({ type: ExperienceResponseDto, isArray: true })
  experience(@Query() query: ProfileQueryDto) {
    const params: GetBySlugQuery = { slug: query.slug };
    return this.profile.experience(params);
  }

  @Get(controllerKey.profile.projects)
  @ApiOperation({ summary: 'Проекты' })
  @ApiOkResponse({ type: ProjectResponseDto, isArray: true })
  projects(@Query() query: ProfileQueryDto) {
    const params: GetBySlugQuery = { slug: query.slug };
    return this.profile.projects(params);
  }
}
