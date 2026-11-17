import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Project')
export class ProjectType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field({ description: 'Ссылка на проект или репозиторий' })
  url: string;

  @Field(() => [String])
  technologies: string[];
}
