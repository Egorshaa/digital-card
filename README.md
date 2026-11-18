# Digital Card

Цифровая визитка backend-разработчика. Профиль, навыки, опыт и проекты доступны через GraphQL API.

**Стек:** TypeScript, Node.js, NestJS, GraphQL (Apollo), Prisma, PostgreSQL, Docker.

## Демо

- **Apollo Sandbox:** https://digital-card-api-zjeh.onrender.com/graphql
- **Проверка доступности API:** https://digital-card-api-zjeh.onrender.com/ping
- **Исходный код:** https://github.com/Egorshaa/digital-card

Откройте Apollo Sandbox и нажмите **Run**, чтобы выполнить пример запроса. Для просмотра демо ничего устанавливать или запускать локально не нужно. Бесплатный Render может усыплять приложение после простоя, поэтому первый запрос иногда загружается с задержкой.

## Пример GraphQL-запроса

```graphql
query ExampleQuery {
  profile {
    name
    title
    description
    links {
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

`profile` — корневой запрос API. Связанные данные запрашиваются вложенно, только если они нужны клиенту.

## REST API (дополнительно)

Помимо GraphQL, добавлен REST API — на случай, если удобнее посмотреть данные как обычный JSON. Откройте [Swagger UI](https://digital-card-api-zjeh.onrender.com/docs):

1. Найдите `GET /profile` и нажмите **Try it out**.
2. Оставьте `slug` пустым, чтобы получить основную визитку, и нажмите **Execute**.
3. Посмотрите результат в **Response body**.

`GET /profile` возвращает профиль вместе со ссылками, навыками, опытом и проектами. Связанные данные также доступны отдельно:

| Метод | Путь | Что возвращает |
| --- | --- | --- |
| `GET` | `/profile/links` | Профессиональные ссылки |
| `GET` | `/profile/skills` | Навыки |
| `GET` | `/profile/experience` | Опыт работы |
| `GET` | `/profile/projects` | Проекты |

У всех запросов можно указать необязательный параметр `slug`, например `?slug=egor-shipkin`. REST и GraphQL используют общие сервисы и данные.

## Архитектурные решения

- **Разделение ответственности:** GraphQL-резолверы передают запросы сервисам; сервисы работают с Prisma и не зависят от GraphQL.
- **Code-first GraphQL:** схема строится из TypeScript-классов, что сохраняет типизацию между приложением и API.
- **Вложенные данные:** связанные поля загружаются через DataLoader, который группирует запросы и кэширует результаты только в пределах одного GraphQL-запроса.
- **PostgreSQL и Prisma:** модели описаны в `prisma/schema.prisma`, изменения схемы версионируются миграциями.
- **Запуск с нуля:** Docker entrypoint применяет миграции и заполняет базу данными профиля; повторный сидинг не создаёт дубликаты.

## Локальный запуск (необязательно)

Для локальной проверки понадобится Docker Desktop. Из корневой папки репозитория выполните:

```powershell
docker compose up --build -d
```

Приложение будет доступно на `http://localhost:3001/graphql`. Миграции и данные применяются автоматически. Остановить контейнеры можно командой `docker compose down`.

## Другие проекты

- [Central Office Backend](https://github.com/Egorshaa/central-office-backend)
- [SWAG VPN](https://github.com/Egorshaa/swag-vpn)
- [Companies Data Loader](https://github.com/Egorshaa/companies-data-loader)
- [Airline Ticket Booking System](https://github.com/Egorshaa/airline-ticket-booking-system)
