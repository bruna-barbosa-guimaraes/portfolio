'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export function getStoredToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem('portfolio_token');
}

export function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getStoredToken()) {
      router.replace('/admin/login');
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) {
    return <main className="admin-page">Carregando painel...</main>;
  }

  return children;
}
