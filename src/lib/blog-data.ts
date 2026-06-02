export interface BlogPost {
  title:       string
  slug:        string
  date:        string
  excerpt:     string
  tags:        string[]
  content:     string
  readingTime: string
  coverImage?: string  // URL to cover image
}

export const blogPosts: BlogPost[] = [
  {
    title: 'Stick to the Plan – Lessons in Discipline and Execution',
    slug:  'stick-to-the-plan-discipline',
    date:  '2026-05-20',
    excerpt: 'Key takeaways from the GoodHabitz course on building discipline as a daily skill — planning smart, staying focused, and taking consistent action even when it gets hard.',
    tags: ['Productivity', 'Discipline', 'Personal Growth', 'Habits'],
    readingTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=600&fit=crop',
    content: `
## "When it is obvious that the goals cannot be reached, don't adjust the goals, adjust the steps." – Confucius

## Tomorrow Never Comes

Discipline is a skill – not a trait. Like a muscle, it strengthens with consistent effort.

Drawing inspiration from James Clear's story and Atomic Habits, the foundation of success lies in:

- Willpower, perseverance, and focus
- Reducing distractions (like excessive phone use)
- Understanding how sugar and habits impact concentration
- Building self-control for long-term gains

## Winners Have a Plan

Success isn't accidental – it's intentional.

- Reflect on past failures to shape future success
- Break goals into small, achievable milestones
- Use visualization and planning tools (like goal maps and willpower types)
- Learn, adapt, and implement from mistakes
- Structure your day with smart planning techniques

## And... Action!

Execution is where the magic happens.

- Beat procrastination with focused to-do lists and time management
- Use the ABCDE method to prioritize tasks
- Apply the Eisenhower Matrix to separate urgent from important
- Surround yourself with motivation and tackle your toughest tasks first

## Level-Headed & Adamant

Stay grounded and distraction-free.

- Build focus rituals: mindfulness breaks, clutter-free spaces, and gratitude
- Remind yourself regularly of your "why"
- Train your mind to stay in the present and follow your intuition

## Just Do It!

Discipline isn't just mental – it's physical.

- Treat it like a muscle: rest, nourish, and train it daily
- With sleep, nutrition, and small wins, your willpower grows stronger

## 🎯 Key Takeaway

Discipline is a skill you build daily — by planning smart, staying focused, and taking consistent action, even when it's hard. Start small, stay consistent, and watch the compound effect transform your productivity.
    `.trim(),
  },
  {
    title: 'Responsible Use of AI – Ethics, Risks, and Critical Thinking',
    slug:  'responsible-use-of-ai',
    date:  '2026-05-25',
    excerpt: 'Key takeaways from the GoodHabitz course on using AI responsibly — understanding benefits, recognizing risks like deepfakes and privacy concerns, and applying ethical principles in daily work.',
    tags: ['AI', 'Ethics', 'Responsible AI', 'Personal Growth'],
    readingTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=600&fit=crop',
    content: `
## Responsible Use of AI

This lesson emphasizes the importance of using AI responsibly and understanding both its potential and its risks.

## AI's Benefits

- AI enhances convenience and can save lives — e.g., diagnosing conditions like pneumonia more accurately
- **AI-driven taxis** are already operating in cities like San Francisco and Los Angeles
- Services like **"Be My Eyes"** assist visually impaired individuals using AI technology
- AI accelerates research, automates repetitive tasks, and unlocks creative possibilities

## Risks of AI

- **AI can make mistakes** — it's artificial, not infallible
- **Privacy concerns** — you can't always be sure how your data is used by organizations
- The line between responsible and irresponsible AI use is very blurry, so caution and critical thinking are essential

## Types of AI Risks

### 1. Intent Risk

- Unintentionally consuming AI content
- Deliberate misuse for harm

### 2. Usage Risk

Involves how AI content is created and consumed:

- **Misuse:** Generating fake content (e.g., deepfakes)
- **Misapply:** Relying on AI without verifying its output
- **Misrepresent:** Sharing known false content
- **Misadventure:** Accidentally spreading AI-generated misinformation or unknowingly sharing personal data with AI tools

## Laying Down the Law

Legislation is lagging behind technological advances, creating "grey zones" in AI regulation.

- This makes it crucial to be proactive in using AI responsibly
- Stay vigilant by double-checking any AI-generated data
- While AI is an excellent source of inspiration, be transparent when using it for more than that
- Think carefully before sharing any content

## 🎯 Key Takeaway

Learn to recognize risks, use AI ethically, and apply basic principles of responsible AI usage in daily life and work. Always verify, always think critically, and always be transparent about AI-generated content.
    `.trim(),
  },
  {
    title: 'Building a Portfolio with Next.js, Tailwind, and an AI Chatbot',
    slug:  'building-portfolio-nextjs-ai-chatbot',
    date:  '2026-01-15',
    excerpt: 'How I built this portfolio site with Next.js 14 App Router, Tailwind CSS, and integrated an AI chatbot powered by OpenAI GPT-4o-mini.',
    tags: ['Next.js', 'TypeScript', 'OpenAI', 'Tailwind CSS'],
    readingTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
    content: `
## Why I built this

After years of working across multiple companies and tech stacks, I wanted a portfolio that truly represents my skills — not just a static page, but something interactive with real engineering behind it.

## The Stack

- **Next.js 14** with App Router for server-side rendering and API routes
- **Tailwind CSS** for rapid styling with a custom dark theme
- **OpenAI GPT-4o-mini** for the chatbot — cheap, fast, and smart enough
- **Vercel** for deployment — zero config, free tier

## Key Decisions

### AI Chatbot with Rate Limiting

The chatbot uses a system prompt loaded from \`portfolio-data.ts\` so it knows about my experience. I added in-memory rate limiting (10 req/min per IP) to prevent abuse.

### Skills with Clickable Icons

Each skill badge links to its official documentation and shows the logo from devicon CDN. Specializations are rendered as static badges.

### Contact Form without a Backend

Instead of building a form backend, I use a \`mailto:\` link that pre-fills the subject and body. Zero cost, zero maintenance.

## Deployment

Vercel handles everything — automatic deploys on git push, preview URLs for PRs, and edge CDN globally. Total cost: $0/month for hosting.
    `.trim(),
  },
]
