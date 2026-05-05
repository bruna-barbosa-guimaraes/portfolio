'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { requestApi } from '@/lib/api';
import type { Experience, ExperienceType, Paginated } from '@/lib/types';
import { getStoredToken } from './AdminGuard';

const emptyExperience = {
  title: '',
  companyOrInstitution: '',
  description: '',
  startDate: '',
  endDate: '',
  type: 'job' as ExperienceType,
};

function toDateInput(value?: string | null) {
  return value ? value.slice(0, 10) : '';
}

export function AdminExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState(emptyExperience);
  const [message, setMessage] = useState('');

  async function loadExperiences() {
    const data = await requestApi<Paginated<Experience>>('/experiences?limit=50');
    setExperiences(data.items);
  }

  useEffect(() => {
    void loadExperiences();
  }, []);

  function edit(experience: Experience) {
    setEditing(experience);
    setForm({
      title: experience.title,
      companyOrInstitution: experience.companyOrInstitution,
      description: experience.description,
      startDate: toDateInput(experience.startDate),
      endDate: toDateInput(experience.endDate),
      type: experience.type,
    });
  }

  function reset() {
    setEditing(null);
    setForm(emptyExperience);
    setMessage('');
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = getStoredToken();
    const payload = {
      ...form,
      endDate: form.endDate || undefined,
    };

    await requestApi<Experience>(
      editing ? `/experiences/${editing.id}` : '/experiences',
      {
        method: editing ? 'PUT' : 'POST',
        token: token ?? undefined,
        body: JSON.stringify(payload),
      },
    );

    setMessage(editing ? 'Experiencia atualizada.' : 'Experiencia criada.');
    setEditing(null);
    setForm(emptyExperience);
    await loadExperiences();
  }

  async function remove(experience: Experience) {
    const confirmed = window.confirm(`Excluir "${experience.title}"?`);

    if (!confirmed) {
      return;
    }

    const token = getStoredToken();
    await requestApi<Experience>(`/experiences/${experience.id}`, {
      method: 'DELETE',
      token: token ?? undefined,
    });
    await loadExperiences();
  }

  return (
    <div className="admin-grid">
      <section className="admin-panel">
        <div className="panel-title">
          <h2>{editing ? 'Editar experiencia' : 'Nova experiencia'}</h2>
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
            Empresa ou instituicao
            <input
              value={form.companyOrInstitution}
              onChange={(event) =>
                setForm({ ...form, companyOrInstitution: event.target.value })
              }
              required
            />
          </label>
          <label>
            Tipo
            <select
              value={form.type}
              onChange={(event) =>
                setForm({ ...form, type: event.target.value as ExperienceType })
              }
            >
              <option value="job">Experiencia</option>
              <option value="education">Formacao</option>
              <option value="course">Curso</option>
            </select>
          </label>
          <label>
            Inicio
            <input
              type="date"
              value={form.startDate}
              onChange={(event) =>
                setForm({ ...form, startDate: event.target.value })
              }
              required
            />
          </label>
          <label>
            Fim
            <input
              type="date"
              value={form.endDate}
              onChange={(event) => setForm({ ...form, endDate: event.target.value })}
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
          <button className="primary-button">
            <Save size={18} />
            Salvar
          </button>
          {message ? <p className="form-status">{message}</p> : null}
        </form>
      </section>

      <section className="admin-panel">
        <h2>Experiencias publicadas</h2>
        <div className="admin-list">
          {experiences.map((experience) => (
            <article key={experience.id}>
              <button type="button" onClick={() => edit(experience)}>
                <strong>{experience.title}</strong>
                <span>{experience.companyOrInstitution}</span>
              </button>
              <button
                type="button"
                className="icon-danger"
                aria-label={`Excluir ${experience.title}`}
                onClick={() => remove(experience)}
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
