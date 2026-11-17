import type { Experience, Profile, ProfileLink, Project, Skill } from '@prisma/client';

import type {
  ExperienceResponseDto,
  ProfileLinkResponseDto,
  ProfileResponseDto,
  ProjectResponseDto,
  SkillResponseDto,
} from './profile.rest.dto';

export const toLink = ({ id, type, label, url }: ProfileLink): ProfileLinkResponseDto => ({ id, type, label, url });

export const toSkill = ({ id, name, category }: Skill): SkillResponseDto => ({ id, name, category });

export const toExperience = ({
  id,
  company,
  position,
  startDate,
  endDate,
  achievements,
}: Experience): ExperienceResponseDto => ({ id, company, position, startDate, endDate, achievements });

export const toProject = ({ id, name, description, url, technologies }: Project): ProjectResponseDto => ({
  id,
  name,
  description,
  url,
  technologies,
});

export const toProfile = (
  { id, slug, name, title, description, location }: Profile,
  related: { links: ProfileLink[]; skills: Skill[]; experience: Experience[]; projects: Project[] },
): ProfileResponseDto => ({
  id,
  slug,
  name,
  title,
  description,
  location,
  links: related.links.map(toLink),
  skills: related.skills.map(toSkill),
  experience: related.experience.map(toExperience),
  projects: related.projects.map(toProject),
});
