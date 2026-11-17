import { ArgsType, Field } from '@nestjs/graphql';

import { IsOptional, IsString, MaxLength } from 'class-validator';

@ArgsType()
export class ProfileArgs {
  @Field(() => String, { nullable: true, description: 'Slug визитки. Если не указан — возвращается основная.' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  slug?: string;
}
