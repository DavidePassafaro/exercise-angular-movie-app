import { TestBed } from '@angular/core/testing';
import { SearchPageComponent } from './search-page.component';
import { Store, StoreModule } from '@ngrx/store';
import { SearchStore } from '../../store/search';
import { ResultsGroup } from '../../models/results-group.interface';
import { Movie } from '../../models/movie.interface';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchPageComponent, StoreModule.forRoot()],
    });

    const fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  it('should create the component', () => expect(component).toBeTruthy());

  describe('should test resultsGroupTrackBy method', () => {
    it('should return ResultsGroup year', () => {
      const result: ResultsGroup = { year: 2023, results: [] };
      const response: number = component.resultsGroupTrackBy(0, result);
      expect(response).toBe(result.year);
    });
  });

  describe('should test moviesGroupTrackBy method', () => {
    it('should return Movie imdbID', () => {
      const result: Movie = { imdbID: 'test-id' } as Movie;
      const response: string = component.moviesGroupTrackBy(0, result);
      expect(response).toBe(result.imdbID);
    });
  });

  describe('should test search method', () => {
    it('should dispatch SearchStore.startResearch', () => {
      const searchParameters = { title: 'testTitle', type: 'testType' };
      const storeSpy: jest.SpyInstance = jest.spyOn(store, 'dispatch');

      component.search(searchParameters);

      expect(storeSpy).toBeCalledWith({
        type: SearchStore.startResearch.type,
        title: searchParameters.title,
        movieType: searchParameters.type,
      });
    });
  });

  describe('should test search method', () => {
    it('should dispatch SearchStore.startResearch', () => {
      const expectedValue = { pageIndex: 1 };
      const storeSpy: jest.SpyInstance = jest.spyOn(store, 'dispatch');

      component.changePage(1);

      expect(storeSpy).toBeCalledWith({
        type: SearchStore.changePage.type,
        ...expectedValue,
      });
    });
  });
});
