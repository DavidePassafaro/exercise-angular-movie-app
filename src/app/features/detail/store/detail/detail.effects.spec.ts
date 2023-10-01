import { TestBed } from '@angular/core/testing';
import { DetailEffects } from './detail.effects';
import { Title } from '@angular/platform-browser';
import { DetailActions } from './detail.actions';
import { MovieDetail } from '../../models/movie-detail.interface';
import { Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';
import {
  DetailService,
  MovieDetailResult,
} from '../../services/detail/detail.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppPaths } from '@ma-shared';

describe('DetailEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: DetailEffects;
  let service: DetailService;
  let titleService: Title;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DetailService,
        DetailEffects,
        provideMockActions(() => actions$),
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot(),
      ],
    });

    effects = TestBed.inject(DetailEffects);
    service = TestBed.inject(DetailService);
    titleService = TestBed.inject(Title);
    router = TestBed.inject(Router);
  });

  describe('getDetail$', () => {
    it('should dispatch DetailActions.detailLoadSuccess', (done) => {
      const mockDetail: MovieDetail = { Title: 'testTitle' } as MovieDetail;
      const titleSpy: jest.SpyInstance = jest.spyOn(titleService, 'setTitle');
      jest
        .spyOn(service, 'getMovieDetail')
        .mockReturnValueOnce(of(mockDetail as MovieDetailResult));

      actions$ = of({ type: DetailActions.detailOpen.type, id: 'test-id' });

      effects.getDetail$.subscribe((action) => {
        expect(titleSpy).toHaveBeenCalled();

        const actionType: string = DetailActions.detailLoadSuccess.type;
        expect(action).toEqual({ type: actionType, detail: mockDetail });

        done();
      });
    });

    it('should dispatch DetailActions.detailLoadFail', (done) => {
      const mockDetail = { error: 'test-error' } as MovieDetailResult;
      const titleSpy: jest.SpyInstance = jest.spyOn(titleService, 'setTitle');
      jest.spyOn(service, 'getMovieDetail').mockReturnValueOnce(of(mockDetail));

      actions$ = of({ type: DetailActions.detailOpen.type, id: 'test-id' });

      effects.getDetail$.subscribe((action) => {
        expect(titleSpy).not.toHaveBeenCalled();

        const actionType: string = DetailActions.detailLoadFail.type;
        expect(action).toEqual({
          type: actionType,
          error: new Error(mockDetail.error),
        });

        done();
      });
    });
  });

  describe('detailLoadFail$', () => {
    it('should navigate to AppPaths.TechnicalError page', (done) => {
      const routerSpy: jest.SpyInstance = jest.spyOn(router, 'navigateByUrl');

      actions$ = of({ type: DetailActions.detailLoadFail.type });

      effects.detailLoadFail$.subscribe(() => {
        expect(routerSpy).toHaveBeenCalledWith(AppPaths.TechnicalError);
        done();
      });
    });
  });
});
