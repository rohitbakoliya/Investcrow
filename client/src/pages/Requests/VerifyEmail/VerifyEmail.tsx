import { Button, Flex, IconLink } from '@ico-ui';
import React from 'react';
import { Input } from '@ico-ui/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import EmailFormSchema from '../EmailFormSchema';
import { useDispatch, useSelector } from 'react-redux';
import { RequestFormWrapper } from '../RequestForm.style';
import { StoreState } from 'store';
import { requestEmailVerification } from 'store/ducks';
import toast from 'react-hot-toast';

const VerifyEmail: React.FC = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state: StoreState) => state.loading['user/REQ_VERIFICATION_EMAIL']
  );

  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(EmailFormSchema),
  });

  const onSubmit = (data: { email: string }) => {
    dispatch(requestEmailVerification(data))
      .then((msg: string) => toast.success(msg))
      .catch((err: string) => toast.error(err));
  };
  return (
    <RequestFormWrapper>
      <Flex align='center' justify='center' direction='column'>
        <h2>Haven't received verification email or link was expried??</h2>
        <p>
          Don't worries, you can generate new verification link by providing your registed email
          below.
          <br /> <br /> We'll send you an email containing verification instructions.
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
            Send verification email
          </Button>
        </form>
        <IconLink to='/' endIcon='arrow-right' className='color--gray'>
          Go back to login
        </IconLink>
      </Flex>
    </RequestFormWrapper>
  );
};
export default VerifyEmail;
