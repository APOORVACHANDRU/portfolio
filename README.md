# 🚀 Apoorva Chandrashekar — Developer Portfolio

A personal developer portfolio with an AI chatbot powered by OpenAI and a blog for technical articles, deployed for free on Vercel.

**Live:** [portfolio-three-lemon-51.vercel.app](https://portfolio-three-lemon-51.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?logo=openai)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel)

---

## Features

- **Dark-themed responsive design** — desktop, tablet, and mobile
- **AI Chatbot** — floating chat widget powered by OpenAI GPT-4o-mini with rate limiting
- **Blog** — separate `/blogs` route with cover images, tags, and full article pages
- **Interactive skills** — clickable badges with official icons linking to documentation
- **Experience timeline** — bullet-point descriptions with tech tags
- **Certifications** — clickable cards that open verified credentials
- **Languages** — spoken language proficiency with level badges
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

- `src/lib/portfolio-data.ts` — name, bio, experience, projects, certifications, languages
- `src/lib/skills-data.ts` — skills with icons and URLs
- `src/lib/blog-data.ts` — blog articles with cover images

### 3. Add your OpenAI API key

```bash
# .env.local
OPENAI_API_KEY=sk-proj-your-key-here
```

### 4. Add your assets

- Profile photo → `public/avatar.jpeg`
- Resume → `public/resume.pdf`

### 5. Run locally

```bash
npm run dev
# → http://localhost:3000
```

---

## Project Structure

```
Portfolio/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts       # AI chatbot API (rate-limited)
│   │   ├── blogs/
│   │   │   ├── page.tsx            # Blog list page
│   │   │   └── [slug]/page.tsx     # Individual article page
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
│   │   ├── Languages.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── Chatbot.tsx
│   ├── lib/
│   │   ├── portfolio-data.ts       # Portfolio content
│   │   ├── skills-data.ts          # Skills with icons + URLs
│   │   ├── blog-data.ts            # Blog articles
│   │   └── utils.ts
│   └── __tests__/                  # Unit tests
├── e2e/                            # Playwright E2E tests
├── public/
│   ├── avatar.jpeg
│   └── resume.pdf
├── .github/workflows/ci.yml        # Lint + test CI
└── .env.local                       # API keys (not committed)
```

---

## Blog

The blog lives at `/blogs` as a separate route (not on the main page).

**To add a new article**, edit `src/lib/blog-data.ts`:

```ts
{
  title: 'Your Article Title',
  slug:  'your-article-slug',
  date:  '2026-03-01',
  excerpt: 'Short summary...',
  tags: ['Tag1', 'Tag2'],
  readingTime: '4 min read',
  coverImage: 'https://images.unsplash.com/photo-xxxx?w=1200&h=600&fit=crop',
  content: `
## Your Heading

Your content with **bold**, \`code\`, and bullet points.

- Point one
- Point two
  `,
},
```

---

## Deploy to Vercel (Free)

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → import your repo
3. Add environment variable: `OPENAI_API_KEY` = your key
4. Click **Deploy**

Every `git push` to `main` auto-deploys. Preview URLs for PRs. Free SSL + custom domain support.

---

## Testing

```bash
npm test              # Unit tests (41 tests)
npm run test:watch    # Watch mode
npm run test:e2e      # Playwright E2E tests
npm run test:all      # All tests
```

---

## Scripts

| Command                | Description                    |
|------------------------|--------------------------------|
| `npm run dev`          | Dev server (Turbopack)         |
| `npm run build`        | Production build               |
| `npm run start`        | Production server              |
| `npm run lint`         | ESLint                         |
| `npm test`             | Unit tests                     |
| `npm run test:watch`   | Unit tests (watch)             |
| `npm run test:coverage`| Unit tests + coverage          |
| `npm run test:e2e`     | Playwright E2E tests           |
| `npm run test:all`     | All tests                      |

---

## Cost

| Service            | Monthly Cost              |
|--------------------|---------------------------|
| Vercel hosting     | **$0** (free tier)        |
| OpenAI GPT-4o-mini | ~$0.50–2 (portfolio traffic) |
| **Total**          | **~$0–2/month**           |

---

## License

MIT
