import { Action } from '@ngrx/store';
import { SpinnerActions } from './spinner.actions';
import { SpinnerReducer, SpinnerState, initialState } from './spinner.reducer';

describe('SpinnerReducer', () => {
  it('SpinnerActions.start should set loading true', () => {
    const action: Action = SpinnerActions.start();
    const result: SpinnerState = SpinnerReducer(initialState, action);
    expect(result.loading).toBe(true);
  });

  it('SpinnerActions.stop should set loading false', () => {
    const action: Action = SpinnerActions.stop();
    const result: SpinnerState = SpinnerReducer(initialState, action);
    expect(result.loading).toBe(false);
  });
});
