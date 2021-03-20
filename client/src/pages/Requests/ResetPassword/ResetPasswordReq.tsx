import { Button, Flex, IconLink } from '@ico-ui';
import { Input } from '@ico-ui/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'store';
import { resetPasswordRequest } from 'store/ducks';
import EmailFormSchema from '../EmailFormSchema';
import { RequestFormWrapper } from '../RequestForm.style';

const ResetPasswordReq: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: StoreState) => state.loading['user/REQ_RESET_PASSWORD']);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(EmailFormSchema),
  });
  const onSubmit = (data: { email: string }) => {
    dispatch(resetPasswordRequest(data))
      .then((msg: string) => {
        toast.success(msg);
      })
      .catch((err: string) => {
        toast.error(err);
      });
  };
  return (
    <RequestFormWrapper>
      <Flex align='center' justify='center' direction='column'>
        <h2>Ohhh! You fogot your password</h2>
        <p>
          No worries, you can reset your password by providing your registed email below. <br />{' '}
          <br />
          We'll send you an email with password reset instructions.
        </p>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name='email'
            type='email'
            icon='envelope'
            placeholder='email@example.com'
            errors={errors}
            inputRef={register}
          />
          <Button isLoading={isLoading as boolean} type='submit' icon='paper-plane'>
            Send password reset link
          </Button>
        </form>
        <IconLink to='/' endIcon='arrow-right' className='color--gray'>
          Go back to login
        </IconLink>
      </Flex>
    </RequestFormWrapper>
  );
};

export default ResetPasswordReq;
