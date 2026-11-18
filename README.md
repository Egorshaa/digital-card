# Digital Card

Backend цифровой визитки разработчика. Приложение предоставляет профиль, навыки, опыт работы и проекты через GraphQL API. GraphQL-схема генерируется из TypeScript-классов, а Apollo Sandbox позволяет исследовать и выполнять запросы в браузере.

**Стек:** TypeScript, Node.js, NestJS, Apollo GraphQL, Prisma, PostgreSQL, Docker Compose.

## Быстрый запуск

### Требования

- Docker Desktop с запущенным Docker Engine.
- Git — чтобы получить исходный код.

Node.js и npm для запуска через Docker не требуются.

### Запуск приложения

Из корневой папки проекта выполните:

```powershell
docker compose up --build -d
```

При первом запуске Docker соберёт приложение и запустит PostgreSQL. Контейнер приложения дождётся готовности базы, применит миграции, заполнит её демонстрационными данными и запустит API.

По умолчанию приложение доступно на `http://localhost:3001`. Если порт изменён в `.env`, используйте значение `APP_PORT` из этого файла.

| Сервис | Адрес |
| --- | --- |
| Apollo Sandbox | http://localhost:3001/graphql |
| Swagger UI (REST) | http://localhost:3001/docs |
| Health check | http://localhost:3001/ping |

В Apollo Sandbox уже подставлен пример запроса. Нажмите **Run**, чтобы получить профиль и связанные данные.

Проверить состояние контейнеров:

```powershell
docker compose ps
```

Остановить контейнеры, сохранив данные базы:

```powershell
docker compose down
```

Данные PostgreSQL хранятся в Docker volume и сохраняются после остановки контейнеров.

## Пример GraphQL-запроса

```graphql
query ExampleQuery {
  profile {
    id
    name
    title
    description
    location
    links {
      type
      label
      url
    }
    skills {
      name
      category
    }
    experience {
      company
      position
      startDate
      endDate
      achievements
    }
    projects {
      name
      description
      url
      technologies
    }
  }
}
```

Поле `profile` — корневой запрос API. Поля `id`, `name` и остальные данные запрашиваются внутри объекта `profile`.

Можно получить конкретный профиль по slug:

```graphql
query {
  profile(slug: "egor-shipkin") {
    name
    projects {
      name
      url
    }
  }
}
```

## Что реализовано

- Профиль разработчика с профессиональными ссылками.
- Навыки с категориями.
- Опыт работы с датами и достижениями.
- Проекты с описаниями, ссылками и технологиями.
- GraphQL API и Apollo Sandbox с включённой introspection.
- REST API-документация через Swagger.
- Автоматическое применение миграций и заполнение базы при запуске Docker Compose.
- Health-check, проверяющий доступность приложения и базы данных.

## Архитектура

### Разделение ответственности

- **GraphQL API:** резолверы описывают запросы и передают работу сервисам. Они не обращаются к Prisma напрямую.
- **Сервисы данных:** содержат операции чтения из PostgreSQL через Prisma. Сервисы не зависят от GraphQL и используются также REST-контроллерами.
- **GraphQL-типы:** схема формируется в code-first стиле из TypeScript-классов.
- **Конфигурация:** доступ к переменным окружения централизован в `ConfigService`.

### Вложенные данные и DataLoader

Связанные поля профиля (`links`, `skills`, `experience`, `projects`) разрешаются отдельно и только тогда, когда их запросил клиент. DataLoader группирует загрузку связанных записей по `profileId` в рамках одного GraphQL-запроса и не разделяет кэш между запросами.

### Prisma и инициализация базы

`prisma/schema.prisma` описывает модели PostgreSQL, а миграции в `prisma/migrations` версионируют изменения схемы. При старте контейнера `docker-entrypoint.sh` выполняет `prisma migrate deploy`, затем запускает сидинг.

Данные профиля хранятся в `prisma/seed-data.ts`. Сидинг пересоздаёт профиль и его связанные записи в транзакции, поэтому повторное выполнение не создаёт дубликатов.

## Запуск для локальной разработки

В этом режиме приложение запускается на хосте, а PostgreSQL — в Docker. Требуется Node.js 20 или новее.

В PowerShell из корневой папки проекта:

```powershell
if (!(Test-Path .env)) { Copy-Item .env.example .env }
docker compose up -d db
npm install
npm run prisma:generate
npm run prisma:deploy
npm run prisma:seed
npm run start:dev
```

После первоначальной настройки для повторного запуска достаточно:

```powershell
docker compose up -d db
npm run start:dev
```

Базу необходимо запустить до `npm run start:dev`. Если PostgreSQL остановлен, Prisma выдаст ошибку `P1001: Can't reach database server`.

Значения портов и подключения к базе настраиваются в `.env`. Пример конфигурации находится в `.env.example`.

## Структура проекта

```text
src/
  config/                  Конфигурация приложения
  common/                  Общие модули и ключи API
  graphql/                 Настройка Apollo GraphQL и DataLoader
  services/
    profile/               Корневой GraphQL-запрос и REST-контроллер
    links/                 Ссылки профиля
    skills/                Навыки
    experience/            Опыт работы
    projects/              Проекты
    ping/                  Health check
prisma/
  schema.prisma            Модели базы данных
  migrations/              SQL-миграции
  seed-data.ts             Данные визитки
  seed.ts                  Идемпотентный сидинг
Dockerfile                 Сборка приложения
docker-compose.yml         Приложение и PostgreSQL
```

## Команды разработки

| Команда | Назначение |
| --- | --- |
| `npm run start:dev` | Запуск NestJS в watch-режиме |
| `npm run build` | Сборка приложения |
| `npm run prisma:generate` | Генерация Prisma Client |
| `npm run prisma:deploy` | Применение миграций |
| `npm run prisma:seed` | Заполнение базы данными из `seed-data.ts` |
| `npm run prisma:migrate` | Создание миграции при разработке схемы |
| `npm run format` | Форматирование TypeScript-файлов |

## Ссылки

- GitHub: https://github.com/Egorshaa
- [Digital Card](https://github.com/Egorshaa/digital-card)
- [Central Office Backend](https://github.com/Egorshaa/central-office-backend)
- [SWAG VPN](https://github.com/Egorshaa/swag-vpn)
- [Companies Data Loader](https://github.com/Egorshaa/companies-data-loader)
- [Airline Ticket Booking System](https://github.com/Egorshaa/airline-ticket-booking-system)
