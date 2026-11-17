import { Field, Int, ObjectType } from '@nestjs/graphql';

/**
 * Связанные данные (links, skills, experience, projects) здесь намеренно не объявлены:
 * они подгружаются field-резолверами через DataLoader, только если клиент запросил эти поля.
 */
@ObjectType('Profile')
export class ProfileType {
  @Field(() => Int)
  id: number;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field({ description: 'Должность / специализация' })
  title: string;

  @Field({ description: 'Краткое описание' })
  description: string;

  @Field(() => String, { nullable: true })
  location: string | null;
}
