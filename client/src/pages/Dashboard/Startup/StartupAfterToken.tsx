import React, { useEffect, useState } from 'react';
import MainContract from 'config/MainContract';
import AgreementForm from 'components/Forms/Agreement';
import web3 from 'config/web3';
import AllAgreements from 'components/StartupAgreements/AllAgreements';
import styled from 'styled-components';
import { Flex } from '@ico-ui';
import toast from 'react-hot-toast';

interface Props {
  token: string;
}

const StyledSAD = styled.div`
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
  const [address, setAddress] = useState<string>('');
  useEffect(() => {
    const getInfo = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        console.log(' This is address', accounts[0]);
        setAddress(accounts[0]);
        const info = await MainContract.methods.infoToken(token).call();
        const _agreements = await MainContract.methods.getAgreements(accounts[0]).call();
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
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
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
