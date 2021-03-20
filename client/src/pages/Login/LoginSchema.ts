import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  email: yup.string().email().required().min(4).max(100).trim(),
  password: yup.string().required().min(6).max(50),
});
export default LoginSchema;
