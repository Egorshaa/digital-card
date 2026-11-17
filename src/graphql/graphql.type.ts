import type { GqlLoaders } from './loader/loader.type';

/** Контекст GraphQL-запроса: создается заново на каждый запрос. */
export type GqlContext = {
  loaders: GqlLoaders;
};
