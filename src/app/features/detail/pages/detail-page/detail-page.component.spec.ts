import { TestBed } from '@angular/core/testing';
import { DetailPageComponent } from './detail-page.component';
import { StoreModule } from '@ngrx/store';

describe('DetailPageComponent', () => {
  let component: DetailPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DetailPageComponent, StoreModule.forRoot()],
    });
    const fixture = TestBed.createComponent(DetailPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => expect(component).toBeTruthy());
});
