import React, { useState } from 'react';
import { connect } from 'react-redux';
import T from 'i18n/translationsKeyMapping';

import { signup } from 'actions/signup.actions';

import { Grid, Cell } from 'baseui/layout-grid';
import { Heading, HeadingLevel } from 'baseui/heading';

import SignupForm from 'containers/signup/SignupForm.component';
import ResultScreen from 'components/result-screen/ResultScreen.component';

const Signup = (props: SignupProps) => {
  const { t, signup } = props;
  const [signupSuccess, isSignupSuccess] = useState(false);

  return !signupSuccess ? (
    <Grid>
      <Cell skip={[0, 1.5, 3.5]} span={[8, 5]}>
        <HeadingLevel>
          <Heading styleLevel={3 as 1}>{t(T.SIGNUP.HEADER.LABEL)}</Heading>
        </HeadingLevel>
        <SignupForm t={t} signup={signup} signupSuccess={(success) => isSignupSuccess(success)} />
      </Cell>
    </Grid>
  ) : (
    <ResultScreen title={t(T.SIGNUP.SUCCESS.HEADER.LABEL)} subTitle={t(T.SIGNUP.SUCCESS.SUBTITLE.LABEL)} />
  );
};

interface SignupProps {
  t: any;
  signup: (requestData: { name: string; lastName: string; email: string; password: string }) => void;
}

export default connect(null, {
  signup,
})(Signup);
