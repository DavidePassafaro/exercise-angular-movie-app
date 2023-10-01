import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { SpinnerActions } from './spinner.actions';

export interface SpinnerState {
  loading: boolean;
}

export const initialState: SpinnerState = {
  loading: false,
};

export const SpinnerReducer: ActionReducer<SpinnerState, Action> =
  createReducer(
    initialState,
    on(SpinnerActions.start, () => ({ loading: true })),
    on(SpinnerActions.stop, () => ({ loading: false }))
  );
