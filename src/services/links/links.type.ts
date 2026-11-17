import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

import { LinkType } from '@prisma/client';

registerEnumType(LinkType, { name: 'LinkType', description: 'Тип ссылки' });

@ObjectType('ProfileLink')
export class ProfileLinkType {
  @Field(() => Int)
  id: number;

  @Field(() => LinkType)
  type: LinkType;

  @Field()
  label: string;

  @Field()
  url: string;
}
