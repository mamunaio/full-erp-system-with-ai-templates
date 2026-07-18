class CacheService {
  private cache = new Map<string, { value: any; expiry: number }>();

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    return item.value as T;
  }

  async set(key: string, value: any, ttlSeconds: number = 300): Promise<void> {
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttlSeconds * 1000,
    });
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async delPattern(pattern: string): Promise<void> {
    const regex = new RegExp(pattern.replace(/\*/g, ".*"));
    const keysToDelete: string[] = [];
    this.cache.forEach((_value, key) => {
      if (regex.test(key)) {
        keysToDelete.push(key);
      }
    });
    for (const key of keysToDelete) {
      this.cache.delete(key);
    }
  }
}

export const cacheService = new CacheService();
