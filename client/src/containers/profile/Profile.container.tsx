import React from 'react';
import { History, LocationState } from 'history';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import T from 'i18n/translationsKeyMapping';

import { Heading, HeadingLevel } from 'baseui/heading';

import ProfileInfo from 'containers/profile/ProfileInfo.component';

import { ProfileDiv } from 'containers/profile/Profile.container.style';

const Profile = (props: ProfileProps) => {
  const { t, history, userInfo } = props;

  return (
    <ProfileDiv>
      <HeadingLevel>
        <Heading styleLevel={3 as 1}>{t(T.PROFILE.HEADER.LABEL)}</Heading>
      </HeadingLevel>

      <ProfileInfo t={t} history={history} userInfo={userInfo} />
    </ProfileDiv>
  );
};

interface ProfileProps extends RouteComponentProps {
  t: any;
  history: History<LocationState>;
  userInfo: {
    name: string;
    lastName: string;
    email: string;
  };
}

const mapStateToProps = (state) => ({
  userInfo: state.user.info,
});

export default connect(mapStateToProps)(Profile);
