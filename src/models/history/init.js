import { history } from 'shared/constants/history';
import { $location, locationUpdated, pushHistoryFx } from '.';

$location.on(locationUpdated, (_, payload) => payload);

pushHistoryFx.use(props => {
  history.push(props);
});
