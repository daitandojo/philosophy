import connectDB, { checkMongoDBHealth } from './mongodb';
import { checkOpenAIHealth } from './services/openai';
import { checkPineconeHealth } from './services/pinecone';
import { checkB2Health } from './services/backblaze';

export interface HealthCheckResult {
  service: string;
  healthy: boolean;
  message: string;
  latency?: number;
}

export interface StartupHealthCheck {
  overall: boolean;
  timestamp: number;
  checks: HealthCheckResult[];
}

export async function runHealthChecks(): Promise<StartupHealthCheck> {
  const checks: HealthCheckResult[] = [];

  // Check MongoDB
  const mongoResult = await checkMongoDBHealth();
  checks.push({ service: 'MongoDB', ...mongoResult });

  // Check OpenAI
  const openaiResult = await checkOpenAIHealth();
  checks.push({ service: 'OpenAI', ...openaiResult });

  // Check Pinecone
  const pineconeResult = await checkPineconeHealth();
  checks.push({ service: 'Pinecone', ...pineconeResult });

  // Check Backblaze B2
  const b2Result = await checkB2Health();
  checks.push({ service: 'Backblaze B2', ...b2Result });

  const overall = checks.every(check => check.healthy);

  return {
    overall,
    timestamp: Date.now(),
    checks,
  };
}

export async function validateEnvironment(): Promise<{ valid: boolean; errors: string[] }> {
  const errors: string[] = [];
  
  const requiredVars = [
    'MONGO_URI',
    'NEXTAUTH_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
  ];

  const optionalVars = [
    'DEEPSEEK_API_KEY',
    'OPENAI_API_KEY',
    'ELEVENLABS_API_KEY',
    'B2_ACCESS_KEY_ID',
    'B2_SECRET_ACCESS_KEY',
    'PINECONE_API_KEY',
  ];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      errors.push(`Missing required environment variable: ${varName}`);
    }
  }

  for (const varName of optionalVars) {
    if (!process.env[varName]) {
      console.warn(`Optional environment variable not set: ${varName}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export async function initializeApp(): Promise<{ success: boolean; health: StartupHealthCheck; envErrors: string[] }> {
  console.log('🔍 Validating environment variables...');
  const envResult = await validateEnvironment();
  
  if (!envResult.valid) {
    console.error('❌ Environment validation failed:');
    envResult.errors.forEach(err => console.error(`  - ${err}`));
  } else {
    console.log('✅ Environment variables validated');
  }

  console.log('🔌 Connecting to MongoDB...');
  try {
    await connectDB();
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  }

  console.log('🏥 Running health checks...');
  const health = await runHealthChecks();
  
  console.log('\n📊 Health Check Results:');
  console.log('─'.repeat(50));
  
  for (const check of health.checks) {
    const status = check.healthy ? '✅' : '❌';
    const latency = check.latency ? ` (${check.latency}ms)` : '';
    console.log(`${status} ${check.service}: ${check.message}${latency}`);
  }
  
  console.log('─'.repeat(50));
  console.log(`Overall Status: ${health.overall ? '✅ HEALTHY' : '❌ ISSUES DETECTED'}\n`);

  return {
    success: envResult.valid && health.overall,
    health,
    envErrors: envResult.errors,
  };
}

export default initializeApp;
