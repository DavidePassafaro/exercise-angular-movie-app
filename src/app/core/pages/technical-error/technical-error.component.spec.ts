import { TestBed } from '@angular/core/testing';
import { TechnicalErrorComponent } from './technical-error.component';

describe('TechnicalErrorComponent', () => {
  let component: TechnicalErrorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TechnicalErrorComponent] });
    const fixture = TestBed.createComponent(TechnicalErrorComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => expect(component).toBeTruthy());
});
