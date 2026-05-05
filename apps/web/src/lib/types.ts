export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type Paginated<T> = {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string | null;
  demoUrl?: string | null;
  imageUrl?: string | null;
};

export type ExperienceType = 'job' | 'education' | 'course';

export type Experience = {
  id: string;
  title: string;
  companyOrInstitution: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  type: ExperienceType;
};
