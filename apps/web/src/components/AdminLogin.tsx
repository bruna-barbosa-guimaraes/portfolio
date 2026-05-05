'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { requestApi } from '@/lib/api';

type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await requestApi<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      });

      window.localStorage.setItem('portfolio_token', result.accessToken);
      router.replace('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no login.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-box">
        <p className="eyebrow">Painel Admin</p>
        <h1>Entrar</h1>
        <form onSubmit={handleSubmit}>
          <label>
            E-mail
            <input name="email" type="email" required />
          </label>
          <label>
            Senha
            <input name="password" type="password" minLength={6} required />
          </label>
          <button className="primary-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Acessar painel'}
          </button>
          {error ? <p className="form-status error">{error}</p> : null}
        </form>
      </section>
    </main>
  );
}
