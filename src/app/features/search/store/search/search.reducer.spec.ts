import { Action } from '@ngrx/store';
import { SearchActions } from './search.actions';
import { SearchReducer, SearchState, initialState } from './search.reducer';
import { ResultsGroup } from '../../models/results-group.interface';

describe('SearchReducer', () => {
  it('SearchActions.startResearch should set searchTitle and searchType', () => {
    const title: string = 'test-title';
    const movieType: string = 'test-movie-type';
    const action: Action = SearchActions.startResearch({ title, movieType });
    const result: SearchState = SearchReducer(initialState, action);

    expect(result.loading).toBe(true);
    expect(result.searchTitle).toBe(title);
    expect(result.searchType).toBe(movieType);
    expect(result.error).toBeNull();
  });

  it('SearchActions.changePage should set loading to true', () => {
    const action: Action = SearchActions.changePage({ pageIndex: 1 });
    const result: SearchState = SearchReducer(initialState, action);

    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('SearchActions.researchSuccess should set results', () => {
    const results: ResultsGroup[] = [{ year: 2023, results: [] }];
    const totalResults: number = 10;
    const currentPage: number = 1;

    const searchResults = { results, totalResults, currentPage };
    const action: Action = SearchActions.researchSuccess(searchResults);
    const result: SearchState = SearchReducer(initialState, action);

    expect(result.loading).toBe(false);
    expect(result.results).toBe(results);
    expect(result.totalResults).toBe(totalResults);
    expect(result.currentPage).toBe(currentPage);
    expect(result.error).toBeNull();
  });

  it('SearchActions.researchFail should set error', () => {
    const testError: string = 'test-error';
    const action: Action = SearchActions.researchFail({ error: testError });
    const result: SearchState = SearchReducer(initialState, action);

    expect(result.loading).toBe(false);
    expect(result.searchTitle).toBeNull();
    expect(result.searchType).toBeNull();
    expect(result.error).toBe(testError);
  });

  it('SearchActions.reset should set initialState', () => {
    const action: Action = SearchActions.reset();
    const result: SearchState = SearchReducer(initialState, action);

    expect(result).toStrictEqual(initialState);
  });
});
