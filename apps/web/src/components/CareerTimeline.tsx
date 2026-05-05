import { BriefcaseBusiness, GraduationCap, LibraryBig } from 'lucide-react';
import type { Experience, ExperienceType } from '@/lib/types';

const labels: Record<ExperienceType, string> = {
  job: 'Experiencia',
  education: 'Formacao',
  course: 'Curso',
};

const icons = {
  job: BriefcaseBusiness,
  education: GraduationCap,
  course: LibraryBig,
};

function formatPeriod(experience: Experience) {
  const start = new Intl.DateTimeFormat('pt-BR', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(experience.startDate));

  const end = experience.endDate
    ? new Intl.DateTimeFormat('pt-BR', {
        month: 'short',
        year: 'numeric',
      }).format(new Date(experience.endDate))
    : 'Atual';

  return `${start} - ${end}`;
}

export function CareerTimeline({ experiences }: { experiences: Experience[] }) {
  if (experiences.length === 0) {
    return <p className="empty-state">Nenhuma experiencia publicada ainda.</p>;
  }

  return (
    <div className="timeline">
      {experiences.map((experience) => {
        const Icon = icons[experience.type];

        return (
          <article className="timeline-item" key={experience.id}>
            <div className="timeline-icon" aria-hidden="true">
              <Icon size={24} />
            </div>
            <p className="eyebrow">{labels[experience.type]}</p>
            <h3>{experience.title}</h3>
            <p className="period">{formatPeriod(experience)}</p>
            <strong>{experience.companyOrInstitution}</strong>
            <p>{experience.description}</p>
          </article>
        );
      })}
    </div>
  );
}
