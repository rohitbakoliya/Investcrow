import MainContract from 'config/MainContract';
import web3 from 'config/web3';
import React, { useEffect, useState } from 'react';
import { InvestorDashboardWrapper } from 'pages/Dashboard/Investor/InverstorDashboard.style';
import Loading from '@ico-ui/Loading';
import InvestorAfterBalance from './InvestorAfterBalance';
import toast from 'react-hot-toast';

const InvestorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [contractBalance, setContractBalance] = useState('0');
  const [accountBalance, setAccountBalance] = useState('0');
  useEffect(() => {
    const getBalance = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        let bal = await MainContract.methods.getDepositedBalance(accounts[0]).call();
        bal = await web3.utils.fromWei(bal, 'ether');
        let accBal = await web3.eth.getBalance(accounts[0]);
        accBal = await web3.utils.fromWei(accBal, 'ether');
        console.log(bal);
        console.log(accBal);
        setAccountBalance(accBal);
        setContractBalance(bal);
        setLoading(false);
      } catch (err) {
        toast.error('something went wrong');
      }
    };
    getBalance();
  }, []);

  if (loading) {
    return (
      <InvestorDashboardWrapper>
        <p> Calculating your balance...</p>
        <Loading varient='secondary' />
      </InvestorDashboardWrapper>
    );
  }

  return (
    <InvestorDashboardWrapper>
      <InvestorAfterBalance contractBalance={contractBalance} accountBalance={accountBalance} />
    </InvestorDashboardWrapper>
  );
};

export default InvestorDashboard;
