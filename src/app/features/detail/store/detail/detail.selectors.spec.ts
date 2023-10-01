import { MovieDetail } from '../../models/movie-detail.interface';
import { DetailState, initialState } from './detail.reducer';
import {
  getDetailError,
  getDetailLoading,
  getDetailMovieDetail,
  getDetailMovieId,
} from './detail.selectors';

const MOCK_STATE: DetailState = {
  loading: true,
  movieId: 'test-id',
  detail: { Title: 'testTitle' } as MovieDetail,
  error: 'test-error',
};

describe('Detail Selectors', () => {
  it("getDetailLoading() should return the current 'loading' value", () => {
    const result: boolean = getDetailLoading.projector(MOCK_STATE);
    expect(result).toBe(MOCK_STATE.loading);
  });

  it("getDetailMovieId() should return the current 'movieId' value", () => {
    const result: string = getDetailMovieId.projector(MOCK_STATE);
    expect(result).toBe(MOCK_STATE.movieId);
  });

  it("getDetailMovieDetail() should return the current 'detail' value", () => {
    const result: MovieDetail = getDetailMovieDetail.projector(MOCK_STATE);
    expect(result).toBe(MOCK_STATE.detail);
  });

  it("getDetailError() should return the current 'error' value", () => {
    const result: string = getDetailError.projector(MOCK_STATE) as string;
    expect(result).toBe(MOCK_STATE.error);
  });
});
