'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FolderKanban, GraduationCap, LogOut, LayoutDashboard } from 'lucide-react';

export function AdminNav() {
  const router = useRouter();

  function logout() {
    window.localStorage.removeItem('portfolio_token');
    router.replace('/admin/login');
  }

  return (
    <nav className="admin-nav" aria-label="Navegacao do painel">
      <Link href="/admin">
        <LayoutDashboard size={18} />
        Dashboard
      </Link>
      <Link href="/admin/projects">
        <FolderKanban size={18} />
        Projetos
      </Link>
      <Link href="/admin/experiences">
        <GraduationCap size={18} />
        Experiencias
      </Link>
      <button type="button" onClick={logout}>
        <LogOut size={18} />
        Sair
      </button>
    </nav>
  );
}
