import { createActionGroup, emptyProps } from '@ngrx/store';

export const SpinnerActions = createActionGroup({
  source: 'Spinner',
  events: {
    start: emptyProps(),
    stop: emptyProps(),
  },
});
