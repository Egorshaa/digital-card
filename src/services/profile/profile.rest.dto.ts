import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { LinkType } from '@prisma/client';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ProfileQueryDto {
  @ApiPropertyOptional({ description: 'Slug визитки. Если не указан — возвращается основная.', example: 'egor-shipkin' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  slug?: string;
}

export class ProfileLinkResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ enum: LinkType, example: LinkType.GITHUB })
  type: LinkType;

  @ApiProperty({ example: 'GitHub' })
  label: string;

  @ApiProperty({ example: 'https://github.com/Egorshaa' })
  url: string;
}

export class SkillResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'TypeScript' })
  name: string;

  @ApiProperty({ example: 'Языки' })
  category: string;
}

export class ExperienceResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'БЭТНЭТИКС' })
  company: string;

  @ApiProperty({ example: 'Backend-разработчик' })
  position: string;

  @ApiProperty({ type: Date })
  startDate: Date;

  @ApiProperty({ type: Date, nullable: true, description: 'null — работает по настоящее время' })
  endDate: Date | null;

  @ApiProperty({ type: [String] })
  achievements: string[];
}

export class ProjectResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Digital Card' })
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ description: 'Ссылка на проект или репозиторий' })
  url: string;

  @ApiProperty({ type: [String] })
  technologies: string[];
}

export class ProfileResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'egor-shipkin' })
  slug: string;

  @ApiProperty({ example: 'Егор Шипкин' })
  name: string;

  @ApiProperty({ description: 'Должность / специализация' })
  title: string;

  @ApiProperty({ description: 'Краткое описание' })
  description: string;

  @ApiProperty({ type: String, nullable: true })
  location: string | null;

  @ApiProperty({ type: [ProfileLinkResponseDto] })
  links: ProfileLinkResponseDto[];

  @ApiProperty({ type: [SkillResponseDto] })
  skills: SkillResponseDto[];

  @ApiProperty({ type: [ExperienceResponseDto] })
  experience: ExperienceResponseDto[];

  @ApiProperty({ type: [ProjectResponseDto] })
  projects: ProjectResponseDto[];
}
