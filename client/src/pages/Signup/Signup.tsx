import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Flex, IconLink } from '@ico-ui';
import { Input, InputLarge } from '@ico-ui/Form';
import AvatarUploader from 'components/AvatarUploader';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

import SignupSchema from './SignupSchema';
import SignupWrapper from '../Login/Login.style';
import { StoreState } from 'store';
import { signupUser } from 'store/ducks';
import { Link, useHistory } from 'react-router-dom';
import ErrorText from '@ico-ui/Form/ErrorText';

interface PreviewFile extends File {
  preview?: any;
}

const Signup: React.FC = () => {
  const [file, setFile] = useState<PreviewFile>();
  const history = useHistory();
  const [fileError, setFileError] = useState<string>('');
  const [userTypeValue, setUserTypeValue] = useState<string>('');
  const [userTypeError, setUserTypeError] = useState<string>('');
  const dispatch = useDispatch();
  const isLoading = useSelector((state: StoreState) => state.loading['user/SIGN_UP']);
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SignupSchema),
  });
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    if (!userTypeValue) {
      setUserTypeError('this field is required');
    } else {
      formData.append('userType', userTypeValue);
    }
    if (file) {
      formData.append('image', file);
    } else {
      return setFileError('Image is Required');
    }
    for (let name in data) {
      formData.append(name, data[name]);
    }
    if (!userTypeValue) return;
    dispatch(signupUser(formData))
      .then(() => {
        toast.success(`Registed successfully! please verify your email`);
        history.push('/auth/portis');
      })
      .catch((e: string) => toast.error(e));
  };

  const handleRadioChange = (event: any) => {
    setUserTypeValue(event.target.value);
    setUserTypeError('');
  };
  return (
    <SignupWrapper>
      <Flex direction='column' justify='center' align='center'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 
            // ? avatar is required for now
          */}
          <AvatarUploader
            name='avatar'
            file={file}
            handleFile={file => setFile(file)}
            handleError={err => setFileError(err)}
            fileError={fileError}
          />
          <InputLarge
            icon='edit'
            placeholder='Full name'
            type='text'
            name='name'
            autoComplete='off'
            errors={errors}
            inputRef={register}
          />
          <Input
            icon='envelope'
            placeholder='email@example.com'
            type='email'
            name='email'
            errors={errors}
            inputRef={register}
          />
          <Input
            icon='lock'
            placeholder='password'
            type='password'
            name='password'
            errors={errors}
            inputRef={register}
          />
          <Input
            icon='lock'
            placeholder='confim password'
            type='password'
            name='confirmPassword'
            errors={errors}
            inputRef={register}
          />
          <RadioGroup
            row
            aria-label='Signup as'
            name='userType'
            value={userTypeValue}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value='startup'
              control={<Radio color='primary' size='small' />}
              label='Startup'
            />
            <FormControlLabel
              value='investor'
              control={<Radio color='primary' size='small' />}
              label='investor'
            />
          </RadioGroup>
          <ErrorText
            errors={
              !userTypeError ? {} : { userType: { message: userTypeError, type: 'required' } }
            }
            name='userType'
          />
          <Button isLoading={isLoading as boolean} type='submit' icon='arrow-right' width='50%'>
            Signup
          </Button>
        </form>
        <IconLink to='/' endIcon='arrow-right' className='color--gray'>
          Already have an account?
        </IconLink>
        <Link className='color--gray link-sm' to='request/verification-email'>
          Already registered, but have not received a confirmation email?
        </Link>
      </Flex>
    </SignupWrapper>
  );
};

export default Signup;
