import Link from 'next/link';

const navItems = [
  { href: '/#sobre', label: 'Sobre mim' },
  { href: '/experiences', label: 'Carreira' },
  { href: '/projects', label: 'Projetos' },
  { href: '/#contato', label: 'Contato' },
];

export function Header() {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Navegacao principal">
        <div className="nav-links">
          {navItems.map((item) => (
            <Link className="nav-button" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <Link className="login-link" href="/admin/login">
          Entrar
        </Link>
      </nav>
    </header>
  );
}
