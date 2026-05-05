import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/lib/types';

type ProjectsGridProps = {
  projects: Project[];
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (projects.length === 0) {
    return <p className="empty-state">Nenhum projeto publicado ainda.</p>;
  }

  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <article className="project-card" key={project.id}>
          <div className="project-image">
            <img
              src={project.imageUrl || '/projects/portfolio.svg'}
              alt={`Imagem do projeto ${project.title}`}
            />
          </div>
          <div className="project-content">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-list">
              {project.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="project-actions">
              {project.githubUrl ? (
                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                  <Github size={18} />
                  GitHub
                </a>
              ) : null}
              {project.demoUrl ? (
                <a href={project.demoUrl} target="_blank" rel="noreferrer">
                  <ExternalLink size={18} />
                  Deploy
                </a>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
