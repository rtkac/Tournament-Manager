import React from 'react';
import { connect } from 'react-redux';

import { Button } from 'baseui/button';
import { FormControl } from "baseui/form-control";

import { startLogin } from 'actions/login.actions';

const Login = (props: LoginProps) => {
  const { startLogin } = props;

  return (
    <div>
      <Button onClick={() => startLogin()}>Login</Button>
    </div>
  )
};

interface LoginProps {
  startLogin: () => void;
};

export default connect(null, {
  startLogin,
})(Login);