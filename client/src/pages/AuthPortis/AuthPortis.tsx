import web3 from '../../config/web3';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccount, checkAuth } from 'store/ducks';
import toast from 'react-hot-toast';
import Loading from '@ico-ui/Loading';
import styled from 'styled-components';
import { StoreState } from 'store';
import axios from 'axios';

const AuthPortisWrapper = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    padding-bottom: 40px;
  }
`;

const AuthPortis: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = async () => {
      const accounts = await web3.eth.getAccounts();
      const { data } = await axios.get('/api/user/auth/check-auth');
      // const user = data.user;
      console.log(data);
      const userType = data.data.userType[0];
      // console.log(userType);
      dispatch(setAccount({ account: accounts[0] }))
        .then(() => {
          toast.success(`logged in with portis successfully`);
          // const _userTypes = user?.userType;
          // console.log(user);
          // console.log(_userTypes);
          // if (!_userTypes) {
          //   window.location.href = '/';
          // }
          // window.location.reload();
          window.location.href = `/${userType}/dashboard`;
        })
        .catch((err: any) => toast.error(err));
    };
    auth();
  }, []);

  return (
    <AuthPortisWrapper>
      <h1>Waiting for Login with Portis...</h1>
      <div>
        <Loading varient='secondary' />
      </div>
    </AuthPortisWrapper>
  );
};
export default AuthPortis;
