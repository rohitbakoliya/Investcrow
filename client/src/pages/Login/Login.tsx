import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'store';
import { loginUser } from 'store/ducks';
import { Input } from '@ico-ui/Form';
import { Button, Flex, IconLink } from '@ico-ui';
import toast from 'react-hot-toast';
import LoginSchema from './LoginSchema';
import LoginWrapper from './Login.style';
import AppLogo from 'components/Logo';
import { Link, useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((state: StoreState) => state.loading['user/LOGIN']);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
  });
  const onSubmit = (data: { email: string; password: string }) => {
    dispatch(loginUser(data))
      .then((data: any) => {
        history.push('/auth/portis');
        toast.success('Logged in successfully!');
      })
      .catch((err: string) => {
        toast.error(err);
      });
  };
  return (
    <LoginWrapper>
      <Flex direction='column' align='center' justify='center'>
        <AppLogo width='150px' />
        <h2 className='text--bold'>Hello, Welcome back!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type='text'
            name='email'
            placeholder='email@example.com'
            icon='user'
            errors={errors}
            inputRef={register}
          />
          <Input
            type='password'
            name='password'
            placeholder='password'
            icon='lock'
            errors={errors}
            inputRef={register}
          />
          <div className='util--links'>
            <Link className='color--gray' to='/request/forgot-password'>
              Forgot password?
            </Link>
          </div>
          <Button isLoading={isLoading as boolean} icon='arrow-right' type='submit' width='50%'>
            Login
          </Button>
        </form>
        <IconLink to='/signup' endIcon='arrow-right' className='color--gray'>
          Don't have an account?
        </IconLink>
      </Flex>
    </LoginWrapper>
  );
};

export default Login;
