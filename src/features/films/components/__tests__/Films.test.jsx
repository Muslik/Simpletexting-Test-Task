import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchFilmFx, fetchFilmsFx } from 'features/films/models';

import 'features/films/models/init';

import { FilmsPage } from '../FilmsPage';

const FILMS = [{ title: 'charmed', url: 'fake1' }];
const FILM = {
  director: 'Pedro',
  producer: 'Hasan',
  release_date: '1990-12-23',
  opening_crawl: 'description',
  title: 'charmed',
};
const selectors = {
  film: () => screen.queryByText(/charmed/i),
  placeholder: () => screen.queryByText(/choose a film/i),
  director: () => screen.queryByText(/pedro/i),
  producer: () => screen.queryByText(/hasan/i),
  releaseDate: () => screen.queryByText(/1990-12-23/i),
  description: () => screen.queryByText(/description/i),
  reviewButton: () => screen.queryByRole('button', { name: /write a review/i }),
};

describe('Films test', () => {
  beforeAll(() => {
    fetchFilmsFx.use(() => Promise.resolve(FILMS));
    fetchFilmFx.use(() => Promise.resolve(FILM));
  });
  beforeEach(async () => {
    await act(async () => {
      render(<FilmsPage />);
    });
  });

  it('Корректно отображается список фильмов', () => {
    expect(selectors.film()).toBeInTheDocument();
  });

  it('Если фильм не выбран, отображается заглушка', () => {
    expect(selectors.placeholder()).toBeInTheDocument();
  });

  it('При клике на фильм, подгружается информация о фильме', async () => {
    await act(async () => {
      userEvent.click(selectors.film());
    });
    expect(selectors.director()).toBeInTheDocument();
    expect(selectors.producer()).toBeInTheDocument();
    expect(selectors.releaseDate()).toBeInTheDocument();
    expect(selectors.description()).toBeInTheDocument();
    expect(selectors.reviewButton()).toBeInTheDocument();
  });

  it('При клике на кнопку "Написать рецензию" происходит переход на форму', async () => {
    await act(async () => {
      await userEvent.click(selectors.film());
    });
    act(() => {
      userEvent.click(selectors.reviewButton());
    });
    expect(global.window.location.pathname).toEqual('/review/charmed');
  });
});
