import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Highlight } from '@/components/Highlight';
import { SocialLinks } from '@/components/SocialLinks';
import { CareerTimeline } from '@/components/CareerTimeline';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { ContactSection } from '@/components/ContactSection';
import { getExperiences, getProjects } from '@/lib/api';

export default async function HomePage() {
  const [projects, experiences] = await Promise.all([
    getProjects(),
    getExperiences(),
  ]);

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <h1>
            Ola, eu sou a <Highlight>Bruna!</Highlight>
          </h1>
          <p>
            Desenvolvedora fullstack interessada em criar interfaces claras,
            APIs bem organizadas e produtos que resolvem problemas reais.
          </p>
        </section>

        <section className="section about-section" id="sobre">
          <div className="about-copy">
            <h2>
              Sobre <Highlight>Bruna Barbosa</Highlight>
            </h2>
            <p>
              Minha trajetoria combina frontend, backend e modelagem de dados.
              Este portfolio foi pensado como um sistema real: conteudo
              gerenciado por painel administrativo, API protegida por JWT e
              estrutura pronta para evoluir.
            </p>
            <p>
              Gosto de projetos onde a experiencia do usuario e a arquitetura
              caminham juntas, com responsabilidades claras e codigo facil de
              manter.
            </p>
            <SocialLinks />
          </div>
          <div className="profile-visual" aria-hidden="true">
            <Image
              src="/profile-arch.svg"
              alt=""
              width={520}
              height={620}
              priority
            />
          </div>
        </section>

        <section className="section career-preview" id="carreira">
          <div className="section-heading">
            <p className="eyebrow">Carreira e formacao</p>
            <h2>Marcos de estudo, pratica e experiencia profissional.</h2>
            <Link href="/experiences">Ver carreira completa</Link>
          </div>
          <CareerTimeline experiences={experiences.slice(0, 5)} />
        </section>

        <section className="section" id="projetos">
          <div className="section-heading">
            <p className="eyebrow">Projetos</p>
            <h2>Trabalhos que conectam produto, codigo e arquitetura.</h2>
            <Link href="/projects">Ver todos os projetos</Link>
          </div>
          <ProjectsGrid projects={projects.slice(0, 3)} />
        </section>

        <ContactSection />
      </main>
    </>
  );
}
