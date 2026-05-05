import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

type ListOptions = {
  page: number;
  limit: number;
  userId?: string;
};

@Injectable()
export class ExperiencesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(options: ListOptions) {
    const page = Math.max(options.page, 1);
    const limit = Math.min(Math.max(options.limit, 1), 50);
    const where: Prisma.ExperienceWhereInput = {
      deletedAt: null,
      userId: options.userId,
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.experience.findMany({
        where,
        orderBy: { startDate: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.experience.count({ where }),
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
    const experience = await this.prisma.experience.findFirst({
      where: { id, deletedAt: null },
    });

    if (!experience) {
      throw new NotFoundException('Experiencia nao encontrada.');
    }

    return experience;
  }

  create(userId: string, dto: CreateExperienceDto) {
    return this.prisma.experience.create({
      data: {
        title: dto.title,
        companyOrInstitution: dto.companyOrInstitution,
        description: dto.description,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
        type: dto.type,
        userId,
      },
    });
  }

  async update(id: string, userId: string, dto: UpdateExperienceDto) {
    await this.ensureOwner(id, userId);

    return this.prisma.experience.update({
      where: { id },
      data: {
        title: dto.title,
        companyOrInstitution: dto.companyOrInstitution,
        description: dto.description,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        type: dto.type,
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.ensureOwner(id, userId);

    return this.prisma.experience.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private async ensureOwner(id: string, userId: string) {
    const experience = await this.prisma.experience.findFirst({
      where: { id, userId, deletedAt: null },
      select: { id: true },
    });

    if (!experience) {
      throw new NotFoundException('Experiencia nao encontrada.');
    }
  }
}
