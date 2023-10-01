import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MovieDetail } from '../../models/movie-detail.interface';

export const DetailActions = createActionGroup({
  source: 'Detail',
  events: {
    detailOpen: props<{ id: string }>(),
    detailLoadSuccess: props<{ detail: MovieDetail }>(),
    detailLoadFail: props<{ error: Error | string }>(),
    reset: emptyProps(),
  },
});
