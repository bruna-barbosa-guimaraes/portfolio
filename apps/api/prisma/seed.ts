import { PrismaClient, ExperienceType } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminName = process.env.ADMIN_NAME ?? 'Bruna Barbosa';
  const adminEmail = process.env.ADMIN_EMAIL ?? 'bruna@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'change-me';

  const passwordHash = await hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      passwordHash,
    },
    create: {
      name: adminName,
      email: adminEmail,
      passwordHash,
    },
  });

  await prisma.project.upsert({
    where: { id: 'seed-project-portfolio' },
    update: {},
    create: {
      id: 'seed-project-portfolio',
      title: 'Portfolio Fullstack',
      description:
        'Sistema de portfolio pessoal com API NestJS, painel admin, JWT, Prisma e frontend Next.js.',
      technologies: ['Next.js', 'NestJS', 'Prisma', 'MySQL', 'JWT'],
      githubUrl: 'https://github.com/seu-usuario/portfolio',
      demoUrl: 'https://portfolio.vercel.app',
      imageUrl: '/projects/portfolio.svg',
      userId: admin.id,
    },
  });

  await prisma.experience.upsert({
    where: { id: 'seed-experience-frontend' },
    update: {},
    create: {
      id: 'seed-experience-frontend',
      title: 'Desenvolvedora Fullstack',
      companyOrInstitution: 'Projetos pessoais e profissionais',
      description:
        'Construcao de aplicacoes web com foco em arquitetura, regras de negocio e experiencia de usuario.',
      startDate: new Date('2024-01-01'),
      endDate: null,
      type: ExperienceType.job,
      userId: admin.id,
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
