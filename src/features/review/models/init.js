import { forward } from 'effector-root';
import { $isFormSent, reviewForm, reviewGate, submitFormFx } from './index';

submitFormFx.use(
  data =>
    new Promise(resolve => {
      setTimeout(() => resolve(data), 1000);
    })
);

$isFormSent.on(submitFormFx.done, () => true).reset(reviewForm.reset);

forward({
  from: reviewForm.formValidated,
  to: submitFormFx,
});

forward({
  from: reviewGate.close,
  to: reviewForm.reset,
});
