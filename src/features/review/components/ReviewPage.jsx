import {
  Backdrop,
  CircularProgress,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useGate, useStore } from 'effector-react';
import { useParams } from 'react-router-dom';

import { reviewGate, submitFormFx } from 'features/review/models/index';

import { ReviewForm } from './ReviewForm';
import { ReviewSentDialog } from './ReviewSentDialog';

import styles from './ReviewPage.module.css';

const useStyles = makeStyles({
  loading: {
    zIndex: 1,
  },
});

export const ReviewPage = () => {
  useGate(reviewGate);
  const classes = useStyles();
  const { title } = useParams();
  const isSendingForm = useStore(submitFormFx.pending);

  return (
    <Grid container justify="center" align="center" direction="column">
      <Backdrop classes={{ root: classes.loading }} open={isSendingForm}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h2" className={styles.title}>
        Review on {title}
      </Typography>
      <ReviewForm />
      <ReviewSentDialog />
    </Grid>
  );
};

export default ReviewPage;
