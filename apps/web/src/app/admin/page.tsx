import Link from 'next/link';
import { FolderKanban, GraduationCap, ShieldCheck } from 'lucide-react';
import { AdminGuard } from '@/components/AdminGuard';
import { AdminNav } from '@/components/AdminNav';

export default function AdminPage() {
  return (
    <AdminGuard>
      <main className="admin-page">
        <AdminNav />
        <section className="admin-home">
          <div>
            <p className="eyebrow">Painel Admin</p>
            <h1>Gerencie o conteudo do portfolio</h1>
            <p>
              Use este painel para criar, editar e remover projetos e
              experiencias publicados no portfolio.
            </p>
          </div>
          <div className="admin-actions">
            <Link href="/admin/projects">
              <FolderKanban size={28} />
              Projetos
            </Link>
            <Link href="/admin/experiences">
              <GraduationCap size={28} />
              Experiencias
            </Link>
            <span>
              <ShieldCheck size={28} />
              Sessao ativa
            </span>
          </div>
        </section>
      </main>
    </AdminGuard>
  );
}
