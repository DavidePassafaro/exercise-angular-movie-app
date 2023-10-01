import { TestBed } from '@angular/core/testing';
import { SearchBarComponent, SearchCategory } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [SearchBarComponent] });
    const fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => expect(component).toBeTruthy());

  describe('should test ngOnInit method', () => {
    it('should set formGroup', () => {
      component.categories = [{ id: '' } as SearchCategory];
      component.ngOnInit();
      expect(component['formGroup']).toBeDefined();
    });
  });

  describe('should test switchDropdownMenu method', () => {
    it('should switch isDropdownOpen flag', () => {
      const expectedValue: boolean = !component['isDropdownOpen'];
      component.switchDropdownMenu();
      expect(component['isDropdownOpen']).toBe(expectedValue);
    });
  });

  describe('should test selectCategory method', () => {
    it('should set selectedCategory as set isDropdownOpen flag to false', () => {
      component.selectCategory(0);
      expect(component['selectedCategory']).toBe(0);
      expect(component['isDropdownOpen']).toBe(false);
    });
  });

  describe('should test formSubmit method', () => {
    it('should emit formGroupValue', () => {
      const expectedValue = { title: 'testTitle', type: 'testType' };
      jest
        .spyOn(component['formGroup'], 'getRawValue')
        .mockReturnValue(expectedValue);
      const emitSpy: jest.SpyInstance = jest.spyOn(component['search'], 'emit');
      component.formSubmit();
      expect(emitSpy).toBeCalledWith(expectedValue);
    });
  });
});
