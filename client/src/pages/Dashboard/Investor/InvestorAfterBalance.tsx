import MainContract from 'config/MainContract';
import web3 from 'config/web3';
import React, { useEffect, useState } from 'react';
import AllInvestorAgreements from 'components/InvestorAgreements/InvestorAgreements';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
interface Props {
  contractBalance: string;
  accountBalance: string;
}

const StyledIAB = styled.div`
  width: 100%;
  .account__summary {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }
`;

const InvestorAfterBalance: React.FC<Props> = ({ contractBalance, accountBalance }) => {
  const [agreements, setAggreements] = useState([]);
  const user = useSelector((state: StoreState) => state.auth.user);
  useEffect(() => {
    const getAgreements = async () => {
      try {
        const _agreements = await MainContract.methods.getAgreements(user?.address).call();
        setAggreements(_agreements);
        console.log(_agreements);
      } catch (err) {
        console.log(err);
      }
    };
    getAgreements();
  }, []);
  return (
    <StyledIAB>
      <div className='account__summary'>
        <h1>Account balance: {accountBalance} ETH</h1>
        <h1>Contract balance: {contractBalance} ETH</h1>
      </div>
      <AllInvestorAgreements agreements={agreements} />
    </StyledIAB>
  );
};

export default InvestorAfterBalance;
