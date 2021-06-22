import { Grid, makeStyles } from '@material-ui/core';
import { useGate } from 'effector-react';

import { FilmList } from 'features/films/components/FilmList';
import { FilmInfo } from 'features/films/components/FilmInfo';

import { filmsGate } from 'features/films/models';

const useStyles = makeStyles({
  page: {
    height: '100%',
  },
});

export const FilmsPage = () => {
  useGate(filmsGate);
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={10}
      classes={{ root: classes.page }}
      direction="row"
      alignItems="center"
    >
      <Grid item md={3} lg={4}>
        <FilmList />
      </Grid>
      <Grid item md={9} lg={8}>
        <FilmInfo />
      </Grid>
    </Grid>
  );
};
