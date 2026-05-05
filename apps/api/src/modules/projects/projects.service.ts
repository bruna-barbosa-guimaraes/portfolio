import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

type ListOptions = {
  page: number;
  limit: number;
  userId?: string;
};

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(options: ListOptions) {
    const page = Math.max(options.page, 1);
    const limit = Math.min(Math.max(options.limit, 1), 50);
    const where: Prisma.ProjectWhereInput = {
      deletedAt: null,
      userId: options.userId,
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.project.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.project.count({ where }),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, deletedAt: null },
    });

    if (!project) {
      throw new NotFoundException('Projeto nao encontrado.');
    }

    return project;
  }

  create(userId: string, dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        ...dto,
        technologies: dto.technologies,
        userId,
      },
    });
  }

  async update(id: string, userId: string, dto: UpdateProjectDto) {
    await this.ensureOwner(id, userId);

    return this.prisma.project.update({
      where: { id },
      data: {
        ...dto,
        technologies: dto.technologies,
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.ensureOwner(id, userId);

    return this.prisma.project.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private async ensureOwner(id: string, userId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, userId, deletedAt: null },
      select: { id: true },
    });

    if (!project) {
      throw new NotFoundException('Projeto nao encontrado.');
    }
  }
}
