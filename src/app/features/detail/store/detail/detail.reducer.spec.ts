import { Action } from '@ngrx/store';
import { DetailActions } from './detail.actions';
import { DetailReducer, DetailState, initialState } from './detail.reducer';
import { MovieDetail } from '../../models/movie-detail.interface';

describe('DetailReducer', () => {
  it('DetailActions.detailOpen should set movieId', () => {
    const testId: string = 'test-id';
    const action: Action = DetailActions.detailOpen({ id: testId });
    const result: DetailState = DetailReducer(initialState, action);

    expect(result.loading).toBe(true);
    expect(result.movieId).toBe(testId);
    expect(result.error).toBeNull();
  });

  it('DetailActions.detailLoadSuccess should set detail', () => {
    const detail: MovieDetail = { Title: 'testTitle' } as MovieDetail;
    const action: Action = DetailActions.detailLoadSuccess({ detail });
    const result: DetailState = DetailReducer(initialState, action);

    expect(result.loading).toBe(false);
    expect(result.detail).toBe(detail);
    expect(result.error).toBeNull();
  });

  it('DetailActions.detailLoadFail should set error', () => {
    const testError: string = 'test-error';
    const action: Action = DetailActions.detailLoadFail({ error: testError });
    const result: DetailState = DetailReducer(initialState, action);

    expect(result.loading).toBe(false);
    expect(result.error).toBe(testError);
  });

  it('DetailActions.reset should set initialState', () => {
    const action: Action = DetailActions.reset();
    const result: DetailState = DetailReducer(initialState, action);

    expect(result).toStrictEqual(initialState);
  });
});
