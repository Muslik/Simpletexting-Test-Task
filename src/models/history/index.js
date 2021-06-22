import { history } from 'shared/constants/history';
import { createEffect, createEvent, createStore } from 'effector-root';

export const locationUpdated = createEvent();

export const $location = createStore(history.location);
export const $pathname = $location.map(({ pathname }) => pathname);
export const $search = $location.map(({ search }) => search);

export const pushHistoryFx = createEffect();

history.listen(location => {
  locationUpdated(location);
});
