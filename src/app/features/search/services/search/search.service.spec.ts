import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService],
    });

    service = TestBed.inject(SearchService);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // Verifies that no requests are outstanding.
  afterEach(() => httpTestingController.verify());

  it('should be created', () => expect(service).toBeTruthy());

  describe('should test searchMovie method', () => {
    it('should be call method get of HttpClient', () => {
      const spyHttpGet: jest.SpyInstance = jest.spyOn(http, 'get');
      const testId: string = 'test-id';

      const getRequest = service.searchMovie(testId);

      expect(spyHttpGet).toHaveBeenCalledTimes(1);
      expect(spyHttpGet).toHaveBeenCalledWith(expect.any(String));

      getRequest.subscribe();

      httpTestingController.expectOne({ method: 'GET' });
    });

    it('should be call method get of HttpClient with type parameter', () => {
      const spyHttpGet: jest.SpyInstance = jest.spyOn(http, 'get');
      const testId: string = 'test-id';

      const getRequest = service.searchMovie(testId, 'movie');

      expect(spyHttpGet).toHaveBeenCalledTimes(1);
      expect(spyHttpGet).toHaveBeenCalledWith(expect.any(String));

      getRequest.subscribe();

      const req = httpTestingController.expectOne({ method: 'GET' });
      expect(req.request.url.endsWith('&type=movie')).toBe(true);
    });

    it('should be call method get of HttpClient with page parameter', () => {
      const spyHttpGet: jest.SpyInstance = jest.spyOn(http, 'get');
      const testId: string = 'test-id';

      const getRequest = service.searchMovie(testId, null, 1);

      expect(spyHttpGet).toHaveBeenCalledTimes(1);
      expect(spyHttpGet).toHaveBeenCalledWith(expect.any(String));

      getRequest.subscribe();

      const req = httpTestingController.expectOne({ method: 'GET' });
      expect(req.request.url.endsWith('&page=1')).toBe(true);
    });
  });
});
