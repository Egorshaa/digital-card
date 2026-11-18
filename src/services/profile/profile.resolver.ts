import { Args, Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { resolverKey } from '../../common/resolver.key';
import type { GqlContext } from '../../graphql/graphql.type';
import { ExperienceType } from '../experience/experience.type';
import { ProfileLinkType } from '../links/links.type';
import { ProjectType } from '../projects/projects.type';
import { SkillType } from '../skills/skills.type';
import { ProfileArgs } from './profile.dto';
import { GetBySlugQuery } from './profile.params';
import { ProfileService } from './profile.service';
import { ProfileType } from './profile.type';

@Resolver(() => ProfileType)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileType, { name: resolverKey.profile.root, description: 'Цифровая визитка' })
  getProfile(@Args() args: ProfileArgs) {
    const params: GetBySlugQuery = { slug: args.slug };
    return this.profileService.get(params);
  }

  @ResolveField(() => [ProfileLinkType], { name: resolverKey.profile.links, description: 'Профессиональные ссылки' })
  links(@Parent() profile: ProfileType, @Context() { loaders }: GqlContext) {
    return loaders.links.load(profile.id);
  }

  @ResolveField(() => [SkillType], { name: resolverKey.profile.skills })
  skills(@Parent() profile: ProfileType, @Context() { loaders }: GqlContext) {
    return loaders.skills.load(profile.id);
  }

  @ResolveField(() => [ExperienceType], { name: resolverKey.profile.experience })
  experience(@Parent() profile: ProfileType, @Context() { loaders }: GqlContext) {
    return loaders.experience.load(profile.id);
  }

  @ResolveField(() => [ProjectType], { name: resolverKey.profile.projects })
  projects(@Parent() profile: ProfileType, @Context() { loaders }: GqlContext) {
    return loaders.projects.load(profile.id);
  }
}
