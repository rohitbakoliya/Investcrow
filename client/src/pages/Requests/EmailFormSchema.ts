import * as yup from 'yup';

const EmailFormSchema = yup.object().shape({
  email: yup.string().required().min(5).max(100).email().trim(),
});

export default EmailFormSchema;
