import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import _ from 'lodash';
import T from 'i18n/translationsKeyMapping';

import { validations } from './Signup.validator';
import InputComponent from 'components/input/Input.component';
import Button from 'components/button/Button.component';
import Modal from 'components/modal/Modal.component';

enum FIELD_IDS {
  FIRST_NAME = 'name',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  PASSWORD = 'password',
  PASSWORD_REPEAT = 'passwordRepeat',
}

interface FormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

enum OPEN_MODALS {
  NONE,
  SIGNUP_ERROR,
}

const SignupForm = (props: SignupFormProps) => {
  const { t, signup, signupSuccess } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState<OPEN_MODALS>(OPEN_MODALS.NONE);
  const [openModalMessage, setOpenModalMesssage] = useState<string>('');

  const hideModal = () => setOpenModal(OPEN_MODALS.NONE);

  const methods = useForm<FormData>({
    resolver: yupResolver(validations),
  });
  const { handleSubmit, register, errors } = methods;

  const onSubmit = (data: FormData) => {
    if (_.isEmpty(errors)) {
      Promise.resolve(setIsLoading(true)).then(() => {
        signup({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }).then((res) => {
          setIsLoading(false);
          if (res.error && !res.error.success && res.error.data.errCode) {
            setOpenModalMesssage(res.error.data.errCode);
            setOpenModal(OPEN_MODALS.SIGNUP_ERROR);
          } else {
            localStorage.setItem('confirm_email', data.email);
            signupSuccess(true);
          }
        });
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          name={FIELD_IDS.FIRST_NAME}
          label={t(T.SIGNUP.FORM.FIRST_NAME.LABEL)}
          errors={errors}
          inputRef={register}
        />
        <InputComponent
          name={FIELD_IDS.LAST_NAME}
          label={t(T.SIGNUP.FORM.LAST_NAME.LABEL)}
          errors={errors}
          inputRef={register}
        />
        <InputComponent
          name={FIELD_IDS.EMAIL}
          label={t(T.SIGNUP.FORM.EMAIL.LABEL)}
          errors={errors}
          inputRef={register}
        />
        <InputComponent
          name={FIELD_IDS.PASSWORD}
          label={t(T.SIGNUP.FORM.PASSWORD.LABEL)}
          type="password"
          errors={errors}
          inputRef={register}
        />
        <InputComponent
          name={FIELD_IDS.PASSWORD_REPEAT}
          label={t(T.SIGNUP.FORM.PASSWORD_REPEAT.LABEL)}
          type="password"
          errors={errors}
          inputRef={register}
        />
        <Button type="submit" isLoading={isLoading} fullWidth>
          {t(T.SIGNUP.FORM.BUTTON.SIGNUP.LABEL)}
        </Button>
      </form>

      {/* MODALS */}
      <>
        <Modal
          isOpen={openModal === OPEN_MODALS.SIGNUP_ERROR}
          closeHandler={hideModal}
          body={t(openModalMessage)}
          title={t(T.LOGIN.FORM.TITLE.LABEL)}
          isError
        />
      </>
      {/* / MODALS */}
    </>
  );
};

interface SignupFormProps {
  t: any;
  signup: (requestData: { name: string; lastName: string; email: string; password: string }) => any;
  signupSuccess: (val: boolean) => void;
}

export default SignupForm;
