export interface Skill {
  name: string
  icon: string   // devicon CDN URL or custom SVG URL
  url:  string   // official website
}

export interface SkillCategory {
  key:    string
  label:  string
  emoji:  string
  skills: Skill[]
}

// Icons from https://cdn.jsdelivr.net/gh/devicons/devicon/icons/
const devicon = (name: string, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`

export const skillCategories: SkillCategory[] = [
  {
    key: 'languages',
    label: 'Languages',
    emoji: '💻',
    skills: [
      { name: 'JavaScript',  icon: devicon('javascript'),           url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'TypeScript',  icon: devicon('typescript'),           url: 'https://www.typescriptlang.org' },
      { name: 'Python',      icon: devicon('python'),               url: 'https://www.python.org' },
      { name: 'Java',        icon: devicon('java'),                 url: 'https://www.java.com' },
    ],
  },
  {
    key: 'frontend',
    label: 'Frontend',
    emoji: '🎨',
    skills: [
      { name: 'React',         icon: devicon('react'),              url: 'https://react.dev' },
      { name: 'React Native',  icon: devicon('react'),              url: 'https://reactnative.dev' },
      { name: 'Next.js',       icon: devicon('nextjs', 'original'), url: 'https://nextjs.org' },
      { name: 'Tailwind CSS',  icon: devicon('tailwindcss'),        url: 'https://tailwindcss.com' },
      { name: 'Material UI',   icon: devicon('materialui'),         url: 'https://mui.com' },
      { name: 'HTML5',         icon: devicon('html5'),              url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { name: 'CSS3/Sass',     icon: devicon('sass'),               url: 'https://sass-lang.com' },
      { name: 'Vite',          icon: devicon('vitejs'),             url: 'https://vitejs.dev' },
      { name: 'Storybook',     icon: devicon('storybook'),          url: 'https://storybook.js.org' },
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    emoji: '⚙️',
    skills: [
      { name: 'Node.js',        icon: devicon('nodejs'),            url: 'https://nodejs.org' },
      { name: 'Express',        icon: devicon('express'),           url: 'https://expressjs.com' },
      { name: 'Fastify',        icon: devicon('fastify'),           url: 'https://fastify.dev' },
      { name: 'Apollo GraphQL', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/apollographql.svg', url: 'https://www.apollographql.com' },
      { name: 'FastAPI',        icon: devicon('fastapi'),           url: 'https://fastapi.tiangolo.com' },
      { name: 'Redis',          icon: devicon('redis'),             url: 'https://redis.io' },
      { name: 'Kafka',          icon: devicon('apachekafka'),       url: 'https://kafka.apache.org' },
    ],
  },
  {
    key: 'databases',
    label: 'Databases',
    emoji: '🗄️',
    skills: [
      { name: 'MongoDB',      icon: devicon('mongodb'),             url: 'https://www.mongodb.com' },
      { name: 'DynamoDB',     icon: devicon('dynamodb'),            url: 'https://aws.amazon.com/dynamodb' },
      { name: 'PostgreSQL',   icon: devicon('postgresql'),          url: 'https://www.postgresql.org' },
      { name: 'MySQL',        icon: devicon('mysql'),               url: 'https://www.mysql.com' },
      { name: 'ClickHouse',   icon: 'https://cdn.jsdelivr.net/gh/ClickHouse/clickhouse-docs@main/docs/en/images/logos/logo.svg', url: 'https://clickhouse.com' },
    ],
  },
  {
    key: 'devops',
    label: 'Cloud & DevOps',
    emoji: '☁️',
    skills: [
      { name: 'AWS',           icon: devicon('amazonwebservices', 'plain-wordmark'), url: 'https://aws.amazon.com' },
      { name: 'Docker',        icon: devicon('docker'),             url: 'https://www.docker.com' },
      { name: 'Kubernetes',    icon: devicon('kubernetes'),         url: 'https://kubernetes.io' },
      { name: 'Azure DevOps',  icon: devicon('azure'),              url: 'https://azure.microsoft.com/en-us/products/devops' },
      { name: 'Jenkins',       icon: devicon('jenkins'),            url: 'https://www.jenkins.io' },
      { name: 'GitLab CI/CD',  icon: devicon('gitlab'),             url: 'https://about.gitlab.com' },
    ],
  },
  {
    key: 'ai',
    label: 'Generative AI',
    emoji: '🤖',
    skills: [
      { name: 'OpenAI',            icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg', url: 'https://platform.openai.com' },
      { name: 'Prompt Engineering', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
      { name: 'LLM Integrations',  icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg', url: 'https://platform.openai.com/docs' },
      { name: 'RAG',               icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pinecone.svg', url: 'https://www.pinecone.io' },
      { name: 'AI Agents',         icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/langchain.svg', url: 'https://www.langchain.com' },
      { name: 'Kiro AWS',          icon: devicon('amazonwebservices', 'plain-wordmark'), url: 'https://kiro.dev' },
    ],
  },
  {
    key: 'tools',
    label: 'Tools & Platforms',
    emoji: '🛠️',
    skills: [
      { name: 'Jira',        icon: devicon('jira'),                 url: 'https://www.atlassian.com/software/jira' },
      { name: 'Confluence',  icon: devicon('confluence'),           url: 'https://www.atlassian.com/software/confluence' },
      { name: 'Figma',       icon: devicon('figma'),                url: 'https://www.figma.com' },
      { name: 'Keycloak',    icon: 'https://www.keycloak.org/resources/images/icon.svg', url: 'https://www.keycloak.org' },
      { name: 'Git',         icon: devicon('git'),                  url: 'https://git-scm.com' },
    ],
  },
]
