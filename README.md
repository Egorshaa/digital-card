# Digital Card — цифровая визитка (GraphQL backend)

Backend-приложение, которое презентует разработчика: профиль, навыки, опыт работы и проекты.
Данные отдаются через GraphQL API, Apollo Sandbox доступен на `/graphql`.

**Стек:** TypeScript · Node.js · NestJS · GraphQL (Apollo, code-first) · Prisma · PostgreSQL · Docker · Git

## Запуск с нуля

```bash
docker compose up --build
```

Больше ничего делать не нужно. При старте контейнер `app` сам:
1. применяет миграции (`prisma migrate deploy`);
2. заполняет БД данными из `prisma/seed-data.ts` (`prisma db seed`);
3. запускает приложение.

После этого:

| Что              | Адрес                          |
| ---------------- | ------------------------------ |
| Apollo Sandbox   | http://localhost:3000/graphql  |
| Swagger (REST)   | http://localhost:3000/docs     |
| Health-check     | http://localhost:3000/ping     |

### Локальная разработка (без контейнера для приложения)

```bash
cp .env.example .env
docker compose up db -d
npm install
npm run prisma:deploy     # миграции
npm run prisma:seed       # сидинг
npm run start:dev
```

В `APP_TYPE=dev` Prisma печатает SQL-запросы в консоль — удобно проверять количество обращений к БД.

## Пример запроса

```graphql
query {
  profile {
    name
    title
    description
    location
    links { type label url }
    skills { name category }
    experience { company position startDate endDate achievements }
    projects { name url description technologies }
  }
}
```

Можно запросить любое подмножество полей, а также конкретную визитку: `profile(slug: "egor-shipkin")`.

## REST и Swagger (дополнительно)

Основной API — GraphQL. Дополнительно есть REST-ручки со Swagger на `/docs`: `GET /profile` (визитка целиком), `GET /profile/links|skills|experience|projects`, у всех необязательный query-параметр `slug`.
Это тонкий фасад: контроллер вызывает те же сервисы, что и GraphQL, и не содержит своей логики или обращений к БД.

## Структура

```
prisma/
  schema.prisma        модель данных
  migrations/          SQL-миграции (применяются при старте)
  seed-data.ts         данные визитки (единственное место, которое нужно править)
  seed.ts              идемпотентный сидинг
src/
  config/              ConfigService — единая точка доступа к переменным окружения
  common/              controller.key / resolver.key, PrismaModule, утилиты
  graphql/             настройка Apollo + DataLoader'ы
  services/
    profile/           корневой запрос и field-резолверы (GraphQL-слой)
    links|skills|experience|projects/   доступ к данным (service) + GraphQL-тип (type)
    ping/              REST /ping для health-check
```

В каждом `services/<name>/` один и тот же набор: `*.module.ts`, `*.service.ts`, `*.type.ts` (+ `*.resolver.ts`, `*.dto.ts` там, где нужно).

## Архитектурные решения

**Разделение ответственности на три слоя.**
- *GraphQL-слой* (`profile.resolver.ts`) — только описывает форму API и делегирует. Никакой логики и обращений к Prisma.
- *Слой данных* (`*.service.ts`) — единственное место, где используется `PrismaService`. Сервисы ничего не знают о GraphQL, поэтому их можно переиспользовать (REST, cron, тесты).
- *Типы* (`*.type.ts`) — GraphQL-схема в code-first стиле: схема генерируется из классов, и нет рассинхрона между SDL и кодом.

**Оптимизация вложенных запросов (проблема N+1) через DataLoader.**
Связанные сущности (`links`, `skills`, `experience`, `projects`) не подгружаются вместе с профилем через `include`.
Вместо этого каждое поле — отдельный `@ResolveField`, который обращается к DataLoader из контекста запроса:
- если клиент не запросил `skills`, запрос в таблицу `skill` не выполняется вообще (нет лишних JOIN'ов и лишних данных);
- если запрошены все поля — это ровно 1 запрос профиля + по 1 запросу на каждую связанную таблицу (`WHERE profile_id IN (...)`), независимо от количества профилей;
- DataLoader'ы создаются заново на каждый запрос (`context` в `graphql.module.ts`), поэтому кэш не «протекает» между клиентами.

Сейчас профиль один, но решение остается корректным, если появится список профилей: количество запросов не вырастет.

**Prisma.** Типобезопасный доступ к БД, миграции в репозитории, каскадное удаление на уровне БД (`ON DELETE CASCADE`). Имена таблиц и колонок в БД — `snake_case` (`@map`), в коде — `camelCase`. Достижения и технологии хранятся как `TEXT[]` — это простые списки без собственных связей, отдельная таблица была бы избыточной.

**Инициализация БД.** Миграции — это версионируемый и воспроизводимый способ создать схему (в отличие от `db push`). Сидинг идемпотентен: профиль пересоздается одной транзакцией, поэтому повторный запуск контейнера не создает дубликатов, а правка `seed-data.ts` применяется после перезапуска.

**controllerKey / resolverKey.** Пути REST-эндпоинтов (`controllerKey`) и имена GraphQL-операций (`resolverKey`) вынесены в один файл, а не разбросаны строками по декораторам.

**Конфигурация.** Обертка `ConfigService` над `@nestjs/config`: остальной код не читает `process.env` напрямую и не зависит от имен переменных.

**Валидация.** Глобальный `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`) проверяет аргументы запросов (`ProfileArgs`).

**Apollo Sandbox** включен явно (`ApolloServerPluginLandingPageLocalDefault({ embed: true })` + `introspection: true`), потому что в `NODE_ENV=production` Apollo отключает и то, и другое по умолчанию, а в задании Sandbox должен работать на задеплоенной версии.

**Docker.** Двухэтапная сборка (builder → runtime). `docker-compose` ждет готовности PostgreSQL по healthcheck, прежде чем стартовать приложение.

## Деплой (Render / Railway)

Подойдет деплой из `Dockerfile` + управляемый PostgreSQL. Нужны переменные:
`DATABASE_URL` (строка подключения), `APP_TYPE=prod`. Порт берется из `PORT`, который платформа задает сама. Миграции и сидинг выполнятся автоматически при старте через `docker-entrypoint.sh`.

## Скрипты

| Команда                  | Назначение                             |
| ------------------------ | -------------------------------------- |
| `npm run start:dev`      | запуск с watch                         |
| `npm run build`          | сборка                                 |
| `npm run prisma:migrate` | создать новую миграцию (dev)           |
| `npm run prisma:deploy`  | применить миграции                     |
| `npm run prisma:seed`    | заполнить БД                           |
| `npm run prisma:reset`   | сбросить БД, применить миграции и сид  |
| `npm run format`         | prettier                               |
