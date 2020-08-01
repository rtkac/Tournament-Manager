const apiPath = process.env.REACT_APP_API_URL;
const apiFootbalPath = process.env.REACT_APP_API_FOOTBALL_URL;

export default {
  /**
   * Login endpoints
   */
  AUTH_ENDPOINT: `${apiPath}/api/users/auth`,
  LOGOUT_ENDPOINT: `${apiPath}/api/users/logout`,
  LOGIN_ENDPOINT: `${apiPath}/api/users/login`,

  /**
   * Signup endpoints
   */
  SIGNUP_ENDPOINT: `${apiPath}/api/users/register`,
  SIGNUP_CONFIRMATION_ENDPOINT: `${apiPath}/api/users/confirmation`,

  /**
   * Football endpoints
   */
  LEAGUE_ENDPOINT: `${apiFootbalPath}/v2/competitions`,
  TEAMS_ENDPOINT: (leagueId) => `${apiFootbalPath}/v2/teams/league/${leagueId}`,
};
