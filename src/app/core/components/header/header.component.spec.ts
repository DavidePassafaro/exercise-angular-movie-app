import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HeaderComponent] });
    const fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => expect(component).toBeTruthy());

  describe('should test mobileMenuSwitch method', () => {
    it('should switch isMobileMenuOpen flag', () => {
      const expectedValue: boolean = !component['isMobileMenuOpen'];
      component.mobileMenuSwitch();
      expect(component['isMobileMenuOpen']).toBe(expectedValue);
    });
  });
});
