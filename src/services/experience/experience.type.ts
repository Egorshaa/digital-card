import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Experience')
export class ExperienceType {
  @Field(() => Int)
  id: number;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date, { nullable: true, description: 'null — работает по настоящее время' })
  endDate: Date | null;

  @Field(() => [String])
  achievements: string[];
}
