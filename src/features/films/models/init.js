import { forward } from 'effector-root';

import { api } from 'api';

import { FILMS } from 'shared/constants/urls';

import {
  $selectedFilm,
  $films,
  fetchFilmFx,
  fetchFilmsFx,
  filmsGate,
  filmSelected,
  clearFilms,
} from '.';

fetchFilmsFx.use(() =>
  api({ url: FILMS, method: 'get' }).then(({ data }) => data.results)
);

$films.on(fetchFilmsFx.doneData, (_, data) => data).reset(clearFilms);

fetchFilmFx.use((url, onCancel) =>
  api({ url, method: 'get', onCancel }).then(({ data }) => data)
);

$selectedFilm.on(fetchFilmFx.doneData, (_, data) => data).reset(clearFilms, filmSelected);

forward({
  from: filmsGate.open,
  to: fetchFilmsFx,
});

forward({
  from: filmsGate.close,
  to: clearFilms,
});

forward({
  from: filmSelected,
  to: fetchFilmFx,
});
