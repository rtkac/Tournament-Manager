import React from 'react';
import { History, LocationState } from 'history';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import _ from 'lodash';
import T from 'i18n/translationsKeyMapping';
import { ROUTES } from 'router/routes';

import ButtonGroup from 'components/button-group/ButtonGroup.component';
import InputComponent from 'components/input/Input.component';
import { validations } from 'containers/change-password/ChangePassword.validator';

enum FIELD_IDS {
  PASSWORD = 'password',
  PASSWORD_REPEAT = 'passwordRepeat',
}

interface FormData {
  password: string;
  passwordRepat: string;
}

const ChangePasswordForm = (props: ChangePasswordFormProps) => {
  const { t, history } = props;

  const actionButtons = [
    {
      label: t(T.CHANGE_PASSWORD.FORM.BUTTON.SAVE.LABEL),
      type: 'submit',
    },
    {
      label: t(T.CHANGE_PASSWORD.FORM.BUTTON.CANCEL.LABEL),
      onClick: () => history.push(ROUTES.PROFILE),
    },
  ];

  const methods = useForm<FormData>({
    resolver: yupResolver(validations),
  });
  const { handleSubmit, register, errors } = methods;

  const onSubmit = (data: FormData) => {
    if (_.isEmpty(errors)) {
      return undefined;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputComponent
        name={FIELD_IDS.PASSWORD}
        label={t(T.CHANGE_PASSWORD.FORM.PASSWORD.LABEL)}
        type="password"
        errors={errors}
        inputRef={register}
      />
      <InputComponent
        name={FIELD_IDS.PASSWORD_REPEAT}
        label={t(T.CHANGE_PASSWORD.FORM.PASSWORD_REPEAT.LABEL)}
        type="password"
        errors={errors}
        inputRef={register}
      />
      <ButtonGroup items={actionButtons} />
    </form>
  );
};

interface ChangePasswordFormProps {
  t: any;
  history: History<LocationState>;
  userInfo: {
    name: string;
    lastName: string;
    email: string;
  };
}

export default ChangePasswordForm;
