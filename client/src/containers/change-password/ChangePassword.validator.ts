import * as yup from 'yup';

interface ChangePassword {
  password: string;
  passwordRepeat?: string;
}

export const validations: yup.ObjectSchema<ChangePassword> = yup
  .object()
  .shape({
    password: yup
      .string()
      .required('validation.password.error.required')
      .min(6, 'validation.password.error.min_length'),
    passwordRepeat: yup.string().when('password', {
      is: (password) => password.length >= 6,
      then: yup.string().oneOf([yup.ref('password'), undefined], 'validation.password.error.must_match'),
    }),
  })
  .defined();
