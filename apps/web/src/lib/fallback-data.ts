import type { Experience, Project } from './types';

export const fallbackProjects: Project[] = [
  {
    id: 'portfolio',
    title: 'Portfolio Fullstack',
    description:
      'Sistema desacoplado com Next.js, NestJS, Prisma, MySQL, JWT e painel administrativo.',
    technologies: ['Next.js', 'NestJS', 'Prisma', 'MySQL'],
    githubUrl: 'https://github.com/seu-usuario/portfolio',
    demoUrl: 'https://portfolio.vercel.app',
    imageUrl: '/projects/portfolio.svg',
  },
  {
    id: 'dashboard',
    title: 'Dashboard Admin',
    description:
      'Area autenticada para gerenciar projetos e experiencias com CRUD completo.',
    technologies: ['React', 'JWT', 'REST API'],
    githubUrl: 'https://github.com/seu-usuario/dashboard',
    imageUrl: '/projects/dashboard.svg',
  },
  {
    id: 'api',
    title: 'API Portfolio',
    description:
      'Backend com modulos separados, DTOs, guards, soft delete e respostas padronizadas.',
    technologies: ['NestJS', 'Prisma', 'JWT'],
    githubUrl: 'https://github.com/seu-usuario/api',
    imageUrl: '/projects/api.svg',
  },
];

export const fallbackExperiences: Experience[] = [
  {
    id: 'job-fullstack',
    title: 'Desenvolvedora Fullstack',
    companyOrInstitution: 'Projetos pessoais e profissionais',
    description:
      'Desenvolvimento de aplicacoes web com frontend moderno, APIs REST e modelagem de dados.',
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: null,
    type: 'job',
  },
  {
    id: 'education-systems',
    title: 'Formacao em tecnologia',
    companyOrInstitution: 'Estudos e pratica continua',
    description:
      'Base em desenvolvimento web, arquitetura de sistemas, banco de dados e boas praticas.',
    startDate: '2022-01-01T00:00:00.000Z',
    endDate: null,
    type: 'education',
  },
  {
    id: 'course-backend',
    title: 'Backend com NestJS',
    companyOrInstitution: 'Curso relevante',
    description:
      'Criacao de APIs com autenticacao, organizacao por modulos, validacao e persistencia.',
    startDate: '2023-06-01T00:00:00.000Z',
    endDate: '2023-10-01T00:00:00.000Z',
    type: 'course',
  },
];
