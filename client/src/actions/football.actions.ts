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

export const fetchTeams = (leagueId: number) => {
  const promise = fetch(
    endpoints.TEAMS_ENDPOINT(leagueId),
    {
      headers: {
        'X-Auth-Token': process.env.REACT_APP_API_FOOTBALL_TOKEN || '',
      },
    },
    true,
  );
  return {
    onRequest: actionTypes.FETCH_TEAMS_TRIGGERED,
    onFailure: actionTypes.FETCH_TEAMS_FAILED,
    onSuccess: actionTypes.FETCH_TEAMS_SUCCESS,
    promise,
  };
};

export const selectLeagueId = (leagueId: number) => {
  return {
    type: actionTypes.SELECT_LEAGUE_ID,
    leagueId,
  };
};
