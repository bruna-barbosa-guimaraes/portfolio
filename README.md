# Portfolio Fullstack

Portfolio pessoal criado como um sistema real, com frontend e backend desacoplados, autenticacao JWT, CRUD protegido e modelagem preparada para evoluir.

## Stack

- Frontend: Next.js
- Backend: NestJS
- ORM: Prisma
- Banco: MySQL
- Auth: JWT + bcrypt
- Deploy sugerido: Vercel para web e Railway/Render para API

## Arquitetura

```txt
Usuario -> Next.js -> API REST NestJS -> Prisma -> MySQL
```

```txt
apps/
  api/
    prisma/
      schema.prisma
      seed.ts
      migrations/
    src/
      prisma/
      modules/
        auth/
        users/
        projects/
        experiences/
      common/
        decorators/
        filters/
        guards/
        interceptors/
  web/
    public/
    src/
      app/
      components/
      lib/
```

## Funcionalidades

- Site publico com sobre mim, carreira, projetos e contato.
- API publica para listar projetos e experiencias.
- Login admin com JWT.
- CRUD protegido de projetos.
- CRUD protegido de experiencias.
- Seed inicial com 1 admin, 1 projeto e 1 experiencia.
- Soft delete nos conteudos gerenciaveis.
- Respostas padronizadas e filtro global de exceptions.

## Endpoints

Publicos:

- `POST /auth/login`
- `GET /projects`
- `GET /projects/:id`
- `GET /experiences`
- `GET /experiences/:id`

Protegidos por `Authorization: Bearer <token>`:

- `GET /users/me`
- `POST /projects`
- `PUT /projects/:id`
- `DELETE /projects/:id`
- `POST /experiences`
- `PUT /experiences/:id`
- `DELETE /experiences/:id`

## Rodando localmente

1. Instale as dependencias:

```bash
npm install
```

2. Copie o arquivo de ambiente:

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

3. Configure `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL` e `ADMIN_PASSWORD`.

4. Rode Prisma:

```bash
npm run prisma:generate --workspace apps/api
npm run prisma:migrate --workspace apps/api
npm run seed --workspace apps/api
```

5. Suba API e web em terminais separados:

```bash
npm run dev:api
npm run dev:web
```

URLs locais:

- Web: `http://localhost:3000`
- API: `http://localhost:3333`
- Admin: `http://localhost:3000/admin/login`

## Rodando com Docker

O projeto possui conteinerizacao para:

- `db`: MySQL 8 com volume persistente.
- `api`: NestJS em producao, rodando `prisma migrate deploy` antes de iniciar.
- `web`: Next.js em producao.

Suba tudo com:

```bash
docker compose up --build
```

URLs:

- Web: `http://localhost:3000`
- API: `http://localhost:3333`
- MySQL: `localhost:3306`

Para criar os dados iniciais depois que os containers estiverem de pe:

```bash
docker compose exec api npm run seed --workspace apps/api
```

Variaveis principais no `docker-compose.yml`:

- `DATABASE_URL`: conexao interna da API com o MySQL.
- `JWT_SECRET`: segredo para assinatura dos tokens.
- `NEXT_PUBLIC_API_URL`: URL usada pelo navegador.
- `API_INTERNAL_URL`: URL usada pelo Next.js dentro da rede Docker.

## Fluxo admin

1. Crie o banco e rode o seed.
2. Entre em `/admin/login` com `ADMIN_EMAIL` e `ADMIN_PASSWORD`.
3. Cadastre projetos e experiencias.
4. O site publico consome `GET /projects` e `GET /experiences`.

## Explicacao curta para entrevistas

"Esse projeto foi pensado como um sistema real. Separei frontend e backend para manter responsabilidades claras, usei NestJS para centralizar regras de negocio e autenticacao, e Next.js para performance e experiencia do usuario. Mesmo sendo um portfolio pessoal, a arquitetura permite evolucao sem retrabalho."
