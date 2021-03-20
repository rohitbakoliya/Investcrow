import { Button, Flex, IconLink } from '@ico-ui';
import { useHistory, useParams } from 'react-router-dom';
import React from 'react';
import { Input } from '@ico-ui/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RequestFormWrapper } from '../RequestForm.style';
import PasswordFormSchema from '../PasswordFormSchema';
import { resetPassword } from 'store/ducks';
import toast from 'react-hot-toast';
import { StoreState } from 'store';

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((state: StoreState) => state.loading['user/RESET_PASSWORD']);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(PasswordFormSchema),
  });
  const onSubmit = (data: { password: string; confirmPassword: string }) => {
    dispatch(resetPassword(data, token))
      .then(() => {
        toast.success(`Password updated successfully`);
        history.push('/');
      })
      .catch((err: string) => {
        toast.error(err);
      });
  };
  return (
    <RequestFormWrapper>
      <Flex align='center' justify='center' direction='column'>
        <h2>Here you go!</h2>
        <p>Please provide us, your new password</p>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name='password'
            type='password'
            icon='lock'
            placeholder='New Password'
            errors={errors}
            inputRef={register}
          />
          <Input
            name='confirmPassword'
            type='password'
            icon='lock'
            placeholder='New Confirm Password'
            errors={errors}
            inputRef={register}
          />
          <Button isLoading={isLoading as boolean} type='submit' icon='key'>
            Update password
          </Button>
        </form>
        <IconLink to='/' endIcon='arrow-right' className='color--gray'>
          Go back to login
        </IconLink>
      </Flex>
    </RequestFormWrapper>
  );
};
export default ResetPassword;
