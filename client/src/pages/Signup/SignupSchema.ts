import * as yup from 'yup';

const SignupSchema = yup.object().shape({
  name: yup.string().required().min(4).max(50).trim(),
  // name: yup
  //   .string()
  //   .required()
  //   .min(4)
  //   .max(50)
  //   .trim(),
  email: yup.string().required().min(5).max(100).email().trim(),
  password: yup.string().required().min(6).max(50),
  confirmPassword: yup
    .string()
    .required()
    .min(6)
    .max(50)
    .oneOf([yup.ref('password'), null], 'Confirm Password does not match'),
});

export default SignupSchema;
