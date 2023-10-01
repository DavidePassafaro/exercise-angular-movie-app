import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Movie } from '@ma-shared';
import { Observable, tap } from 'rxjs';

const API_KEY: string = '8ea39b15';

export interface SearchResult {
  Response: boolean;
  Search?: Movie[];
  totalResults?: string; // string representation of a number
  error?: string;
}

@Injectable()
export class SearchService {
  private readonly http: HttpClient = inject(HttpClient);

  public searchMovie(
    title: string,
    type?: string,
    pageIndex?: number
  ): Observable<SearchResult> {
    let url: string = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`;
    if (type) url += `&type=${type}`;
    if (pageIndex) url += `&page=${pageIndex}`;
    return this.http.get<SearchResult>(url).pipe(tap(console.log));
  }
}
