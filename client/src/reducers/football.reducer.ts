import * as actionTypes from '../actions/actionTypes';
import { FootballState } from 'types/football.types';

const initialState: FootballState = {
  leagues: [],
  isFetchingLeagues: false,
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
        leagues: action.response.competitions,
      };
    }
    case actionTypes.FETCH_LEAGUES_FAILED: {
      return {
        ...state,
        isFetchingLeagues: false,
      };
    }
    default: {
      return state;
    }
  }
}
