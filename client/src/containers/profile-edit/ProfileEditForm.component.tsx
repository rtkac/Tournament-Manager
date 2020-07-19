import React from 'react';
import { History, LocationState } from 'history';
import T from 'i18n/translationsKeyMapping';
import { ROUTES } from 'router/routes';

import ButtonGroup from 'components/button-group/ButtonGroup.component';

const ProfileEditForm = (props: ProfileEditForm) => {
  const { t, history } = props;

  const actionButtons = [
    {
      label: t(T.PROFILE.EDIT.BUTTON.SAVE.LABEL),
    },
    {
      label: t(T.PROFILE.EDIT.BUTTON.CANCEL.LABEL),
      onClick: () => history.push(ROUTES.PROFILE),
    },
  ];

  return <ButtonGroup items={actionButtons} />;
};

interface ProfileEditForm {
  t: any;
  history: History<LocationState>;
  userInfo: {
    name: string;
    lastName: string;
    email: string;
  };
}

export default ProfileEditForm;
