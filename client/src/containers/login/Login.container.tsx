import React from 'react';
import { connect } from 'react-redux';

import { startLogin, logout } from 'actions/login.actions';

import {Button, KIND} from 'baseui/button';

const Login = (props) => {
    return (
        <div>
            <Button
              onClick={() => props.startLogin()}
              startEnhancer={undefined}
              endEnhancer={undefined}
              kind={KIND.secondary}
            >
              Login
            </Button>
            <Button
              onClick={() => props.logout()}
              startEnhancer={undefined}
              endEnhancer={undefined}
              kind={KIND.secondary}
            >
              Logout
            </Button>
        </div>
    )
}

export default connect(null, {
    startLogin,
    logout,
})(Login);