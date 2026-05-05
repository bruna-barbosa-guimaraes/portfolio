'use client';

import { FormEvent, useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { Highlight } from './Highlight';
import { SocialLinks } from './SocialLinks';

const email = process.env.NEXT_PUBLIC_EMAIL ?? 'bruna@example.com';
const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>(
    'idle',
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!formspreeEndpoint) {
      const subject = encodeURIComponent(String(formData.get('subject') ?? 'Contato'));
      const body = encodeURIComponent(String(formData.get('message') ?? ''));
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('loading');

    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      setStatus('sent');
      form.reset();
      return;
    }

    setStatus('error');
  }

  return (
    <section className="section contact-section" id="contato">
      <div>
        <h2>
          Entre em contato se voce quiser criar sistemas{' '}
          <Highlight>bem construidos</Highlight>.
        </h2>
        <SocialLinks />
      </div>

      <div className="contact-panel">
        <div className="contact-line">
          <span>
            <Phone size={20} />
          </span>
          <div>
            <p>Telefone</p>
            <strong>(12) 3456-7890</strong>
          </div>
        </div>
        <div className="contact-line">
          <span>
            <Mail size={20} />
          </span>
          <div>
            <p>E-mail</p>
            <strong>{email}</strong>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Nome
            <input name="name" required />
          </label>
          <label>
            Assunto
            <input name="subject" required />
          </label>
          <label>
            Mensagem
            <textarea name="message" rows={4} required />
          </label>
          <button className="primary-button" disabled={status === 'loading'}>
            {status === 'loading' ? 'Enviando...' : 'Enviar contato'}
          </button>
          {status === 'sent' ? <p className="form-status">Mensagem enviada.</p> : null}
          {status === 'error' ? (
            <p className="form-status error">Nao foi possivel enviar agora.</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
