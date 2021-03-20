import * as yup from 'yup';

const PasswordFormSchema = yup.object().shape({
  password: yup.string().required().min(6).max(50),
  confirmPassword: yup
    .string()
    .required()
    .min(6)
    .max(50)
    .oneOf([yup.ref('password'), null], 'Confirm Password does not match'),
});

export default PasswordFormSchema;
