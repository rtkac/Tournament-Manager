import React from 'react';
import { connect } from 'react-redux';

const Signup = (props: SignupProps) => {
  return (
    <div>
      Signup
    </div>
  )
};

interface SignupProps {};

export default connect()(Signup);