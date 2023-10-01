import { SpinnerState, initialState } from './spinner.reducer';
import { getSpinnerLoading } from './spinner.selectors';

describe('Spinner Selectors', () => {
  it("getSpinnerLoading() should return the current 'loading' value", () => {
    const state: SpinnerState = initialState;
    const result: boolean = getSpinnerLoading.projector(state);
    expect(result).toBe(false);
  });
});
