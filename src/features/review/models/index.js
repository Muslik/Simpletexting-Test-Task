import { root, createStore, createEffect } from 'effector-root';
import { createGate } from 'effector-react';
import { createForm } from 'effector-forms';

export const reviewGate = createGate();

export const reviewForm = createForm({
  domain: root,
  fields: {
    userName: {
      init: '',
      rules: [
        {
          name: 'required',
          validator: value => ({
            isValid: !!value,
            errorText: 'Username is required',
          }),
        },
      ],
    },
    email: {
      init: '',
      rules: [
        {
          name: 'required',
          validator: value => ({
            isValid: !!value,
            errorText: 'Email is required',
          }),
        },
        {
          name: 'email',
          validator: value => ({
            isValid: /\S+@\S+\.\S+/.test(value),
            errorText: 'Email is invalid (example: aaa@gmail.com)',
          }),
        },
      ],
    },
    review: {
      init: '',
      rules: [
        {
          name: 'required',
          validator: value => ({
            isValid: !!value,
            errorText: 'Message is required',
          }),
        },
      ],
    },
  },
  validateOn: ['submit'],
});

export const submitFormFx = createEffect();

export const $isFormSent = createStore(false);
