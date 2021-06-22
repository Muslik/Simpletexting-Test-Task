import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { submitFormFx } from 'features/review/models/index';

import { Routes } from 'App';

import 'features/review/models/init';

const selectors = {
  title: () => screen.queryByText(/review on charmed/i),
  userNameInput: () => screen.getByLabelText(/username/i),
  emailInput: () => screen.getByLabelText(/email/i),
  reviewInput: () => screen.getByLabelText(/review/i),
  submitButton: () => screen.getByRole('button', { name: /send/i }),
  cancelButton: () => screen.getByRole('button', { name: /cancel/i }),
  backToFilmsButton: () => screen.getByRole('button', { name: /back to films/i }),
  error: text => screen.queryByText(text),
  errors: text => screen.queryAllByText(text),
  successMessage: () => screen.queryByText(/success/i),
};

let testLocation;

const Wrapper = ({ children }) => (
  <MemoryRouter initialEntries={['/review/charmed']}>
    <Routes />
    <Route
      path="*"
      render={({ location }) => {
        testLocation = location;
        return null;
      }}
    />
    {children}
  </MemoryRouter>
);

describe('Films test', () => {
  beforeAll(() => {
    submitFormFx.use(() => Promise.resolve());
  });
  beforeEach(async () => {
    await act(async () => {
      render(<></>, { wrapper: Wrapper });
    });
  });

  it('Отображается заголовок с названием фильма', async () => {
    await waitFor(() => selectors.title());
    expect(selectors.title()).toBeInTheDocument();
  });

  it('При нажатии на кнопку отмена происходит перенаправление', () => {
    userEvent.click(selectors.cancelButton());

    expect(testLocation.pathname).toBe('/films');
  });

  it('Корректно вводится информация в поля формы', () => {
    userEvent.type(selectors.userNameInput(), 'Peter');
    userEvent.type(selectors.emailInput(), 'Peter@mail.ru');
    userEvent.type(selectors.reviewInput(), 'Ревью');

    expect(selectors.userNameInput()).toHaveValue('Peter');
    expect(selectors.emailInput()).toHaveValue('Peter@mail.ru');
    expect(selectors.reviewInput()).toHaveValue('Ревью');
  });

  it('Если не заполнены поля, показывается сообщение об ошибке', () => {
    userEvent.click(selectors.submitButton());

    const errors = selectors.errors(/required/i);
    expect(errors.length).toBe(3);
  });

  it('Если некорректно заполнена почта, отображается ошибка', () => {
    userEvent.type(selectors.userNameInput(), 'Peter');
    userEvent.type(selectors.emailInput(), 'Peter');
    userEvent.type(selectors.reviewInput(), 'Ревью');
    userEvent.click(selectors.submitButton());

    expect(selectors.error(/Email is invalid/i)).toBeInTheDocument();
  });

  it('При успешной отправке отображается модальное окно с информацией', async () => {
    userEvent.type(selectors.userNameInput(), 'Peter');
    userEvent.type(selectors.emailInput(), 'Peter@mail.ru');
    userEvent.type(selectors.reviewInput(), 'Ревью');
    await act(async () => {
      userEvent.click(selectors.submitButton());
    });
    expect(selectors.successMessage()).toBeInTheDocument();
  });

  it('При нажатии на кнопку "назад к фильмам", происзодит перенаправление', async () => {
    userEvent.type(selectors.userNameInput(), 'Peter');
    userEvent.type(selectors.emailInput(), 'Peter@mail.ru');
    userEvent.type(selectors.reviewInput(), 'Ревью');
    await act(async () => {
      userEvent.click(selectors.submitButton());
    });
    userEvent.click(selectors.backToFilmsButton());

    expect(testLocation.pathname).toBe('/films');
  });
});
