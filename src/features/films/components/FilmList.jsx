import { useStore } from 'effector-react';
import {
  Card,
  CardContent,
  List,
  Grid,
  ListItem,
  CircularProgress,
} from '@material-ui/core';

import { $films, filmSelected, fetchFilmsFx } from 'features/films/models';

import styles from './FilmList.module.css';

const handleClickFilm = url => () => {
  filmSelected(url);
};

export const FilmList = () => {
  const films = useStore($films);
  const isFetching = useStore(fetchFilmsFx.pending);

  return (
    <Card className={styles.cardList}>
      <CardContent>
        {isFetching ? (
          <Grid container justify="center">
            <CircularProgress />
          </Grid>
        ) : (
          <List>
            {films.map(({ title, url }) => (
              <ListItem
                button
                key={url}
                color="primary"
                onClick={handleClickFilm(url)}
                variant="outlined"
              >
                {title}
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};
