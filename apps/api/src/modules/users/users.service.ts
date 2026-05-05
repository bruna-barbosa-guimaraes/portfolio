import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

type CreateAdminInput = {
  name: string;
  email: string;
  passwordHash: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  createAdmin(input: CreateAdminInput) {
    return this.prisma.user.upsert({
      where: { email: input.email },
      update: {
        name: input.name,
        passwordHash: input.passwordHash,
      },
      create: input,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}
