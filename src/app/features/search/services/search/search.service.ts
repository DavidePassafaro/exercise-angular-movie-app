import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseOmDbResponse, OMDB_API_KEY } from '@ma-shared';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.interface';

export interface SearchResult extends BaseOmDbResponse {
  Search?: Movie[];
  totalResults?: string; // string representation of a number
}

@Injectable()
export class SearchService {
  private readonly http: HttpClient = inject(HttpClient);

  public searchMovie(
    title: string,
    type?: string,
    pageIndex?: number
  ): Observable<SearchResult> {
    let url: string = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}`;
    if (type) url += `&type=${type}`;
    if (pageIndex) url += `&page=${pageIndex}`;
    return this.http.get<SearchResult>(url);
  }
}
