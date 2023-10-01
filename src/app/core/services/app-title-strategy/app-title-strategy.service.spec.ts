import { TestBed } from '@angular/core/testing';
import { AppTitleStrategy } from './app-title-strategy.service';
import { RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';

describe('AppTitleStrategy', () => {
  let service: AppTitleStrategy;
  let title: Title;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AppTitleStrategy] });
    service = TestBed.inject(AppTitleStrategy);
    title = TestBed.inject(Title);
  });

  it('should be created', () => expect(service).toBeTruthy());

  describe('should test updateTitle method', () => {
    it('should return the proper app title', () => {
      const routerStateMock: RouterStateSnapshot = {
        test: 'title',
      } as unknown as RouterStateSnapshot;

      const buildTitleSpy: jest.SpyInstance = jest
        .spyOn(service, 'buildTitle')
        .mockImplementationOnce(() => 'Test title');

      const setTitleSpy: jest.SpyInstance = jest.spyOn(title, 'setTitle');
      service.updateTitle(routerStateMock);

      expect(buildTitleSpy).toHaveBeenCalledWith(routerStateMock);
      expect(setTitleSpy).toHaveBeenCalledWith('Movie App - Test title');
    });
  });
});
