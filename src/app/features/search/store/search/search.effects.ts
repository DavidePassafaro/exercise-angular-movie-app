import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, take } from 'rxjs/operators';
import { SearchService } from '../../services/search/search.service';
import { SpinnerStore } from '@ma-core';
import { SearchActions } from './search.actions';
import { getCurrentSearchInfo } from './search.selectors';
import { Router } from '@angular/router';

@Injectable()
export class SearchEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly searchService = inject(SearchService);
  private readonly router = inject(Router);

  public startResearch$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.startResearch),
      tap(() => this.store.dispatch(SpinnerStore.start())),
      switchMap(({ title, movieType }) =>
        this.searchService.searchMovie(title, movieType).pipe(
          map(({ Search, totalResults, Response, error }) => {
            const isNoMovieFoundError: boolean =
              !Response && error === 'Movie not found!';

            return Response || isNoMovieFoundError
              ? SearchActions.researchSuccess({
                  results: Search || [],
                  totalResults: +totalResults || 0,
                  currentPage: 0,
                })
              : SearchActions.researchFail({ error });
          }),
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
          map(({ Search, totalResults, Response, error }) =>
            Response
              ? SearchActions.researchSuccess({
                  results: Search,
                  totalResults: +totalResults,
                  currentPage: pageIndex,
                })
              : SearchActions.researchFail({ error })
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
        tap(() => {
          this.router.navigateByUrl('technical-error');
        })
      ),
    { dispatch: false }
  );
}
