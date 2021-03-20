import MainContract from 'config/MainContract';
import web3 from 'config/web3';
import React, { useEffect, useState } from 'react';
import AllInvestorAgreements from 'components/InvestorAgreements/InvestorAgreements';
import styled from 'styled-components';
interface Props {
  contractBalance: string;
  accountBalance: string;
}

const StyledIAB = styled.div`
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
  useEffect(() => {
    const getAgreements = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        const _agreements = await MainContract.methods.getAgreements(accounts[0]).call();
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
