import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components/macro';
import googleLogo from 'assets/svg/google.svg';
import { Button } from '@ico-ui';
import { SERVER_URL } from 'config/siteUrls';
import { useDispatch } from 'react-redux';
import { checkAuth } from 'store/ducks';
import toast from 'react-hot-toast';

const StyledGB = styled(Button)`
  display: flex;
  align-items: center;
  color: ${p => p.theme.colors.black};
  background-color: white;
  box-shadow: ${p => p.theme.shadows.small};
  margin: 10px auto 25px auto !important;
  img {
    margin-right: ${p => p.theme.space.medium}px;
    width: 20px;
  }
`;

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const GoogleButton: React.FC<Props> = props => {
  const dispatch = useDispatch();

  const authEndPoint = `/api/user/auth/google`;
  const authURL = SERVER_URL + authEndPoint;

  const succssEventListener = useCallback(() => {
    window.addEventListener('message', event => {
      if (event.origin === SERVER_URL && event.data === 'success') {
        dispatch(checkAuth())
          .then(() => toast.success('Logged In successfully!'))
          .catch((err: string) => toast.error(err));
      }
    });
  }, [dispatch]);

  const initOAuth = () => {
    window.open(authURL, '__blank', 'width=500&height=800');
    succssEventListener();
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('message', succssEventListener);
    };
  }, [succssEventListener]);

  return (
    <StyledGB onClick={initOAuth} {...props}>
      <img src={googleLogo} alt='google logo' /> Continue with Google
    </StyledGB>
  );
};
export default GoogleButton;
