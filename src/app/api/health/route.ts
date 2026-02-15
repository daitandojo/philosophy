import { NextResponse } from 'next/server';
import { runHealthChecks, validateEnvironment } from '@/lib/health';

export async function GET() {
  const [envResult, healthResult] = await Promise.all([
    validateEnvironment(),
    runHealthChecks(),
  ]);

  return NextResponse.json({
    environment: envResult,
    health: healthResult,
    overall: envResult.valid && healthResult.overall,
  });
}
