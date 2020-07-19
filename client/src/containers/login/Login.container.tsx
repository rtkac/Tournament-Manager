import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import _ from 'lodash';
import T from 'i18n/translationsKeyMapping';

import { startLogin } from 'actions/login.actions';

import { Grid, Cell, ALIGNMENT } from 'baseui/layout-grid';
import { Heading, HeadingLevel } from 'baseui/heading';
import InputComponent from 'components/input/Input.component';
import { validations } from './Login.validator';

import Button from 'components/button/Button.component';
import Modal from 'components/modal/Modal.component';

import { LoginDiv } from './Login.container.style';

enum OPEN_MODALS {
  NONE,
  LOGIN,
}

enum FIELD_IDS {
  EMAIL = 'email',
  PASSWORD = 'password',
}

interface FormData {
  email: string;
  password: string;
}

const Login = (props: LoginProps) => {
  const { t, startLogin } = props;
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
        startLogin({
          email: data.email,
          password: data.password,
        }).then((res) => {
          setIsLoading(false);
          if (res.error && !res.error.success && res.error.data.errCode) {
            setOpenModalMesssage(res.error.data.errCode);
            setOpenModal(OPEN_MODALS.LOGIN);
          }
        });
      });
    }
  };

  return (
    <>
      <LoginDiv>
        <Grid align={ALIGNMENT.center}>
          <Cell skip={[0, 1.5, 3.5]} span={[8, 5]}>
            <HeadingLevel>
              <Heading styleLevel={3 as 1}>{t(T.LOGIN.FORM.TITLE.LABEL)}</Heading>
            </HeadingLevel>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputComponent name={FIELD_IDS.EMAIL} errors={errors} inputRef={register} />
              <InputComponent name={FIELD_IDS.PASSWORD} errors={errors} inputRef={register} />
              <Button
                type="submit"
                isLoading={isLoading}
                overrides={{
                  BaseButton: {
                    style: () => {
                      return {
                        width: '100%',
                      };
                    },
                  },
                }}
              >
                {t(T.LOGIN.FORM.BUTTON.LOGIN.LABEL)}
              </Button>
            </form>
          </Cell>
        </Grid>
      </LoginDiv>

      {/* MODALS */}
      <>
        <Modal
          isOpen={openModal === OPEN_MODALS.LOGIN}
          closeHandler={hideModal}
          body={t(openModalMessage)}
          title={t(T.LOGIN.FORM.TITLE.LABEL)}
        />
      </>
      {/* / MODALS */}
    </>
  );
};

interface LoginProps {
  t: any;
  startLogin: (requestData: { email: string; password: string }) => any;
}

export default connect(null, {
  startLogin,
})(Login);
