// Login
export const FETCH_AUTH_TRIGGERED = 'FETCH_AUTH_TRIGGERED';
export const FETCH_AUTH_FAILED = 'FETCH_AUTH_FAILED';
export const FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS';

export const FETCH_LOGOUT_TRIGGERED = 'FETCH_LOGOUT_TRIGGERED';
export const FETCH_LOGOUT_FAILED = 'FETCH_LOGOUT_FAILED';
export const FETCH_LOGOUT_SUCCESS = 'FETCH_LOGOUT_SUCCESS';

export const FETCH_LOGIN_START_TRIGGERED = 'FETCH_LOGIN_START_TRIGGERED';
export const FETCH_LOGIN_START_FAILED = 'FETCH_LOGIN_START_FAILED';
export const FETCH_LOGIN_START_SUCCESS = 'FETCH_LOGIN_START_SUCCESS';

// Signup
export const FETCH_SIGNUP_TRIGGERED = 'FETCH_SIGNUP_TRIGGERED';
export const FETCH_SIGNUP_FAILED = 'FETCH_SIGNUP_FAILED';
export const FETCH_SIGNUP_SUCCESS = 'FETCH_SIGNUP_SUCCESS';
// Signup confirmation
export const FETCH_SIGNUP_CONFIRMATION_TRIGGERED = 'FETCH_SIGNUP_CONFIRMATION_TRIGGERED';
export const FETCH_SIGNUP_CONFIRMATION_FAILED = 'FETCH_SIGNUP_CONFIRMATION_FAILED';
export const FETCH_SIGNUP_CONFIRMATION_SUCCESS = 'FETCH_SIGNUP_CONFIRMATION_SUCCESS';

// Fetch leagues
export const FETCH_LEAGUES_TRIGGERED = 'FETCH_LEAGUES_TRIGGERED';
export const FETCH_LEAGUES_FAILED = 'FETCH_LEAGUES_FAILED';
export const FETCH_LEAGUES_SUCCESS = 'FETCH_LEAGUES_SUCCESS';
// Fetch teams
export const FETCH_TEAMS_TRIGGERED = 'FETCH_TEAMS_TRIGGERED';
export const FETCH_TEAMS_FAILED = 'FETCH_TEAMS_FAILED';
export const FETCH_TEAMS_SUCCESS = 'FETCH_TEAMS_SUCCESS';

// Select league id
export const SELECT_LEAGUE_ID = 'SELECT_LEAGUE_ID';

type PromiseAction = (response: Response, dispatch, state, rest) => void;

interface PromiseActionBase {
  onRequest?: PromiseAction | string;
  onSuccess?: PromiseAction | string;
  onFailure?: PromiseAction | string;
  promise: Promise<Response>;
}

// Signup actions types
export interface SignupAction extends PromiseActionBase {
  onRequest: typeof FETCH_SIGNUP_TRIGGERED;
  onFailure: typeof FETCH_SIGNUP_FAILED;
  onSuccess: typeof FETCH_SIGNUP_SUCCESS;
}

// Signup confirmation actions types
export interface SignupConfirmationAction extends PromiseActionBase {
  onRequest: typeof FETCH_SIGNUP_CONFIRMATION_TRIGGERED;
  onFailure: typeof FETCH_SIGNUP_CONFIRMATION_FAILED;
  onSuccess: typeof FETCH_SIGNUP_CONFIRMATION_SUCCESS;
}

// Fetch leagues actions types
export interface FetchLeaguesAction extends PromiseActionBase {
  onRequest: typeof FETCH_LEAGUES_TRIGGERED;
  onFailure: typeof FETCH_LEAGUES_FAILED;
  onSuccess: typeof FETCH_LEAGUES_SUCCESS;
}

// Fetch teams actions types
export interface FetchTeamsAction extends PromiseActionBase {
  onRequest: typeof FETCH_TEAMS_TRIGGERED;
  onFailure: typeof FETCH_TEAMS_FAILED;
  onSuccess: typeof FETCH_TEAMS_SUCCESS;
}
