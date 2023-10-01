import { TestBed } from '@angular/core/testing';
import { Error404Component } from './error-404.component';

describe('Error404Component', () => {
  let component: Error404Component;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Error404Component] });
    const fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
  });

  it('should create the component', () => expect(component).toBeTruthy());
});
