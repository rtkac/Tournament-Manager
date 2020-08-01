import * as yup from 'yup';

interface ProfileEdit {
  firstName: string;
  lastName: string;
  league: any;
  favouriteTeam: any;
}

export const validations: yup.ObjectSchema<ProfileEdit> = yup
  .object()
  .shape({
    firstName: yup.string().required('validation.first_name.error.required'),
    lastName: yup.string().required('validation.last_name.error.required'),
    league: yup.array().required('validation.league.error.required'),
    favouriteTeam: yup.array().required('validation.favourite_team.error.required'),
  })
  .defined();
