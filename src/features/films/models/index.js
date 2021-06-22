import { root, createEvent, createEffect, createStore } from 'effector-root';
import { createReEffectFactory } from 'effector-reeffect';
import { createGate } from 'effector-react';

const createReEffect = createReEffectFactory(root.createEffect);

export const filmsGate = createGate();

export const $films = createStore([]);
export const $selectedFilm = createStore(null);

export const filmSelected = createEvent();
export const clearFilms = createEvent();

export const fetchFilmsFx = createEffect();
export const fetchFilmFx = createReEffect({ strategy: 'TAKE_LAST' });
