export interface SignupState {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignupConfirmationState {
  email: string;
  accessToken: string;
}
