import { PrismaClient } from '@prisma/client';

import { seedProfile } from './seed-data';

const prisma = new PrismaClient();

/** Порядок элементов в массиве сохраняется в sortOrder. */
const withOrder = <T extends object>(items: T[]) => items.map((item, sortOrder) => ({ ...item, sortOrder }));

async function main() {
  const { slug, links, skills, experience, projects, ...profile } = seedProfile;

  // Идемпотентность: удаляем профиль (дочерние записи удаляются каскадом) и создаем заново одной транзакцией.
  await prisma.$transaction([
    prisma.profile.deleteMany({ where: { slug } }),
    prisma.profile.create({
      data: {
        slug,
        ...profile,
        links: { create: withOrder(links) },
        skills: { create: withOrder(skills) },
        experience: { create: experience },
        projects: { create: withOrder(projects) },
      },
    }),
  ]);

  console.log(`[seed] profile "${slug}" is ready`);
}

main()
  .catch(error => {
    console.error('[seed] failed', error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
