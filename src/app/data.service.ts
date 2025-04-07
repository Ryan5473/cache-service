import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);

  constructor() {}

  getData(url: string, params: any = {}): Observable<any> {
    const cachedResponse = this.cacheService.get(url, params);
    if (cachedResponse) {
      return cachedResponse;
    } else {
      const httpParams = new HttpParams({ fromObject: params });
      return this.http.get(url, { params: httpParams }).pipe(
        tap(response => this.cacheService.set(url, params, {}, response))
      );
    }
  }

}

