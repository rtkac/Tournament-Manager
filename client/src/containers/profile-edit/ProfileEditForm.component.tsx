import React, { useEffect, useState } from 'react';
import { History, LocationState } from 'history';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import _ from 'lodash';
import T from 'i18n/translationsKeyMapping';
import { ROUTES } from 'router/routes';

import { fetchLeagues } from 'actions/football.actions';

import ButtonGroup from 'components/button-group/ButtonGroup.component';
import InputComponent from 'components/input/Input.component';
import SelectComponent from 'components/select/Select.component';
import { validations } from 'containers/profile-edit/ProfileEdit.validator';

enum FIELD_IDS {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  LEAGUE = 'league',
  FAVOURITE_TEAM = 'favouriteTeam',
}

interface FormData {
  firstName: string;
  lastName: string;
  league: any;
  favouriteTeam: any;
}

const ProfileEditForm = (props: ProfileEditFormProps) => {
  const { t, history, isAuthenticated, fetchLeagues, leagues, isFetchingLeagues } = props;

  useEffect(() => {
    fetchLeagues();
  }, [isAuthenticated, fetchLeagues]);

  const actionButtons = [
    {
      label: t(T.PROFILE.EDIT.FORM.BUTTON.SAVE.LABEL),
      type: 'submit',
    },
    {
      label: t(T.PROFILE.EDIT.FORM.BUTTON.CANCEL.LABEL),
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
        name={FIELD_IDS.FIRST_NAME}
        label={t(T.PROFILE.EDIT.FORM.FIRST_NAME.LABEL)}
        errors={errors}
        inputRef={register}
      />
      <InputComponent
        name={FIELD_IDS.LAST_NAME}
        label={t(T.PROFILE.EDIT.FORM.LAST_NAME.LABEL)}
        errors={errors}
        inputRef={register}
      />
      <SelectComponent
        name={FIELD_IDS.LEAGUE}
        label={t(T.PROFILE.EDIT.FORM.LEAGUE.LABEL)}
        errors={errors}
        selectRef={register}
        options={leagues.map((league) => ({
          id: league.name,
        }))}
        isLoading={isFetchingLeagues}
      />
      <SelectComponent
        name={FIELD_IDS.FAVOURITE_TEAM}
        label={t(T.PROFILE.EDIT.FORM.FAVOURITE_TEAM.LABEL)}
        errors={errors}
        selectRef={register}
        options={[
          { id: 'AliceBlue', color: '#F0F8FF' },
          { id: 'AntiqueWhite', color: '#FAEBD7' },
          { id: 'Aqua', color: '#00FFFF' },
          { id: 'Aquamarine', color: '#7FFFD4' },
          { id: 'Azure', color: '#F0FFFF' },
          { id: 'Beige', color: '#F5F5DC' },
        ]}
      />
      <ButtonGroup items={actionButtons} />
    </form>
  );
};

interface ProfileEditFormProps {
  t: any;
  history: History<LocationState>;
  userInfo: {
    name: string;
    lastName: string;
    email: string;
  };
  fetchLeagues: () => any;
  leagues: any[];
  isAuthenticated: boolean;
  isFetchingLeagues: boolean;
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  leagues: state.football.leagues,
  isFetchingLeagues: state.football.isFetchingLeagues,
});

export default connect(mapStateToProps, {
  fetchLeagues,
})(ProfileEditForm);
