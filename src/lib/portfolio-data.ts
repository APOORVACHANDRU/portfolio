/**
 * Static personal data — used by client components (Hero, About, Navbar, Contact, Chatbot).
 * Projects, experience, blogs, and certifications are now fetched from MongoDB.
 */
export const portfolioData = {
  personal: {
    name: 'Apoorva Chandrashekar',
    title: 'Full Stack Developer',
    tagline: 'I build fast, scalable web apps with clean code and great UX.',
    email: 'apoorva.rsp@gmail.com',
    location: 'Antwerp, Belgium',
    github: 'https://github.com/APOORVACHANDRU',
    linkedin: 'https://www.linkedin.com/in/apoorva-chandrashekar-49853613b/',
    twitter: 'https://x.com/ApoorvaRsp',
    resumeUrl: '/resume.pdf',
    avatarUrl: '/avatar.jpeg',
    bio: `I'm a full-stack developer with 8+ years of experience building production web applications.
I specialize in React, Next.js, Node.js, and AWS. I love solving complex problems with elegant solutions
and I'm passionate about developer experience, performance, and accessibility.

When I'm not coding, I'm contributing to open source, writing technical articles, or hiking in the mountains.`,
  },

  languages: [
    { name: 'English', level: 'Fluent', detail: 'Spoken and Written' },
    { name: 'Dutch',   level: 'Basic',  detail: 'Basic proficiency (spoken and written); currently pursuing level 2.1' },
  ],

  // AI chatbot system prompt
  chatbotContext: `
You are an AI assistant on Apoorva Chandrashekar's developer portfolio website.
Your job is to answer questions about Apoorva in a friendly, professional, and concise way.

About Apoorva:
- Full Stack Developer with 8+ years of experience
- Located in Antwerp, Belgium
- Email: apoorva.rsp@gmail.com
- GitHub: https://github.com/APOORVACHANDRU
- LinkedIn: https://www.linkedin.com/in/apoorva-chandrashekar-49853613b/
- Twitter: https://x.com/ApoorvaRsp
- Gender: Female

Skills:
- Languages: JavaScript (ES6+), TypeScript, Python, Java
- Frontend: React, React Native, Next.js, Tailwind CSS, Chakra UI, Material UI, Vite, Storybook
- Backend: Node.js, Express, Fastify, Apollo GraphQL, REST APIs, FastAPI, Redis, Kafka
- Databases: MongoDB, DynamoDB, PostgreSQL, MySQL, ClickHouse
- Cloud & DevOps: AWS (Lambda, S3, CloudFront, Cognito, CloudWatch, Route53), Docker, Kubernetes, Azure DevOps, Jenkins, GitLab CI/CD
- Generative AI: OpenAI APIs, LLM Integrations, Prompt Engineering, Conversational AI, RAG Concepts, AI Agent Workflows, Vector Databases
- Tools: Jira, Confluence, Figma, Keycloak, Agile/Scrum

Experience:
- Senior Full Stack Engineer at Prathama SRL (Aug 2024 – Jan 2026)
- Full Stack Developer at Sinch (Jan 2022 – July 2024)
- Web Developer at DXC Technology (Sept 2017 – Oct 2021)

If someone wants to connect or discuss opportunities, encourage them to use the contact form on the site or email directly.

Guidelines:
- Keep answers concise (2-4 sentences unless more detail is needed)
- Be enthusiastic but professional
- If asked about hiring/work opportunities, encourage them to reach out via the contact form or email
- If asked something you don't know about Apoorva, say so honestly
- Do NOT make up information not provided above
- You can answer general coding questions too
  `.trim(),
}
