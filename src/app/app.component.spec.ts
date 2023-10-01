import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreModule, SpinnerStore } from '@ma-core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { delay, take } from 'rxjs';

describe('AppComponent', () => {
  let app: AppComponent;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CoreModule],
      providers: [provideMockStore()],
      declarations: [AppComponent],
    });

    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create the app', () => expect(app).toBeTruthy());

  describe('should test isSpinnerOn$', () => {
    it('should emit false value immediately', (done) => {
      store.overrideSelector(SpinnerStore.getSpinnerLoading, false);
      app.isSpinnerOn$.subscribe((value: boolean) => {
        expect(value).toBe(false);
        done();
      });
    });

    it('should emit true value after some delay', (done) => {
      store.overrideSelector(SpinnerStore.getSpinnerLoading, true);

      app.isSpinnerOn$.pipe(delay(500)).subscribe((value: boolean) => {
        expect(value).toBe(true);
        done();
      });
    });
  });
});
