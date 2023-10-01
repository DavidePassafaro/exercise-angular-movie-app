import { SearchActions } from './search.actions';
import {
  getSearchLoading,
  getSearchResults,
  getSearchCurrentPage,
  getSearchError,
} from './search.selectors';

export { SearchReducer } from './search.reducer';
export const SearchStore = {
  ...SearchActions,
  getSearchLoading,
  getSearchResults,
  getSearchCurrentPage,
  getSearchError,
};
