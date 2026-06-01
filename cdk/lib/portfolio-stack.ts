import * as cdk          from 'aws-cdk-lib'
import * as ec2           from 'aws-cdk-lib/aws-ec2'
import * as ecs           from 'aws-cdk-lib/aws-ecs'
import * as ecr           from 'aws-cdk-lib/aws-ecr'
import * as elbv2         from 'aws-cdk-lib/aws-elasticloadbalancingv2'
import * as cloudfront    from 'aws-cdk-lib/aws-cloudfront'
import * as origins       from 'aws-cdk-lib/aws-cloudfront-origins'
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager'
import * as logs          from 'aws-cdk-lib/aws-logs'
import * as iam           from 'aws-cdk-lib/aws-iam'
import { Construct }      from 'constructs'

export class PortfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // ─── ECR Repository ───────────────────────────────────────────────────────
    const repository = new ecr.Repository(this, 'PortfolioRepo', {
      repositoryName:   'portfolio',
      removalPolicy:    cdk.RemovalPolicy.DESTROY,
      lifecycleRules: [{
        maxImageCount:  5,
        description:    'Keep only last 5 images',
      }],
    })

    // ─── VPC ──────────────────────────────────────────────────────────────────
    const vpc = new ec2.Vpc(this, 'PortfolioVpc', {
      maxAzs:           2,
      natGateways:      1,
      subnetConfiguration: [
        { name: 'Public',  subnetType: ec2.SubnetType.PUBLIC,           cidrMask: 24 },
        { name: 'Private', subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS, cidrMask: 24 },
      ],
    })

    // ─── ECS Cluster ──────────────────────────────────────────────────────────
    const cluster = new ecs.Cluster(this, 'PortfolioCluster', {
      vpc,
      clusterName:          'portfolio-cluster',
      containerInsights:    true,
    })

    // ─── Secrets ──────────────────────────────────────────────────────────────
    // Store the OpenAI API key in Secrets Manager
    // After deploy, update the secret value via AWS Console or CLI:
    //   aws secretsmanager put-secret-value --secret-id portfolio/openai-api-key --secret-string '{"OPENAI_API_KEY":"sk-..."}'
    const openaiSecret = new secretsmanager.Secret(this, 'OpenAIApiKey', {
      secretName:   'portfolio/openai-api-key',
      description:  'OpenAI API key for portfolio chatbot',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ OPENAI_API_KEY: 'REPLACE_ME' }),
        generateStringKey:    '_unused',
      },
    })

    // ─── Task Definition ──────────────────────────────────────────────────────
    const taskRole = new iam.Role(this, 'TaskRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    })

    const executionRole = new iam.Role(this, 'ExecutionRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonECSTaskExecutionRolePolicy'),
      ],
    })

    // Allow execution role to read the secret
    openaiSecret.grantRead(executionRole)

    const logGroup = new logs.LogGroup(this, 'PortfolioLogs', {
      logGroupName:  '/ecs/portfolio',
      retention:     logs.RetentionDays.ONE_WEEK,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    const taskDef = new ecs.FargateTaskDefinition(this, 'PortfolioTask', {
      memoryLimitMiB: 512,
      cpu:            256,
      taskRole,
      executionRole,
    })

    taskDef.addContainer('PortfolioContainer', {
      image:        ecs.ContainerImage.fromEcrRepository(repository, 'latest'),
      portMappings: [{ containerPort: 3000 }],
      environment: {
        NODE_ENV:                    'production',
        PORT:                        '3000',
        NEXT_PUBLIC_OWNER_NAME:      'Alex Johnson',
        NEXT_PUBLIC_OWNER_TITLE:     'Full Stack Developer',
        NEXT_PUBLIC_OWNER_EMAIL:     'alex@example.com',
        NEXT_PUBLIC_GITHUB_URL:      'https://github.com/alexjohnson',
        NEXT_PUBLIC_LINKEDIN_URL:    'https://linkedin.com/in/alexjohnson',
        RATE_LIMIT_RPM:              '10',
      },
      secrets: {
        OPENAI_API_KEY: ecs.Secret.fromSecretsManager(openaiSecret, 'OPENAI_API_KEY'),
      },
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'portfolio',
        logGroup,
      }),
      healthCheck: {
        command:     ['CMD-SHELL', 'curl -f http://localhost:3000/ || exit 1'],
        interval:    cdk.Duration.seconds(30),
        timeout:     cdk.Duration.seconds(5),
        retries:     3,
        startPeriod: cdk.Duration.seconds(60),
      },
    })

    // ─── ALB ──────────────────────────────────────────────────────────────────
    const alb = new elbv2.ApplicationLoadBalancer(this, 'PortfolioALB', {
      vpc,
      internetFacing: true,
      loadBalancerName: 'portfolio-alb',
    })

    const listener = alb.addListener('HttpListener', {
      port:         80,
      open:         true,
      defaultAction: elbv2.ListenerAction.fixedResponse(200, {
        contentType: 'text/plain',
        messageBody: 'OK',
      }),
    })

    // ─── Fargate Service ──────────────────────────────────────────────────────
    const service = new ecs.FargateService(this, 'PortfolioService', {
      cluster,
      taskDefinition: taskDef,
      desiredCount:   1,
      serviceName:    'portfolio-service',
      assignPublicIp: false,
      circuitBreaker: { rollback: true },
      deploymentController: { type: ecs.DeploymentControllerType.ECS },
    })

    // Auto-scaling
    const scaling = service.autoScaleTaskCount({ minCapacity: 1, maxCapacity: 3 })
    scaling.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 70,
      scaleInCooldown:          cdk.Duration.seconds(60),
      scaleOutCooldown:         cdk.Duration.seconds(60),
    })

    listener.addTargets('PortfolioTargets', {
      port:     3000,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targets:  [service],
      healthCheck: {
        path:                '/',
        healthyHttpCodes:    '200',
        interval:            cdk.Duration.seconds(30),
        timeout:             cdk.Duration.seconds(5),
        healthyThresholdCount:   2,
        unhealthyThresholdCount: 3,
      },
      deregistrationDelay: cdk.Duration.seconds(30),
    })

    // ─── CloudFront ───────────────────────────────────────────────────────────
    const distribution = new cloudfront.Distribution(this, 'PortfolioCDN', {
      comment:           'Portfolio CloudFront distribution',
      defaultBehavior: {
        origin: new origins.LoadBalancerV2Origin(alb, {
          protocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
          httpPort:       80,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy:          cloudfront.CachePolicy.CACHING_DISABLED,
        allowedMethods:       cloudfront.AllowedMethods.ALLOW_ALL,
        cachedMethods:        cloudfront.CachedMethods.CACHE_GET_HEAD,
        originRequestPolicy:  cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
      },
      additionalBehaviors: {
        // Cache static assets aggressively
        '/_next/static/*': {
          origin: new origins.LoadBalancerV2Origin(alb, {
            protocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
          }),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy:          cloudfront.CachePolicy.CACHING_OPTIMIZED,
        },
      },
      priceClass:  cloudfront.PriceClass.PRICE_CLASS_100,
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
    })

    // ─── Outputs ──────────────────────────────────────────────────────────────
    new cdk.CfnOutput(this, 'ECRRepository', {
      value:       repository.repositoryUri,
      description: 'ECR repository URI',
      exportName:  'PortfolioECRUri',
    })

    new cdk.CfnOutput(this, 'CloudFrontURL', {
      value:       `https://${distribution.distributionDomainName}`,
      description: 'CloudFront distribution URL (your portfolio URL)',
      exportName:  'PortfolioURL',
    })

    new cdk.CfnOutput(this, 'ALBDnsName', {
      value:       alb.loadBalancerDnsName,
      description: 'ALB DNS name',
    })

    new cdk.CfnOutput(this, 'SecretArn', {
      value:       openaiSecret.secretArn,
      description: 'ARN of the OpenAI API key secret — update this with your real key',
    })
  }
}
