# 🚀 Apoorva Chandrashekar — Developer Portfolio

A personal developer portfolio with an AI chatbot powered by OpenAI, deployed for free on Vercel.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?logo=openai)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel)

---

## Features

- **Dark-themed responsive design** — desktop, tablet, and mobile
- **AI Chatbot** — floating chat widget powered by OpenAI GPT-4o-mini with rate limiting
- **Interactive skills** — clickable badges with official icons linking to documentation
- **Experience timeline** — bullet-point descriptions with tech tags
- **Certifications** — clickable cards that open verified credentials
- **Contact form** — pre-fills and opens your email client (no backend needed)
- **SEO optimized** — metadata, Open Graph, Twitter cards
- **Full test suite** — 41 unit tests + Playwright E2E tests
- **Free deployment** — Vercel with automatic CI/CD on `git push`

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure your info

Edit `src/lib/portfolio-data.ts` — update your name, bio, experience, projects, and certifications.

Edit `src/lib/skills-data.ts` — add/remove skills with icons and URLs.

### 3. Add your OpenAI API key

```bash
# .env.local
OPENAI_API_KEY=sk-proj-your-key-here
```

Get your key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys).

### 4. Add your assets

- Profile photo → `public/avatar.jpeg`
- Resume → `public/resume.pdf`

### 5. Run locally

```bash
npm run dev
# → http://localhost:3000
```

---

## Deploy to Vercel (Free)

### Option 1 — One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/APOORVACHANDRU/portfolio)

### Option 2 — Manual setup

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → sign in with GitHub
3. Click **"Add New Project"** → import your `portfolio` repo
4. Add environment variable: `OPENAI_API_KEY` = your key
5. Click **Deploy**

That's it. Vercel gives you:
- Automatic deploys on every `git push` to `main`
- Preview deploys for pull requests
- Global edge CDN
- Free SSL + custom domain support
- Serverless API routes (chatbot works out of the box)

### Custom domain (optional)

1. In Vercel dashboard → Settings → Domains
2. Add your domain (e.g. `apoorva.dev`)
3. Update your DNS records as instructed

---

## Testing

### Unit Tests (Vitest)

```bash
npm test              # Single run (41 tests)
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

### E2E Tests (Playwright)

```bash
npx playwright install   # First time only
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # Interactive UI
```

### All tests

```bash
npm run test:all
```

---

## Project Structure

```
Portfolio/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts       # AI chatbot API (rate-limited)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Certifications.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── Chatbot.tsx
│   ├── lib/
│   │   ├── portfolio-data.ts       # ← Your content here
│   │   ├── skills-data.ts          # Skills with icons + URLs
│   │   └── utils.ts
│   └── __tests__/
├── e2e/
│   └── portfolio.spec.ts
├── public/
│   ├── avatar.jpeg
│   └── resume.pdf
├── .github/workflows/ci.yml        # Lint + test CI
└── .env.local                       # API keys (not committed)
```

---

## Scripts

| Command                | Description                    |
|------------------------|--------------------------------|
| `npm run dev`          | Dev server (Turbopack)         |
| `npm run build`        | Production build               |
| `npm run start`        | Production server              |
| `npm run lint`         | ESLint                         |
| `npm test`            | Unit tests                     |
| `npm run test:watch`   | Unit tests (watch)             |
| `npm run test:coverage`| Unit tests + coverage          |
| `npm run test:e2e`     | Playwright E2E tests           |
| `npm run test:all`     | All tests                      |

---

## Cost

| Service           | Monthly Cost |
|-------------------|--------------|
| Vercel hosting    | **$0** (free tier) |
| OpenAI GPT-4o-mini| ~$0.50–2 (portfolio traffic) |
| **Total**         | **~$0–2/month** |

---

## License

MIT
