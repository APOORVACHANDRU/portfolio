# 🚀 Apoorva Chandrashekar — Developer Portfolio

A personal developer portfolio with an AI chatbot powered by OpenAI, a blog system, and MongoDB-backed content management — deployed for free on Vercel.

**Live:** [portfolio-three-lemon-51.vercel.app](https://portfolio-three-lemon-51.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?logo=openai)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel)

---

## Features

- **AI Chatbot** — floating chat widget powered by OpenAI GPT-4o-mini with rate limiting
- **MongoDB Backend** — all content (projects, experience, blogs, certifications) stored in MongoDB Atlas
- **REST API** — full CRUD endpoints with Zod validation for all content types
- **Blog System** — separate `/blogs` route with cover images, tags, and dynamic article pages
- **Interactive Skills** — clickable badges with official icons linking to documentation
- **Experience Timeline** — bullet-point descriptions with tech tags
- **Certifications** — clickable cards opening verified credentials
- **Languages** — spoken language proficiency with level badges
- **Contact Form** — pre-fills and opens email client (no backend needed)
- **Dark-themed Responsive Design** — desktop, tablet, and mobile
- **SEO Optimized** — metadata, Open Graph, Twitter cards
- **Full Test Suite** — 40 unit tests + Playwright E2E tests
- **Free Deployment** — Vercel with automatic CI/CD on `git push`

---

## Architecture

```
┌──────────────────────────────────────────────────┐
│                   Vercel (Free)                   │
├──────────────────────────────────────────────────┤
│  Next.js 14 (App Router)                         │
│  ├── Server Components → fetch from MongoDB      │
│  ├── Client Components → interactive UI          │
│  └── API Routes → REST endpoints + AI chatbot    │
├──────────────────────────────────────────────────┤
│  MongoDB Atlas (Free M0 cluster)                 │
│  ├── projects                                    │
│  ├── experiences                                 │
│  ├── blogs                                       │
│  └── certifications                              │
├──────────────────────────────────────────────────┤
│  OpenAI API (GPT-4o-mini)                        │
│  └── /api/chat — AI chatbot                      │
└──────────────────────────────────────────────────┘
```

---

## Project Structure

```
Portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts           # AI chatbot (OpenAI)
│   │   │   ├── projects/
│   │   │   │   ├── route.ts            # GET, POST
│   │   │   │   └── [id]/route.ts       # GET, PUT, DELETE
│   │   │   ├── experience/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── blogs/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── certifications/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   └── seed/route.ts           # One-time data migration
│   │   ├── blogs/
│   │   │   ├── page.tsx                # Blog list
│   │   │   └── [slug]/page.tsx         # Article page
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Home (fetches from MongoDB)
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx              # Receives data via props
│   │   ├── Projects.tsx                # Receives data via props
│   │   ├── Certifications.tsx          # Receives data via props
│   │   ├── Languages.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── Chatbot.tsx
│   ├── lib/
│   │   ├── db/
│   │   │   ├── connection.ts           # Cached MongoDB connection
│   │   │   ├── queries.ts             # Server-side data fetchers
│   │   │   ├── validators.ts          # Zod schemas for all CRUD
│   │   │   └── models/
│   │   │       ├── index.ts
│   │   │       ├── project.ts         # Mongoose model
│   │   │       ├── experience.ts
│   │   │       ├── blog.ts
│   │   │       └── certification.ts
│   │   ├── portfolio-data.ts           # Personal info + chatbot context
│   │   ├── skills-data.ts             # Skills with icons + URLs
│   │   └── utils.ts
│   └── __tests__/                      # Unit tests
├── e2e/                                # Playwright E2E tests
├── public/
│   ├── avatar.jpeg
│   └── resume.pdf
├── .github/workflows/ci.yml
└── .env.local                          # API keys (not committed)
```

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up MongoDB Atlas (free)

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → create free M0 cluster
2. Create a database user
3. Under Network Access → add `0.0.0.0/0`
4. Get your connection string

### 3. Configure environment

Create `.env.local`:

```bash
OPENAI_API_KEY=sk-proj-your-key-here
MONGODB_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
SEED_SECRET=any-random-string
RATE_LIMIT_RPM=10
```

### 4. Add your assets

- Profile photo → `public/avatar.jpeg`
- Resume → `public/resume.pdf`

### 5. Run locally

```bash
npm run dev
# → http://localhost:3000
```

### 6. Seed the database (one-time)

Open in browser:
```
http://localhost:3000/api/seed?secret=YOUR_SEED_SECRET
```

This migrates your static data into MongoDB. Only needed once.

---

## REST API

All endpoints validate input with Zod and return proper error messages.

### Projects

| Method | Endpoint | Description |
|--------|------|-------------|
| GET | `/api/projects` | List all projects |
| POST | `/api/projects` | Create project |
| GET | `/api/projects/:id` | Get single project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

### Experience

| Method | Endpoint | Description |
|--------|------|-------------|
| GET | `/api/experience` | List all |
| POST | `/api/experience` | Create |
| GET | `/api/experience/:id` | Get one |
| PUT | `/api/experience/:id` | Update |
| DELETE | `/api/experience/:id` | Delete |

### Blogs

| Method | Endpoint | Description |
|--------|------|-------------|
| GET | `/api/blogs` | List published |
| POST | `/api/blogs` | Create |
| GET | `/api/blogs/:id` | Get by ID or slug |
| PUT | `/api/blogs/:id` | Update |
| DELETE | `/api/blogs/:id` | Delete |

### Certifications

| Method | Endpoint | Description |
|--------|------|-------------|
| GET | `/api/certifications` | List all |
| POST | `/api/certifications` | Create |
| PUT | `/api/certifications/:id` | Update |
| DELETE | `/api/certifications/:id` | Delete |

### Example: Add a project

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "A cool project.",
    "tech": ["React", "Node.js"],
    "github": "https://github.com/user/repo",
    "live": "https://myproject.vercel.app",
    "featured": true
  }'
```

---

## Deploy to Vercel (Free)

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → import your repo
3. Add environment variables:
   - `OPENAI_API_KEY`
   - `MONGODB_URI`
   - `SEED_SECRET`
4. Click **Deploy**

Every `git push` to `main` auto-deploys.

---

## Testing

```bash
npm test              # Unit tests (40 tests)
npm run test:watch    # Watch mode
npm run test:e2e      # Playwright E2E tests
npm run test:all      # All tests
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |
| `npm test` | Unit tests |
| `npm run test:watch` | Unit tests (watch) |
| `npm run test:coverage` | Unit tests + coverage |
| `npm run test:e2e` | Playwright E2E tests |
| `npm run test:all` | All tests |

---

## Adding Content

### Via API (recommended)

Use the REST endpoints to add/update/delete content. Changes reflect immediately on the live site.

### Blog articles

```bash
curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Article",
    "slug": "my-article",
    "date": "2026-06-01",
    "excerpt": "Short summary...",
    "tags": ["React"],
    "readingTime": "3 min read",
    "coverImage": "https://images.unsplash.com/photo-xxx?w=1200&h=600&fit=crop",
    "content": "## Heading\n\nYour content here...",
    "published": true
  }'
```

### Static data

Personal info, skills, languages, and chatbot context remain in `src/lib/portfolio-data.ts` and `src/lib/skills-data.ts`.

---

## Cost

| Service | Monthly Cost |
|---------|---|
| Vercel hosting | **$0** (free tier) |
| MongoDB Atlas | **$0** (free M0, 512MB) |
| OpenAI GPT-4o-mini | ~$0.50–2 |
| **Total** | **~$0–2/month** |

---

## License

MIT
