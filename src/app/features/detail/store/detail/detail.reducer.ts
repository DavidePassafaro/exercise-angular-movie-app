import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { DetailActions } from './detail.actions';
import { MovieDetail } from '../../models/movie-detail.interface';

export interface DetailState {
  loading: boolean;
  movieId?: string;
  detail?: MovieDetail;
  error?: Error | string;
}

export const initialState: DetailState = {
  loading: false,
};

export const DetailReducer: ActionReducer<DetailState, Action> = createReducer(
  initialState,
  on(DetailActions.detailOpen, (state: DetailState, { id }) => ({
    ...state,
    loading: true,
    movieId: id,
    error: null,
  })),
  on(DetailActions.detailLoadSuccess, (state: DetailState, { detail }) => ({
    ...state,
    loading: false,
    detail,
    error: null,
  })),
  on(DetailActions.detailLoadFail, (state: DetailState, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(DetailActions.reset, () => ({ ...initialState }))
);
