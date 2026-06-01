export const portfolioData = {
  personal: {
    name: 'Apoorva Chandrashekar',
    title: 'Full Stack Developer',
    tagline: 'I build fast, scalable web apps with clean code and great UX.',
    email: 'apoorva.rsp@gmail.com',
    location: 'Antwerp, Beligum',
    github: 'https://github.com/APOORVACHANDRU',
    linkedin: 'https://www.linkedin.com/in/apoorva-chandrashekar-49853613b/',
    twitter: 'https://x.com/ApoorvaRsp',
    resumeUrl:   '/resume.pdf',
    avatarUrl:   '/avatar.jpeg',
    bio: `I'm a full-stack developer with 8+ years of experience building production web applications.
I specialize in React, Next.js, Node.js, and AWS. I love solving complex problems with elegant solutions
and I'm passionate about developer experience, performance, and accessibility.

When I'm not coding, I'm contributing to open source, writing technical articles, or hiking in the mountains.`,
  },

  skills: {
    languages: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'Java'],
    frontend:  ['React', 'React Native', 'Next.js', 'Tailwind CSS', 'Chakra UI', 'Material UI', 'HTML5', 'CSS3/Sass', 'Vite', 'Storybook'],
    backend:   ['Node.js', 'Express', 'Fastify', 'Apollo GraphQL', 'REST APIs', 'FastAPI', 'Redis', 'Kafka'],
    databases: ['MongoDB', 'DynamoDB', 'PostgreSQL', 'MySQL', 'ClickHouse'],
    devops:    ['AWS (Lambda, S3, CloudFront, Cognito, CloudWatch, Route53)', 'Docker', 'Kubernetes', 'Azure DevOps', 'Jenkins', 'GitLab CI/CD'],
    ai:        ['OpenAI APIs', 'LLM Integrations', 'Prompt Engineering', 'Conversational AI', 'RAG Concepts', 'AI Agent Workflows', 'Vector Databases', 'Kiro AWS'],
    tools:     ['Jira', 'Confluence', 'Figma', 'Keycloak', 'Agile/Scrum'],
  },

  experience: [
    {
      company:     'Prathama SRL',
      role:        'Senior Full Stack Engineer',
      period:      'Aug 2024 – Jan 2026',
      description: [
        'Developed and maintained scalable front-end applications using React, supported by unit testing and end-to-end testing frameworks to ensure high-quality user experiences.',
        'Designed and implemented backend services using Python, FastAPI, and Pydantic, enabling secure and high-performance API integrations.',
        'Collaborated with business stakeholders to translate requirements into production-ready software solutions.',
        'Orchestrated CI/CD integration by configuring Azure DevOps pipelines, achieving a 98% test automation success rate across builds.',
        'Built automated testing frameworks using Playwright and Python, increasing test coverage by 30%.',
        'Contributed to architectural decisions, code reviews, and engineering best practices across development teams.',
      ],
      tech:        ['React', 'Python', 'FastAPI','Pydantic', 'Azure DevOps', 'Playwright', 'TypeScript'],
    },
    {
      company:     'Sinch',
      role:        'Full Stack Developer',
      period:      'Jan 2022 – July 2024',
      description: [
        'Designed and delivered conversational AI applications serving enterprise customers across multiple industries.',
        'Built and maintained customer-facing interfaces for chatbot and AI-driven communication platforms.',
        'Migrated legacy JavaScript applications to TypeScript and Apollo GraphQL, improving platform performance by 30%.',
        'Architected and deployed micro frontends and serverless architectures using AWS (Lambda, CloudFront, Cognito).',
        'Improved system scalability and reliability by designing, implementing, and maintaining distributed backend systems using Node.js, and deploying them with Docker and Kubernetes for high availability and efficient delivery.',
        'Developed scalable frontend applications using React, Next.js, TypeScript, Chakra UI, and modern component-driven architecture.',
        'Worked in Agile cross-functional teams, collaborating with product, design, and backend teams.',
        'Exposure to Large Language Models (LLMs), prompt engineering, and AI-assisted workflows.',
        'Familiar with Retrieval-Augmented Generation (RAG), vector databases, and agent-based architectures.',
        'Mentored junior developers and participated in technical design discussions and code reviews.',
      ],
      tech:        ['React', 'Next.js', 'TypeScript', 'Apollo GraphQL', 'AWS', 'Docker', 'Kubernetes', 'Node.js', 'Chakra UI','LLM','RAG'],
    },
    {
      company:     'DXC Technology',
      role:        'Web Developer',
      period:      'Sept 2017 – Oct 2021',
      description: [
        'Developed responsive frontend apps using React, TypeScript, and Material UI, improving UI load times by 20%.',
        'Built serverless APIs on AWS Lambda with DynamoDB, supporting 3,500+ daily active users.',
        'Configured AWS Contact Flows and Amazon Connect, building customizable interfaces and enhancing customer interaction workflows with tools like Amazon Connect Control Panel (CCP).',
        'Automated regression testing using Selenium (Java), cutting execution time by 35%.',
        'Managed Jenkins automation jobs, reducing test execution failures by 40%.',
        'Led Customer Acceptance Testing (CAT), ensuring 100% compliance with business requirements and achieving a zero-defect product launch.',
      ],
      tech:        ['React', 'TypeScript', 'Material UI', 'AWS Lambda', 'DynamoDB', 'Amazon Connect', 'Selenium', 'Jenkins'],
    },
  ],

  projects: [
    {
      title:       'Fullstack EchoBot',
      description: 'A real-time fullstack chatbot with two modes: Room without Echo and Room with Echo. The backend uses Socket.io and Express (Node.js) to handle multi-user communication and echo responses. The React frontend features a chat widget where users join rooms, send messages, and see historical messages from all participants including echo replies. Also includes an InterpolateSession utility with comprehensive test coverage.',
      tech:        ['React', 'Node.js', 'Socket.io', 'Express', 'JavaScript'],
      github:      'https://github.com/APOORVACHANDRU/react-nodejs-chat-app',
      live:        null,
      featured:    true,
      image:       null,
    },
    {
      title:       'Social Media MERN Application',
      description: 'A MERN stack social media application built using MongoDB, Express.js, React, and Node.js, enabling users to create profiles, post updates, and interact in real time.It includes features like ,follow/unfollow system, likes, comments, and a personalized feed.The app is designed with a responsive UI and scalable backend architecture to support smooth user experience and future feature expansion.',
      tech:        ['MongoDB', 'Express.js', 'React', 'Node.js'],
      github:      'https://github.com/APOORVACHANDRU/MERN_Client',
      live:        null,
      featured:    true,
      image:       null,
    },
    {
      title:       'Portfolio (this site)',
      description: 'My personal developer portfolio built with Next.js 14, Tailwind CSS, and Framer Motion. Features a dark-themed responsive design, an AI chatbot powered by OpenAI GPT-4o-mini, a contact form with mailto integration, and full AWS deployment infrastructure with CDK (ECS Fargate + CloudFront). Includes CI/CD via GitHub Actions.',
      tech:        ['Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'AWS CDK', 'Docker', 'GitHub Actions'],
      github:      'https://github.com/APOORVACHANDRU/portfolio',
      live:        null,
      featured:    true,
      image:       null,
    },
  ],

  // This is fed to the AI chatbot as context
  chatbotContext: `
You are an AI assistant on Apoorva Chandrashekar's developer portfolio website.
Your job is to answer questions about Apoorva in a friendly, professional, and concise way.

About Apoorva:
- Full Stack Developer with 8+ years of experience
- Located in Antwerp, Belgium
- Email: apoorva.rsp@gmail.com
- GitHub: https://github.com/APOORVACHANDRU
- LinkedIn: https://www.linkedin.com/in/apoorva-chandrashekar-49853613b/

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

export type Project    = (typeof portfolioData.projects)[number]
export type Experience = (typeof portfolioData.experience)[number]
