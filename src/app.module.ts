import { Module } from '@nestjs/common';

import { PrismaModule } from './common/prisma/prisma.module';
import { ConfigModule } from './config/config.module';
import { GraphqlModule } from './graphql/graphql.module';
import { ServiceModule } from './services/service.module';

@Module({
  imports: [ConfigModule, PrismaModule, GraphqlModule, ServiceModule],
})
export class AppModule {}
