import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SpinnerState } from './spinner.reducer';

export const SPINNER_KEY = 'spinner';

const getSpinnerState = createFeatureSelector<SpinnerState>(SPINNER_KEY);

export const getSpinnerLoading = createSelector(
  getSpinnerState,
  ({ loading }: SpinnerState) => loading
);
