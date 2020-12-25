import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import T from 'i18n/translationsKeyMapping';
import { ROUTES } from 'router/routes';

import { signupConfirmation } from 'actions/signup.actions';

import ResultScreen from 'components/result-screen/ResultScreen.component';
import LinkComponent from 'components/link/Link.component';

const Confirmation = (props: ConfirmationProps) => {
  const { t, computedMatch, signupConfirmation } = props;
  const [confirmationInProgress, setConfirmationInProgress] = useState<boolean>(true);
  const [confirmationResult, setConfirmationResult] = useState<{ error: boolean; message: string }>({
    error: false,
    message: '',
  });

  const confirmEmail = localStorage.getItem('confirm_email');

  useEffect(() => {
    if (confirmEmail) {
      signupConfirmation({
        email: confirmEmail,
        accessToken: computedMatch.params.accessToken,
      }).then((res) => {
        setConfirmationInProgress(false);
        if (res.error && res.error.data && res.error.data.msg) {
          setConfirmationResult({
            error: true,
            message: res.error.data.msg,
          });
        } else if (res.error && res.error.data && res.error.data.errors && res.error.data.errors[0].msg) {
          setConfirmationResult({
            error: true,
            message: res.error.data.errors[0].msg,
          });
        } else if (res.response && res.response.success) {
          setConfirmationResult({
            error: false,
            message: T.CONFIRMATION.SUCCESS.LABEL,
          });
        }
      });
    }
  }, [computedMatch.params.accessToken, signupConfirmation, confirmEmail]);

  return !confirmEmail ? (
    <Redirect to={ROUTES.LOGIN} />
  ) : (
    <ResultScreen
      title={t(T.CONFIRMATION.HEADER.LABEL)}
      subTitle={
        confirmationInProgress ? (
          t(T.CONFIRMATION.IN_PROGRESS.LABEL)
        ) : (
          <Trans i18nKey={confirmationResult.message} components={{ a: <LinkComponent to={ROUTES.LOGIN} /> }} />
        )
      }
      isError={confirmationResult.error}
      isLoading={confirmationInProgress}
    />
  );
};

interface ConfirmationProps {
  t: any;
  computedMatch: any;
  signupConfirmation: (requestData: { email: string; accessToken: string }) => any;
}

export default connect(null, { signupConfirmation })(Confirmation);
