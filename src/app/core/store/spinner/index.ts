import { SpinnerActions } from './spinner.actions';
import { getSpinnerLoading } from './spinner.selectors';

export { SpinnerReducer } from './spinner.reducer';
export const SpinnerStore = { ...SpinnerActions, getSpinnerLoading };
