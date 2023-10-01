import { DetailActions } from './detail.actions';
import {
  getDetailLoading,
  getDetailMovieId,
  getDetailMovieDetail,
  getDetailError,
} from './detail.selectors';

export { DetailReducer } from './detail.reducer';
export const DetailStore = {
  ...DetailActions,
  getDetailLoading,
  getDetailMovieId,
  getDetailMovieDetail,
  getDetailError,
};
