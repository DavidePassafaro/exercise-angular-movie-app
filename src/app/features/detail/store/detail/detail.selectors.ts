import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DetailState } from './detail.reducer';

export const DETAIL_KEY = 'detail';

const getDetailState = createFeatureSelector<DetailState>(DETAIL_KEY);

export const getDetailLoading = createSelector(
  getDetailState,
  ({ loading }: DetailState) => loading
);

export const getDetailMovieId = createSelector(
  getDetailState,
  ({ movieId }: DetailState) => movieId
);

export const getDetailMovieDetail = createSelector(
  getDetailState,
  ({ detail }: DetailState) => detail
);

export const getDetailError = createSelector(
  getDetailState,
  ({ error }: DetailState) => error
);
