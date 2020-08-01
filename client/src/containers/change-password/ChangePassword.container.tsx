import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import T from 'i18n/translationsKeyMapping';

import { Heading, HeadingLevel } from 'baseui/heading';

import ChangePasswordForm from 'containers/change-password/ChangePasswordForm.component';

import { ProfileDiv } from 'containers/profile/Profile.container.style';

const ChangePassword = (props: ProfileProps) => {
  const { t, history, userInfo } = props;

  return (
    <ProfileDiv>
      <HeadingLevel>
        <Heading styleLevel={3 as 1}>{t(T.CHANGE_PASSWORD.HEADER.LABEL)}</Heading>
      </HeadingLevel>

      <ChangePasswordForm t={t} history={history} userInfo={userInfo} />
    </ProfileDiv>
  );
};

interface ProfileProps extends RouteComponentProps {
  t: any;
  userInfo: {
    name: string;
    lastName: string;
    email: string;
  };
}

export default ChangePassword;
