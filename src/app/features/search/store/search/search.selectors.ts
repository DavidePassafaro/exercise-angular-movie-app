import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from './search.reducer';

export const SEARCH_KEY = 'search';

const getSearchState = createFeatureSelector<SearchState>(SEARCH_KEY);

export const getSearchLoading = createSelector(
  getSearchState,
  ({ loading }: SearchState) => loading
);

export const getCurrentSearchInfo = createSelector(
  getSearchState,
  ({ searchTitle, searchType }: SearchState) => ({ searchTitle, searchType })
);

export const getSearchResults = createSelector(
  getSearchState,
  ({ results }: SearchState) => results
);

export const getSearchCurrentPage = createSelector(
  getSearchState,
  ({ currentPage }: SearchState) => currentPage
);

export const getSearchTotalPagesQuantity = createSelector(
  getSearchState,
  ({ totalResults }: SearchState) =>
    Math.floor(totalResults / 10) + (totalResults % 10 === 0 ? 0 : 1)
);

export const getSearchError = createSelector(
  getSearchState,
  ({ error }: SearchState) => error
);
