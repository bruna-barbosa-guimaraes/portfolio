import { fallbackExperiences, fallbackProjects } from './fallback-data';
import type { ApiResponse, Experience, Paginated, Project } from './types';

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';
const SERVER_API_URL = process.env.API_INTERNAL_URL ?? PUBLIC_API_URL;

async function getPublic<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${SERVER_API_URL}${path}`, {
      next: { revalidate: 120 },
    });

    if (!response.ok) {
      return fallback;
    }

    const body = (await response.json()) as ApiResponse<T>;
    return body.data;
  } catch {
    return fallback;
  }
}

export async function getProjects(): Promise<Project[]> {
  const data = await getPublic<Paginated<Project>>('/projects?limit=12', {
    items: fallbackProjects,
    meta: { page: 1, limit: 12, total: fallbackProjects.length, totalPages: 1 },
  });

  return data.items;
}

export async function getExperiences(): Promise<Experience[]> {
  const data = await getPublic<Paginated<Experience>>('/experiences?limit=20', {
    items: fallbackExperiences,
    meta: {
      page: 1,
      limit: 20,
      total: fallbackExperiences.length,
      totalPages: 1,
    },
  });

  return data.items;
}

export async function requestApi<T>(
  path: string,
  options: RequestInit & { token?: string } = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  const response = await fetch(`${PUBLIC_API_URL}${path}`, {
    ...options,
    headers,
  });

  const body = await response.json();

  if (!response.ok) {
    const message = body?.error?.message ?? 'Erro ao chamar a API.';
    throw new Error(Array.isArray(message) ? message.join(', ') : message);
  }

  return body.data as T;
}
