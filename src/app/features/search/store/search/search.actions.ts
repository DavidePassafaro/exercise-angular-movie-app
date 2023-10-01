import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ResultsGroup } from '../../models/results-group.interface';

export const SearchActions = createActionGroup({
  source: 'Search',
  events: {
    startResearch: props<{ title: string; movieType?: string }>(),
    changePage: props<{ pageIndex: number }>(),
    researchSuccess: props<{
      results: ResultsGroup[];
      totalResults: number;
      currentPage: number;
    }>(),
    researchFail: props<{ error: Error | string }>(),
    reset: emptyProps(),
  },
});
