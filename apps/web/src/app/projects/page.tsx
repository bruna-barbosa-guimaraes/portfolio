import { Header } from '@/components/Header';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { getProjects } from '@/lib/api';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Header />
      <main className="subpage">
        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Projetos</p>
            <h1>Projetos publicados</h1>
            <p>Uma selecao de projetos para acompanhar a evolucao tecnica.</p>
          </div>
          <ProjectsGrid projects={projects} />
        </section>
      </main>
    </>
  );
}
