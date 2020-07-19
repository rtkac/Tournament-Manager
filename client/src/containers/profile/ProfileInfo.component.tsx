import React from 'react';
import { History, LocationState } from 'history';
import T from 'i18n/translationsKeyMapping';
import { ROUTES } from 'router/routes';

import List from 'components/list/List.component';
import Button from 'components/button/Button.component';

const ProfileInfo = (props: ProfileInfoProps) => {
  const { t, history, userInfo } = props;

  const userInfoData = [
    {
      label: t(T.PROFILE.INFO.NAME.LABEL),
      value: `${userInfo.name} ${userInfo.lastName}`,
    },
    {
      label: t(T.PROFILE.INFO.EMAIL.LABEL),
      value: userInfo.email,
    },
  ];

  return (
    <>
      <List items={userInfoData} />
      <Button fullWidth onClick={() => history.push(ROUTES.PROFILE_EDIT)}>
        {t(T.PROFILE.INFO.BUTTON.EDIT.LABEL)}
      </Button>
    </>
  );
};

interface ProfileInfoProps {
  t: any;
  history: History<LocationState>;
  userInfo: {
    name: string;
    lastName: string;
    email: string;
  };
}

export default ProfileInfo;
