#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { PortfolioStack } from './portfolio-stack'

const app = new cdk.App()

new PortfolioStack(app, 'PortfolioStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region:  process.env.CDK_DEFAULT_REGION ?? 'us-east-1',
  },
  description: 'Personal portfolio with Next.js on ECS Fargate + CloudFront',
})
