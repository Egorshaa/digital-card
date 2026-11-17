import type DataLoader from 'dataloader';

import type { Experience, ProfileLink, Project, Skill } from '@prisma/client';

/** Загрузчик "profileId -> список связанных записей". */
export type ProfileLoader<T> = DataLoader<number, T[]>;

export type GqlLoaders = {
  links: ProfileLoader<ProfileLink>;
  skills: ProfileLoader<Skill>;
  experience: ProfileLoader<Experience>;
  projects: ProfileLoader<Project>;
};
