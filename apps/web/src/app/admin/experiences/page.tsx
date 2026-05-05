import { AdminGuard } from '@/components/AdminGuard';
import { AdminNav } from '@/components/AdminNav';
import { AdminExperiences } from '@/components/AdminExperiences';

export default function AdminExperiencesPage() {
  return (
    <AdminGuard>
      <main className="admin-page">
        <AdminNav />
        <section>
          <p className="eyebrow">CRUD</p>
          <h1>Experiencias</h1>
          <AdminExperiences />
        </section>
      </main>
    </AdminGuard>
  );
}
