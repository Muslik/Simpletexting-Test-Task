import { Button, Grid, TextField, makeStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import { useForm } from 'effector-forms';
import { Link } from 'react-router-dom';

import { reviewForm } from 'features/review/models/index';

import styles from './ReviewPage.module.css';

const useStyles = makeStyles({
  input: {
    marginBottom: '1rem',
  },
});

export const ReviewForm = () => {
  const classes = useStyles();
  const { fields, hasError, errorText, submit } = useForm(reviewForm);

  const handleChangeForm = ({ target: { name, value } }) => {
    fields[name].onChange(value);
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    submit();
  };
  return (
    <form
      className={styles.form}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmitForm}
    >
      <TextField
        id="userName"
        required
        error={hasError('userName')}
        helperText={errorText('userName')}
        name="userName"
        label="username"
        variant="outlined"
        classes={{ root: classes.input }}
        value={fields.userName.value}
        onChange={handleChangeForm}
      />
      <TextField
        id="email"
        required
        error={hasError('email')}
        helperText={errorText('email')}
        name="email"
        label="email"
        variant="outlined"
        classes={{ root: classes.input }}
        value={fields.email.value}
        onChange={handleChangeForm}
      />
      <TextField
        id="review"
        multiline
        rows={10}
        error={hasError('review')}
        helperText={errorText('review')}
        name="review"
        required
        label="review"
        variant="outlined"
        classes={{ root: classes.input }}
        value={fields.review.value}
        onChange={handleChangeForm}
      />
      <Grid container justify="space-between">
        <Button
          component={Link}
          to="/films"
          variant="contained"
          color="default"
          endIcon={<CloseIcon />}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit" endIcon={<SendIcon />}>
          Send
        </Button>
      </Grid>
    </form>
  );
};
