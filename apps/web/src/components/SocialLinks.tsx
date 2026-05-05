import { Github, Linkedin, Mail } from 'lucide-react';

const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/seu-usuario';
const linkedinUrl =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ??
  'https://www.linkedin.com/in/seu-usuario';
const email = process.env.NEXT_PUBLIC_EMAIL ?? 'bruna@example.com';

export function SocialLinks() {
  return (
    <div className="social-links" aria-label="Links sociais">
      <a href={githubUrl} aria-label="GitHub" target="_blank" rel="noreferrer">
        <Github size={20} />
      </a>
      <a href={linkedinUrl} aria-label="LinkedIn" target="_blank" rel="noreferrer">
        <Linkedin size={20} />
      </a>
      <a href={`mailto:${email}`} aria-label="E-mail">
        <Mail size={20} />
      </a>
    </div>
  );
}
