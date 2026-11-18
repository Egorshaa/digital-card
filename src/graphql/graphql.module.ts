import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import type { GqlContext } from './graphql.type';
import { LoaderModule } from './loader/loader.module';
import { LoaderService } from './loader/loader.service';

const defaultSandboxQuery = `query ExampleQuery {
  profile {
    id
    name
    description
    skills {
      name
    }
    experience {
      company
      position
    }
    projects {
      name
      url
    }
  }
}`;

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [LoaderModule],
      inject: [LoaderService],
      useFactory: (loader: LoaderService) => ({
        path: '/graphql',
        autoSchemaFile: true,
        sortSchema: true,
        // Sandbox и introspection включены всегда: это требование задания (в prod Apollo отключает их по умолчанию).
        introspection: true,
        playground: false,
        plugins: [
          ApolloServerPluginLandingPageLocalDefault({
            embed: true,
            document: defaultSandboxQuery,
          }),
        ],
        context: (): GqlContext => ({ loaders: loader.create() }),
      }),
    }),
  ],
})
export class GraphqlModule {}
