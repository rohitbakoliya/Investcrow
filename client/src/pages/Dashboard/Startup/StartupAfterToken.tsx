import React, { useEffect, useState } from 'react';
import MainContract from 'config/MainContract';
import AgreementForm from 'components/Forms/Agreement';
import AllAgreements from 'components/StartupAgreements/AllAgreements';
import styled from 'styled-components';
import { Flex } from '@ico-ui';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';

interface Props {
  token: string;
}

const StyledSAD = styled.div`
  width: 100%;
  .account__details {
    p {
      margin: 0;
    }
    margin-bottom: 80px;
  }
  .MuiTableContainer-root {
    /* all: unset; */
  }
`;

const StartupAfterToken: React.FC<Props> = ({ token }) => {
  const [tokenInfo, setTokenInfo] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [address, setAddress] = useState<string | undefined>('');
  const user = useSelector((state: StoreState) => state.auth.user);

  useEffect(() => {
    const getInfo = async () => {
      try {
        // console.log(' This is address', accounts[0]);
        setAddress(user?.address);
        const info = await MainContract.methods.infoToken(token).call();
        const _agreements = await MainContract.methods.getAgreements(user?.address).call();
        setAgreements(_agreements);
        setTokenInfo(info);
      } catch (err) {
        toast.error('Something went wrong while creating new token');
      }
    };
    getInfo();
  }, [token]);
  useEffect(() => {
    const getAddress = async () => {
      try {
        setAddress(user?.address);
      } catch (err) {
        toast.error('Something went wrong while creating new token');
      }
    };
    getAddress();
  }, [address]);

  return (
    <StyledSAD>
      <Flex justify='space-between' align='center'>
        <h2>Address: {token}</h2>
        <AgreementForm address={address} token={token} />
      </Flex>
      <Flex className='account__details color--gray' justify='space-between' align='center'>
        <p>Name: {tokenInfo && tokenInfo[0]}</p>
        <p>Symbol: ({tokenInfo && tokenInfo[1]})</p>
        <p>Total Supply: {tokenInfo && tokenInfo[2]}</p>
      </Flex>
      <AllAgreements agreements={agreements} />
    </StyledSAD>
  );
};
export default StartupAfterToken;
