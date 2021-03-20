import cache from 'memory-cache';

// * need to take care of max-size of cache
class MemCache {
  duration: number;
  cache: cache.CacheClass<unknown, unknown>;
  constructor() {
    this.cache = new cache.Cache();
    this.duration = 60;
  }

  set(key: unknown, data: unknown) {
    this.cache.put(key, data, this.duration * 1000);
  }

  get(key: unknown, callback: Function) {
    const data = this.cache.get(key);
    if (data) {
      callback(data);
    } else {
      callback(null);
    }
  }

  del(keys: unknown) {
    this.cache.del(keys);
  }

  flush() {
    this.cache.clear();
  }
}

export const memCache = new MemCache();
