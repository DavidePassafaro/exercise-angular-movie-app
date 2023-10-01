import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { SpinnerStore } from '@ma-core';
import { DetailActions } from './detail.actions';
import { Router } from '@angular/router';
import {
  DetailService,
  MovieDetailResult,
} from '../../services/detail/detail.service';
import { MovieDetail } from '../../models/movie-detail.interface';

@Injectable()
export class DetailEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly detailService = inject(DetailService);
  private readonly router = inject(Router);

  public getDetail$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(DetailActions.detailOpen),
      tap(() => this.store.dispatch(SpinnerStore.start())),
      switchMap(({ id }) =>
        this.detailService.getMovieDetail(id).pipe(
          map((result: MovieDetailResult) => {
            return !result.error
              ? DetailActions.detailLoadSuccess({
                  detail: result as MovieDetail,
                })
              : DetailActions.detailLoadFail({ error: result.error });
          }),
          catchError((error) => of(DetailActions.detailLoadFail({ error })))
        )
      ),
      tap(() => this.store.dispatch(SpinnerStore.stop()))
    )
  );

  public detailLoadFail$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DetailActions.detailLoadFail),
        tap(() => this.router.navigateByUrl('technical-error'))
      ),
    { dispatch: false }
  );
}
