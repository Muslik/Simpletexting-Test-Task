import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
} from '@material-ui/core';
import { useStore } from 'effector-react';
import { useForm } from 'effector-forms';
import { Link } from 'react-router-dom';

import { $isFormSent, reviewForm } from 'features/review/models/index';

export const ReviewSentDialog = () => {
  const { fields } = useForm(reviewForm);
  const isFormSent = useStore($isFormSent);

  return (
    <Dialog open={isFormSent}>
      <DialogTitle>Your review was successfully submitted</DialogTitle>
      <DialogContent>
        <Typography>Username: {fields.userName.value}</Typography>
        <Typography>Email: {fields.email.value}</Typography>
        <Typography>Review: {fields.review.value}</Typography>
      </DialogContent>
      <DialogActions>
        <Button component={Link} to="/films" color="primary" autoFocus>
          Back to Films
        </Button>
      </DialogActions>
    </Dialog>
  );
};
