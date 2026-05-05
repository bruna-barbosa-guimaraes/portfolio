import { ExperienceType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  @MaxLength(120)
  title!: string;

  @IsString()
  @MaxLength(160)
  companyOrInstitution!: string;

  @IsString()
  description!: string;

  @IsDateString()
  startDate!: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsEnum(ExperienceType)
  type!: ExperienceType;
}
