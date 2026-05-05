import { Header } from '@/components/Header';
import { CareerTimeline } from '@/components/CareerTimeline';
import { getExperiences } from '@/lib/api';

export default async function ExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <>
      <Header />
      <main className="subpage">
        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Carreira e formacao</p>
            <h1>Experiencias publicadas</h1>
            <p>Formacao, cursos e experiencias organizados em ordem cronologica.</p>
          </div>
          <CareerTimeline experiences={experiences} />
        </section>
      </main>
    </>
  );
}
