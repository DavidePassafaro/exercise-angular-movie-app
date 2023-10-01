import { ResultsGroup } from '../../models/results-group.interface';
import { SearchState } from './search.reducer';
import {
  getCurrentSearchInfo,
  getSearchCurrentPage,
  getSearchError,
  getSearchLoading,
  getSearchResults,
  getSearchTotalPagesQuantity,
} from './search.selectors';

const MOCK_STATE: SearchState = {
  loading: true,
  searchTitle: 'test-search-title',
  searchType: 'test-search-type',
  results: [{ year: 2023, results: [] }],
  currentPage: 1,
  totalResults: 10,
  error: 'test-error',
};

describe('Search Selectors', () => {
  it("getSearchLoading() should return the current 'loading' value", () => {
    const result: boolean = getSearchLoading.projector(MOCK_STATE);
    expect(result).toBe(MOCK_STATE.loading);
  });

  it("getCurrentSearchInfo() should return the current 'searchTitle' and 'searchType' values", () => {
    const result = getCurrentSearchInfo.projector(MOCK_STATE);
    expect(result).toStrictEqual({
      searchTitle: MOCK_STATE.searchTitle,
      searchType: MOCK_STATE.searchType,
    });
  });

  it("getSearchResults() should return the current 'results' value", () => {
    const result: ResultsGroup[] = getSearchResults.projector(MOCK_STATE);
    expect(result).toBe(MOCK_STATE.results);
  });

  it("getSearchCurrentPage() should return the current 'currentPage' value", () => {
    const result: number = getSearchCurrentPage.projector(MOCK_STATE);
    expect(result).toBe(MOCK_STATE.currentPage);
  });

  describe('getSearchTotalPagesQuantity() should return the number of results pages available', () => {
    it('should return 1', () => {
      const result: number = getSearchTotalPagesQuantity.projector(MOCK_STATE);
      expect(result).toBe(1);
    });

    it('should return 1', () => {
      const state: SearchState = { ...MOCK_STATE, totalResults: 15 };
      const result: number = getSearchTotalPagesQuantity.projector(state);
      expect(result).toBe(2);
    });
  });

  it("getSearchError() should return the current 'error' value", () => {
    const result: string = getSearchError.projector(MOCK_STATE) as string;
    expect(result).toBe(MOCK_STATE.error);
  });
});
