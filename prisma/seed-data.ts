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
    'Быстро осваиваю новые технологии, очень хочу развиваться.',
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

  // Публичные проекты из GitHub; описание и технологии основаны на README репозиториев.
  projects: [
    {
      name: 'Digital Card',
      description: 'Цифровая визитка: GraphQL API на NestJS и Prisma с автоматической миграцией и сидингом БД.',
      url: 'https://github.com/Egorshaa/digital-card',
      technologies: ['TypeScript', 'NestJS', 'GraphQL', 'Prisma', 'PostgreSQL', 'Docker'],
    },
    {
      name: 'Central Office Backend',
      description:
        'Backend для админ-панели центрального офиса: авторизация и роли администраторов, управление магазинами, владельцами, заявками и терминалами.',
      url: 'https://github.com/Egorshaa/central-office-backend',
      technologies: ['TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'JWT', 'Docker Compose'],
    },
    {
      name: 'SWAG VPN',
      description:
        'Приложение с Telegram-ботом для продажи VPN-подписок через Telegram Stars: управление тарифами, платежами, ключами и подписками.',
      url: 'https://github.com/Egorshaa/swag-vpn',
      technologies: ['TypeScript', 'Next.js', 'PostgreSQL', 'Drizzle ORM', 'Telegram Bot API'],
    },
    {
      name: 'Companies Data Loader',
      description:
        'Загрузчик данных о компаниях из JSON в PostgreSQL с очисткой и дедупликацией записей, идемпотентной загрузкой и аналитическими SQL-запросами.',
      url: 'https://github.com/Egorshaa/companies-data-loader',
      technologies: ['TypeScript', 'PostgreSQL', 'SQL', 'Docker'],
    },
    {
      name: 'Airline Ticket Booking System',
      description:
        'Веб-приложение для поиска рейсов, бронирования авиабилетов, личного кабинета и администрирования.',
      url: 'https://github.com/Egorshaa/airline-ticket-booking-system',
      technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    },
  ],
};
