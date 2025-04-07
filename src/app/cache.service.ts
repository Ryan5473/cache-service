import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, { value: any, timestamp: number }>();
  private cacheTTL = 1000 * 30;  // Cache TTL set to 5 minutes (in milliseconds)

  constructor() {}

  get(url: string, params: any = {}, body: any = {}): Observable<any> | null {
    const key = this.generateCacheKey(url, params, body);

    // Check if the cache has the data and it's not expired
    if (this.cache.has(key)) {
      const cachedData = this.cache.get(key);
      
      // If cache is not expired, return it
      if (cachedData && (Date.now() - cachedData.timestamp < this.cacheTTL)) {
        return of(cachedData.value);
      } else {
        // If expired, remove the cache and return null
        this.cache.delete(key);
      }
    }
    return null;  // No valid cache found
  }

  set(url: string, params: any = {}, body: any = {}, value: any): void {
    const key = this.generateCacheKey(url, params, body);
    // Store the cache with a timestamp
    this.cache.set(key, { value, timestamp: Date.now() });
  }

  private generateCacheKey(url: string, params: any, body: any): string {
    return `${url}|${JSON.stringify(params)}|${JSON.stringify(body)}`;
  }
}
