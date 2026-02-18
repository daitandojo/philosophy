const memoryCache = new Map<string, { data: unknown; expiry: number }>();

export function cacheGet(key: string): unknown | null {
  const item = memoryCache.get(key);
  
  if (!item) return null;
  
  if (Date.now() > item.expiry) {
    memoryCache.delete(key);
    return null;
  }
  
  return item.data;
}

export function cacheSet(key: string, value: unknown, ttlSeconds = 3600): void {
  memoryCache.set(key, {
    data: value,
    expiry: Date.now() + ttlSeconds * 1000,
  });
}

export function cacheDelete(key: string): void {
  memoryCache.delete(key);
}

export function cacheClear(): void {
  memoryCache.clear();
}

export function cacheGetMultiple(keys: string[]): Record<string, unknown | null> {
  const result: Record<string, unknown | null> = {};
  
  for (const key of keys) {
    result[key] = cacheGet(key);
  }
  
  return result;
}

export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds = 3600
): Promise<T> {
  const cached = cacheGet(key);
  
  if (cached !== null) {
    return cached as T;
  }
  
  const data = await fetcher();
  cacheSet(key, data, ttlSeconds);
  
  return data;
}
