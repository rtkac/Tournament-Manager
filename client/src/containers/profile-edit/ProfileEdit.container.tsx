import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import T from 'i18n/translationsKeyMapping';

import { Heading, HeadingLevel } from 'baseui/heading';

import ProfileEditForm from 'containers/profile-edit/ProfileEditForm.component';

import { ProfileDiv } from 'containers/profile/Profile.container.style';

const ProfileEdit = (props: ProfileProps) => {
  const { t, history, userInfo } = props;

  return (
    <ProfileDiv>
      <HeadingLevel>
        <Heading styleLevel={3 as 1}>{t(T.PROFILE.EDIT.HEADER.LABEL)}</Heading>
      </HeadingLevel>

      <ProfileEditForm t={t} history={history} userInfo={userInfo} />
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

export default ProfileEdit;
