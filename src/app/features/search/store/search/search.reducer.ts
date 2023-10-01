import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { SearchActions } from './search.actions';
import { Movie } from '../../models/movie.interface';

export interface SearchState {
  loading: boolean;
  searchTitle?: string;
  searchType?: string;
  results?: Movie[];
  currentPage?: number;
  totalResults?: number;
  error?: Error | string;
}

export const initialState: SearchState = {
  loading: false,
};

export const SearchReducer: ActionReducer<SearchState, Action> = createReducer(
  initialState,
  on(
    SearchActions.startResearch,
    (state: SearchState, { title, movieType }) => ({
      ...state,
      loading: true,
      searchTitle: title,
      searchType: movieType,
      error: null,
    })
  ),
  on(SearchActions.changePage, (state: SearchState) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    SearchActions.researchSuccess,
    (state: SearchState, { results, totalResults, currentPage }) => ({
      ...state,
      loading: false,
      results,
      totalResults,
      currentPage,
      error: null,
    })
  ),
  on(SearchActions.researchFail, (state: SearchState, { error }) => ({
    ...state,
    loading: false,
    searchTitle: null,
    searchType: null,
    error: error,
  })),
  on(SearchActions.reset, () => ({ ...initialState }))
);
