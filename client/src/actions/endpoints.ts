const apiPath = process.env.REACT_APP_API_URL;

export default {
  /**
   * Login endpoints
   */
  AUTH_ENDPOINT: `${apiPath}/api/users/auth`,
  LOGOUT_ENDPOINT: `${apiPath}/api/users/logout`,
  LOGIN_ENDPOINT: `${apiPath}/api/users/login`,
}