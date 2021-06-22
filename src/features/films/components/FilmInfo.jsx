import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import { useStore } from 'effector-react';

import { $selectedFilm, fetchFilmFx } from 'features/films/models';

import { history } from 'shared/constants/history';

import styles from './FilmInfo.module.css';

export const FilmInfo = () => {
  const film = useStore($selectedFilm);
  const isFetching = useStore(fetchFilmFx.pending);
  const {
    director,
    opening_crawl: openingCrawl,
    producer,
    release_date: releaseDate,
    title,
  } = film || {};

  const handleClickReview = () => {
    history.push(`/review/${title}`);
  };

  return (
    <Card>
      <CardContent>
        {!isFetching && !film && <Typography>Choose a film :)</Typography>}
        {isFetching && (
          <Grid container justify="center">
            <CircularProgress />
          </Grid>
        )}
        {film && (
          <>
            <Typography variant="h3" className={styles.title} gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {openingCrawl}
            </Typography>
            <Divider />
            <Typography color="textSecondary">release date: {releaseDate}</Typography>
            <Typography color="textSecondary">director: {director}</Typography>
            <Typography color="textSecondary">producer: {producer}</Typography>
          </>
        )}
      </CardContent>
      {film && (
        <CardActions>
          <Button size="small" onClick={handleClickReview}>
            Write a review
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
