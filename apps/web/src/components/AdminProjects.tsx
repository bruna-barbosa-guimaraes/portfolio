'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { requestApi } from '@/lib/api';
import type { Paginated, Project } from '@/lib/types';
import { getStoredToken } from './AdminGuard';

const emptyProject = {
  title: '',
  description: '',
  technologies: '',
  githubUrl: '',
  demoUrl: '',
  imageUrl: '',
};

export function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyProject);
  const [message, setMessage] = useState('');

  async function loadProjects() {
    const data = await requestApi<Paginated<Project>>('/projects?limit=50');
    setProjects(data.items);
  }

  useEffect(() => {
    void loadProjects();
  }, []);

  function edit(project: Project) {
    setEditing(project);
    setForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      githubUrl: project.githubUrl ?? '',
      demoUrl: project.demoUrl ?? '',
      imageUrl: project.imageUrl ?? '',
    });
  }

  function reset() {
    setEditing(null);
    setForm(emptyProject);
    setMessage('');
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = getStoredToken();

    const payload = {
      ...form,
      technologies: form.technologies
        .split(',')
        .map((tech) => tech.trim())
        .filter(Boolean),
    };

    await requestApi<Project>(editing ? `/projects/${editing.id}` : '/projects', {
      method: editing ? 'PUT' : 'POST',
      token: token ?? undefined,
      body: JSON.stringify(payload),
    });

    setMessage(editing ? 'Projeto atualizado.' : 'Projeto criado.');
    setEditing(null);
    setForm(emptyProject);
    await loadProjects();
  }

  async function remove(project: Project) {
    const confirmed = window.confirm(`Excluir o projeto "${project.title}"?`);

    if (!confirmed) {
      return;
    }

    const token = getStoredToken();
    await requestApi<Project>(`/projects/${project.id}`, {
      method: 'DELETE',
      token: token ?? undefined,
    });
    await loadProjects();
  }

  return (
    <div className="admin-grid">
      <section className="admin-panel">
        <div className="panel-title">
          <h2>{editing ? 'Editar projeto' : 'Novo projeto'}</h2>
          <button type="button" className="ghost-button" onClick={reset}>
            <Plus size={18} />
            Limpar
          </button>
        </div>
        <form className="admin-form" onSubmit={save}>
          <label>
            Titulo
            <input
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              required
            />
          </label>
          <label>
            Descricao
            <textarea
              rows={5}
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              required
            />
          </label>
          <label>
            Tecnologias
            <input
              value={form.technologies}
              onChange={(event) =>
                setForm({ ...form, technologies: event.target.value })
              }
              placeholder="Next.js, NestJS, Prisma"
              required
            />
          </label>
          <label>
            GitHub
            <input
              value={form.githubUrl}
              onChange={(event) =>
                setForm({ ...form, githubUrl: event.target.value })
              }
            />
          </label>
          <label>
            Deploy
            <input
              value={form.demoUrl}
              onChange={(event) => setForm({ ...form, demoUrl: event.target.value })}
            />
          </label>
          <label>
            Imagem
            <input
              value={form.imageUrl}
              onChange={(event) =>
                setForm({ ...form, imageUrl: event.target.value })
              }
              placeholder="/projects/portfolio.svg"
            />
          </label>
          <button className="primary-button">
            <Save size={18} />
            Salvar
          </button>
          {message ? <p className="form-status">{message}</p> : null}
        </form>
      </section>

      <section className="admin-panel">
        <h2>Projetos publicados</h2>
        <div className="admin-list">
          {projects.map((project) => (
            <article key={project.id}>
              <button type="button" onClick={() => edit(project)}>
                <strong>{project.title}</strong>
                <span>{project.technologies.join(', ')}</span>
              </button>
              <button
                type="button"
                className="icon-danger"
                aria-label={`Excluir ${project.title}`}
                onClick={() => remove(project)}
              >
                <Trash2 size={18} />
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
