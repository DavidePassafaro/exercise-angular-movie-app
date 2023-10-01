import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseOmDbResponse, OMDB_API_KEY } from '@ma-shared';
import { Observable } from 'rxjs';
import { MovieDetail } from '../../models/movie-detail.interface';

export type MovieDetailResult = BaseOmDbResponse & Partial<MovieDetail>;

@Injectable()
export class DetailService {
  private readonly http: HttpClient = inject(HttpClient);

  public getMovieDetail(id: string): Observable<MovieDetailResult> {
    let url: string = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`;
    return this.http.get<MovieDetailResult>(url);
  }
}
