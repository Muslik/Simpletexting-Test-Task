// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { createEvent, root } from 'effector-root';

let cleanup;
export const reset = createEvent();

beforeAll(() => {
  cleanup = root.onCreateStore($store => {
    $store.reset(reset);
  });
});

beforeEach(() => {
  reset();
});

afterAll(() => {
  cleanup.unsubscribe();
});
