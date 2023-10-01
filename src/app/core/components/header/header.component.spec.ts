import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterModule.forRoot([])],
    });
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

  describe('should test mobileMenuClose method', () => {
    it('should set isMobileMenuOpen flag to false', () => {
      component['isMobileMenuOpen'] = true;
      component.mobileMenuClose();
      expect(component['isMobileMenuOpen']).toBe(false);
    });
  });
});
