import { AdminGuard } from '@/components/AdminGuard';
import { AdminNav } from '@/components/AdminNav';
import { AdminProjects } from '@/components/AdminProjects';

export default function AdminProjectsPage() {
  return (
    <AdminGuard>
      <main className="admin-page">
        <AdminNav />
        <section>
          <p className="eyebrow">CRUD</p>
          <h1>Projetos</h1>
          <AdminProjects />
        </section>
      </main>
    </AdminGuard>
  );
}
