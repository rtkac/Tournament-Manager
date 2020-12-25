import * as actionTypes from '../actions/actionTypes';
import { FootballState } from 'types/football.types';

const initialState: FootballState = {
  leagues: [],
  isFetchingLeagues: false,
  selectedLeagueId: null,
};

export default function userReducer(state = initialState, action): FootballState {
  switch (action.type) {
    case actionTypes.FETCH_LEAGUES_TRIGGERED: {
      return {
        ...state,
        isFetchingLeagues: true,
      };
    }
    case actionTypes.FETCH_LEAGUES_SUCCESS: {
      return {
        ...state,
        isFetchingLeagues: false,
        leagues: action.response.competitions.map((league) => ({
          id: league.id,
          label: league.name,
        })),
      };
    }
    case actionTypes.FETCH_LEAGUES_FAILED: {
      return {
        ...state,
        isFetchingLeagues: false,
      };
    }
    case actionTypes.SELECT_LEAGUE_ID: {
      return {
        ...state,
        selectedLeagueId: action.leagueId,
      };
    }
    default: {
      return state;
    }
  }
}
