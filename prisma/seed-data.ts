import { LinkType } from '@prisma/client';

/**
 * Данные визитки. Все, что отображается в API, редактируется здесь.
 * Сид идемпотентный: при каждом запуске профиль с этим slug пересоздается.
 */
export const seedProfile = {
  slug: 'egor-shipkin',
  name: 'Егор Шипкин',
  title: 'Backend-разработчик (TypeScript / Node.js)',
  description:
    'Backend-разработчик с коммерческим опытом на Node.js и TypeScript. Разрабатываю API, реализую бизнес-логику, ' +
    'работаю с PostgreSQL, кэшированием и очередями. Умею разбираться в существующем коде и работать в команде. ' +
    'Быстро осваиваю новые технологии, в перспективе хочу развиваться в сторону Golang.',
  location: 'Ростов-на-Дону, Россия',

  links: [
    { type: LinkType.GITHUB, label: 'GitHub', url: 'https://github.com/Egorshaa' },
    { type: LinkType.TELEGRAM, label: 'Telegram', url: 'https://t.me/hiketamine' },
    { type: LinkType.EMAIL, label: 'Email', url: 'mailto:theeropwq@gmail.com' },
  ],

  skills: [
    { category: 'Языки', name: 'TypeScript' },
    { category: 'Языки', name: 'JavaScript' },
    { category: 'Языки', name: 'Golang' },
    { category: 'Backend', name: 'Node.js' },
    { category: 'Backend', name: 'NestJS' },
    { category: 'Backend', name: 'REST API' },
    { category: 'Backend', name: 'GraphQL' },
    { category: 'Базы данных', name: 'PostgreSQL' },
    { category: 'Базы данных', name: 'SQL' },
    { category: 'Базы данных', name: 'Redis' },
    { category: 'Базы данных', name: 'Prisma' },
    { category: 'Базы данных', name: 'Drizzle ORM' },
    { category: 'Очереди', name: 'RabbitMQ' },
    { category: 'Очереди', name: 'BullMQ' },
    { category: 'Инструменты', name: 'Docker' },
    { category: 'Инструменты', name: 'Docker Compose' },
    { category: 'Инструменты', name: 'Git' },
    { category: 'Инструменты', name: 'GitLab' },
  ],

  experience: [
    {
      company: 'БЭТНЭТИКС',
      position: 'Backend-разработчик',
      startDate: new Date('2026-09-01'),
      endDate: new Date('2026-11-01'),
      achievements: [
        'Разрабатывал и поддерживал backend на Node.js и TypeScript',
        'Создавал REST API и реализовывал бизнес-логику',
        'Работал с PostgreSQL, Redis, RabbitMQ и BullMQ',
        'Исправлял ошибки и дорабатывал существующий код',
      ],
    },
  ],

  // Только личные проекты, не связанные с работодателями (NDA). Добавляйте сюда свои pet-проекты.
  // TODO: заменить url на ссылку на реальный репозиторий этого проекта
  projects: [
    {
      name: 'Digital Card',
      description: 'Цифровая визитка: GraphQL API на NestJS и Prisma с автоматической миграцией и сидингом БД.',
      url: 'https://github.com/Egorshaa',
      technologies: ['TypeScript', 'NestJS', 'GraphQL', 'Prisma', 'PostgreSQL', 'Docker'],
    },
  ],
};
