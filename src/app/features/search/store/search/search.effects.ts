import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, combineLatest, fromEvent, of } from 'rxjs';
import { catchError, map, switchMap, tap, take } from 'rxjs/operators';
import { SearchService } from '../../services/search/search.service';
import { SpinnerStore } from '@ma-core';
import { SearchActions } from './search.actions';
import { getCurrentSearchInfo } from './search.selectors';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { sortMoviesByYear } from './search.utilities';
import { ResultsGroup } from '../../models/results-group.interface';
import { Movie } from '../../models/movie.interface';
import { AppPaths } from '@ma-shared';

const NO_MOVIES_FOUND_CODE = 'Movie not found!';

@Injectable()
export class SearchEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly searchService = inject(SearchService);
  private readonly router = inject(Router);
  private readonly title = inject(Title);

  public startResearch$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.startResearch),
      tap(() => this.store.dispatch(SpinnerStore.start())),
      switchMap(({ title, movieType }) =>
        this.searchService.searchMovie(title, movieType).pipe(
          switchMap(({ Search, totalResults, Error }) =>
            this.handleResults(Search, +totalResults, Error, title)
          ),
          map(({ results, totalResults }) =>
            SearchActions.researchSuccess({
              results,
              totalResults,
              currentPage: 1,
            })
          ),
          catchError((error) => of(SearchActions.researchFail({ error })))
        )
      ),
      tap(() => this.store.dispatch(SpinnerStore.stop()))
    )
  );

  public changePage$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.changePage),
      tap(() => this.store.dispatch(SpinnerStore.start())),
      switchMap(({ pageIndex }) =>
        this.store.select(getCurrentSearchInfo).pipe(
          take(1),
          switchMap(({ searchTitle, searchType }) =>
            this.searchService.searchMovie(searchTitle, searchType, pageIndex)
          ),
          switchMap(({ Search, totalResults, Error }) =>
            this.handleResults(Search, +totalResults, Error)
          ),
          map(({ results, totalResults }) =>
            SearchActions.researchSuccess({
              results,
              totalResults,
              currentPage: pageIndex,
            })
          ),
          catchError((error) => of(SearchActions.researchFail({ error })))
        )
      ),
      tap(() => this.store.dispatch(SpinnerStore.stop()))
    )
  );

  public researchFail$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SearchActions.researchFail),
        tap(() => this.router.navigateByUrl(AppPaths.TechnicalError))
      ),
    { dispatch: false }
  );

  /**
   * Return an Observable that perform movies grouping by years.
   * If browser supports WebWorkers technology this is used,
   * otherwise the grouping function is performed in the current scope.
   *
   * @param searchResults movie list retrieved from the search api
   * @param totalResults total results available on the DB for the current search
   * @param error error object retrieved from the search api
   * @param title page title to set with Title service
   * @returns Observable parameters needed to trigger success action
   */
  private handleResults(
    searchResults: Movie[],
    totalResults: number,
    error: any,
    title?: string
  ): Observable<{
    results: ResultsGroup[];
    totalResults: number;
  }> {
    if (error) {
      if (error !== NO_MOVIES_FOUND_CODE) throw new Error(error);
      else {
        this.title.setTitle('Movie App - No movies found for ' + title);
        return of({ results: [], totalResults: 0 });
      }
    }

    if (title) this.title.setTitle('Movie App - Search results for ' + title);

    // Web workers are supported in this environment.
    if (typeof Worker !== 'undefined') {
      const worker: Worker = new Worker(
        new URL('./sort-movies-by-year.worker', import.meta.url)
      );

      return combineLatest([
        fromEvent(worker, 'message'),
        of(+totalResults).pipe(tap(() => worker.postMessage(searchResults))),
      ]).pipe(
        tap(() => worker.terminate()),
        map(([{ data: results }, totalResults]: [any, number]) => ({
          results,
          totalResults,
        }))
      );
    }

    // Web workers are not supported in this environment.
    return of({ results: sortMoviesByYear(searchResults), totalResults });
  }
}
