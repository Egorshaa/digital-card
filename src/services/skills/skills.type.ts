import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Skill')
export class SkillType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ description: 'Группа навыков: языки, базы данных, инструменты и т.д.' })
  category: string;
}
