# 🚀 Personal Developer Portfolio

A production-ready personal portfolio with an AI chatbot powered by Anthropic Claude, deployed on AWS with CI/CD.

## Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | Next.js 14 (App Router) + TypeScript    |
| Styling    | Tailwind CSS + Framer Motion            |
| AI Chatbot | Anthropic Claude 3 Haiku                |
| Container  | Docker (multi-stage, standalone output) |
| AWS Infra  | ECS Fargate + ECR + ALB + CloudFront   |
| IaC        | AWS CDK v2 (TypeScript)                 |
| CI/CD      | GitHub Actions                          |

## Project Structure

```
Portfolio/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts   # AI chatbot API (rate-limited)
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
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── Chatbot.tsx         # AI chat widget
│   └── lib/
│       ├── portfolio-data.ts   # ← Edit your info here
│       └── utils.ts
├── cdk/                        # AWS CDK infrastructure
│   └── lib/
│       ├── app.ts
│       └── portfolio-stack.ts
├── .github/workflows/
│   └── deploy.yml              # CI/CD pipeline
├── Dockerfile
└── .env.local
```

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure your info

Edit `src/lib/portfolio-data.ts` — update your name, bio, projects, experience, and skills.

### 3. Add your Anthropic API key

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get your key at [console.anthropic.com](https://console.anthropic.com).

### 4. Run locally

```bash
npm run dev
# → http://localhost:3000
```

---

## AWS Deployment

### Prerequisites

- AWS CLI configured (`aws configure`)
- Docker installed and running
- Node.js 20+

### Step 1 — Bootstrap CDK (first time only)

```bash
cd cdk
npm install
npx cdk bootstrap
```

### Step 2 — Deploy infrastructure

```bash
npx cdk deploy
```

This creates:
- ECR repository
- VPC with public/private subnets
- ECS Fargate cluster + service
- Application Load Balancer
- CloudFront distribution
- Secrets Manager secret for the API key

Note the outputs — you'll need the **ECR URI** and **CloudFront URL**.

### Step 3 — Store your Anthropic API key

```bash
aws secretsmanager put-secret-value \
  --secret-id portfolio/anthropic-api-key \
  --secret-string '{"ANTHROPIC_API_KEY":"sk-ant-your-key-here"}'
```

### Step 4 — Build and push Docker image

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin <YOUR_ECR_URI>

# Build and push
docker build -t portfolio .
docker tag portfolio:latest <YOUR_ECR_URI>:latest
docker push <YOUR_ECR_URI>:latest
```

### Step 5 — Force ECS to pull the new image

```bash
aws ecs update-service \
  --cluster portfolio-cluster \
  --service portfolio-service \
  --force-new-deployment
```

Your portfolio is now live at the CloudFront URL from Step 2.

---

## CI/CD (GitHub Actions)

Every push to `main` automatically:
1. Lints and type-checks the code
2. Builds and pushes a Docker image to ECR (tagged with commit SHA)
3. Updates the ECS task definition
4. Deploys to ECS Fargate with zero-downtime rolling update

### Required GitHub Secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret                  | Value                          |
|-------------------------|--------------------------------|
| `AWS_ACCESS_KEY_ID`     | IAM user access key            |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key            |

### Required GitHub Variables

Go to **Settings → Secrets and variables → Actions → Variables**:

| Variable        | Value                          |
|-----------------|--------------------------------|
| `OWNER_NAME`    | Your full name                 |
| `OWNER_TITLE`   | Your job title                 |
| `OWNER_EMAIL`   | Your email                     |
| `GITHUB_URL`    | Your GitHub profile URL        |
| `LINKEDIN_URL`  | Your LinkedIn profile URL      |

### IAM Permissions for CI/CD

Create an IAM user with these policies:
- `AmazonEC2ContainerRegistryPowerUser`
- `AmazonECS_FullAccess`

---

## Customization

### Update portfolio content

All content lives in `src/lib/portfolio-data.ts`:

```ts
export const portfolioData = {
  personal: { name, title, bio, email, ... },
  skills:   { frontend, backend, devops, tools },
  experience: [...],
  projects:   [...],
  chatbotContext: '...',  // What the AI knows about you
}
```

### Update the AI chatbot persona

Edit the `chatbotContext` string in `portfolio-data.ts`. This is the system prompt fed to Claude — describe yourself, your projects, and how you want the bot to respond.

### Add a custom domain

In `cdk/lib/portfolio-stack.ts`, add a `domainNames` and `certificate` to the CloudFront distribution. See [CDK docs](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudfront.Distribution.html).

---

## Cost Estimate (AWS)

| Service          | Estimated Monthly Cost |
|------------------|------------------------|
| ECS Fargate      | ~$8–15 (0.25 vCPU, 0.5GB) |
| ALB              | ~$16                   |
| CloudFront       | ~$1–2 (low traffic)    |
| ECR              | ~$0.10                 |
| Secrets Manager  | ~$0.40                 |
| **Total**        | **~$25–35/month**      |

Anthropic Claude 3 Haiku: ~$0.50–2/month for typical portfolio traffic.

> **Tip:** To reduce costs, you can scale ECS to 0 tasks during off-hours using scheduled scaling.

---

## License

MIT
