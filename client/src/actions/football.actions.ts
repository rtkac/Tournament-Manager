import fetch from 'helpers/redux/services/http';
import * as actionTypes from './actionTypes';
import endpoints from './endpoints';

// import { StartLoginState } from 'types/login.types';

export const fetchLeagues = () => {
  const promise = fetch(
    endpoints.LEAGUE_ENDPOINT,
    {
      headers: {
        'X-Auth-Token': process.env.REACT_APP_API_FOOTBALL_TOKEN || '',
      },
    },
    true,
  );
  return {
    onRequest: actionTypes.FETCH_LEAGUES_TRIGGERED,
    onFailure: actionTypes.FETCH_LEAGUES_FAILED,
    onSuccess: actionTypes.FETCH_LEAGUES_SUCCESS,
    promise,
  };
};
