import * as yup from 'yup';

interface Signup {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat?: string;
}

export const validations: yup.ObjectSchema<Signup> = yup
  .object()
  .shape({
    name: yup.string().required('validation.first_name.error.required'),
    lastName: yup.string().required('validation.last_name.error.required'),
    email: yup
      .string()
      .required('validation.email.error.required')
      .email('validation.email.error.format'),
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
