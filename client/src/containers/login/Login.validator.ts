import * as yup from 'yup';

export const validations = yup.object().shape({
  email: yup
    .string()
    .required('login.email.error.required')
    .email('login.email.error.format'),
  password: yup.string().required('login.password.error.required'),
});
