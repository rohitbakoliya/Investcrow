import web3 from 'config/web3';
import MainContract from 'config/MainContract';
import { useEffect, useState } from 'react';
import Loading from '@ico-ui/Loading';
import CreateTokenForm from 'components/Forms/CreateToken';
import { StartupDashboardWrapper } from './StartupDashboard.style';
import toast from 'react-hot-toast';
import StartupAfterToken from './StartupAfterToken';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';

const StartupDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<null | string>(null);
  const [hasToken, setHasToken] = useState(false);
  const user = useSelector((state: StoreState) => state.auth.user);

  useEffect(() => {
    const checkForTokens = async () => {
      try {
        const token = await MainContract.methods.getStartupToken(user?.address).call();
        if (parseInt(token)) {
          setToken(token);
          setHasToken(true);
        } else {
          setHasToken(false);
          toast('Opps, you have not created any tokens yet');
        }
        setLoading(false);
      } catch (err) {
        toast.error('Something went wrong while creating new token');
        setLoading(false);
      }
    };
    checkForTokens();
    // getStartupToken
  }, [hasToken]);

  if (loading) {
    return (
      <StartupDashboardWrapper>
        <p>Finding your tokens...</p>
        <Loading varient='secondary' />
      </StartupDashboardWrapper>
    );
  }

  return (
    <StartupDashboardWrapper>
      {token ? (
        <StartupAfterToken token={token} />
      ) : (
        <CreateTokenForm tokenCreated={() => setHasToken(true)} />
      )}
    </StartupDashboardWrapper>
  );
};

export default StartupDashboard;
