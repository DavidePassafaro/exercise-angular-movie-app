import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { EventEmitter } from '@angular/core';

describe('NavigationComponent', () => {
  let component: NavigationComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [NavigationComponent] });
    const fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => expect(component).toBeTruthy());

  describe('should test forwardClickHandler method', () => {
    it('should emit forwardClick event', () => {
      const event: EventEmitter<void> = component['forwardClick'];
      const spy: jest.SpyInstance = jest.spyOn(event, 'emit');
      component.forwardClickHandler();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('should test backClickHandler method', () => {
    it('should emit backClick event', () => {
      const event: EventEmitter<void> = component['backClick'];
      const spy: jest.SpyInstance = jest.spyOn(event, 'emit');
      component.backClickHandler();
      expect(spy).toBeCalledTimes(1);
    });
  });
});
