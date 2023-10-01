import { TestBed } from '@angular/core/testing';
import { DetailService } from './detail.service';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('DetailService', () => {
  let service: DetailService;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DetailService],
    });

    service = TestBed.inject(DetailService);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // Verifies that no requests are outstanding.
  afterEach(() => httpTestingController.verify());

  it('should be created', () => expect(service).toBeTruthy());

  it('should be call method get of HttpClient', () => {
    const spyHttpGet: jest.SpyInstance = jest.spyOn(http, 'get');
    const testId: string = 'test-id';

    const getRequest = service.getMovieDetail(testId);

    expect(spyHttpGet).toHaveBeenCalledTimes(1);
    expect(spyHttpGet).toHaveBeenCalledWith(expect.any(String));

    getRequest.subscribe();

    httpTestingController.expectOne({ method: 'GET' });
  });
});
