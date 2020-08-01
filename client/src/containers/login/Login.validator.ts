import * as yup from 'yup';

interface Login {
  email: string;
  password: string;
}

export const validations: yup.ObjectSchema<Login> = yup
  .object()
  .shape({
    email: yup
      .string()
      .required('validation.email.error.required')
      .email('validation.email.error.format'),
    password: yup.string().required('validation.password.error.required'),
  })
  .defined();
