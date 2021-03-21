import MainContract from 'config/MainContract';
import web3 from 'config/web3';
import { useEffect, useState } from 'react';
import { InvestorDashboardWrapper } from 'pages/Dashboard/Investor/InverstorDashboard.style';
import Loading from '@ico-ui/Loading';
import InvestorAfterBalance from './InvestorAfterBalance';
import toast from 'react-hot-toast';
import { StoreState } from 'store';
import { useSelector } from 'react-redux';

const InvestorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [contractBalance, setContractBalance] = useState('0');
  const [accountBalance, setAccountBalance] = useState('0');
  const user = useSelector((state: StoreState) => state.auth.user);

  useEffect(() => {
    const getBalance = async () => {
      try {
        let bal = await MainContract.methods.getDepositedBalance(user?.address).call();
        bal = await web3.utils.fromWei(bal, 'ether');
        let accBal = await web3.eth.getBalance(user?.address);
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
