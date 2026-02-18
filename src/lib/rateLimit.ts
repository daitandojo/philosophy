import { NextRequest, NextResponse } from 'next/server';

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const DEFAULT_LIMIT = 100;
const DEFAULT_WINDOW = 60 * 1000;

interface RateLimitConfig {
  limit?: number;
  window?: number;
}

export function rateLimit(
  key: string,
  config: RateLimitConfig = {}
): { success: boolean; remaining: number; resetTime: number } {
  const limit = config.limit || DEFAULT_LIMIT;
  const window = config.window || DEFAULT_WINDOW;

  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + window,
    });
    return {
      success: true,
      remaining: limit - 1,
      resetTime: now + window,
    };
  }

  if (record.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  record.count++;
  rateLimitStore.set(key, record);

  return {
    success: true,
    remaining: limit - record.count,
    resetTime: record.resetTime,
  };
}

export function withRateLimit(
  request: NextRequest,
  config?: RateLimitConfig
): NextResponse | null {
  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  const key = `ratelimit:${ip}`;
  
  const result = rateLimit(key, config);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000) },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(config?.limit || DEFAULT_LIMIT),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(result.resetTime),
          'Retry-After': String(Math.ceil((result.resetTime - Date.now()) / 1000)),
        },
      }
    );
  }

  return null;
}
