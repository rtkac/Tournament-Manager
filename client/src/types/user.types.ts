export interface UserState {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  info: {
    accessToken: string;
    email: string;
    name: string;
    lastName: string;
  }
}