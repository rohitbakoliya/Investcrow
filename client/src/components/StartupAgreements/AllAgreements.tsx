import React, { useEffect, useState } from 'react';
import {
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import MainContract from 'config/MainContract';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@ico-ui';
import toast from 'react-hot-toast';
import web3 from 'config/web3';
import { Link } from 'react-router-dom';

interface Props {
  agreements: Array<any>;
}
interface SProps {
  agreement: any;
}
const StatusComponet: React.FC<SProps> = ({ agreement }) => {
  const [loading, setLoading] = useState(true);
  const [statusIcon, setStatusIcon] = useState<null | JSX.Element>(null);

  const transferToken = async (tokenAddress: string, value: number, account: string) => {
    try {
      await MainContract.methods.depositToken(tokenAddress, value).send({
        from: account,
      });
      const bal = await MainContract.methods.getDepositedTokenBalance(account, tokenAddress).call();
      console.log(`paisa` + bal);
    } catch (err) {
      console.log(err);
    }
  };
  const completeAgreement = async () => {
    try {
      const [account] = await web3.eth.getAccounts();
      await transferToken(agreement.token, agreement.tokensRequired, account);
      await MainContract.methods
        .completeAgreement(agreement.investor, agreement.company)
        .send({ from: account });
      setStatusIcon(null);
      toast.success(`Transection Completed`);
    } catch (err) {
      toast.error('something went wrong');
    }
  };
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await MainContract.methods
          .getStatus(agreement.investor, agreement.company)
          .call();
        switch (status as any) {
          case '0':
            setStatusIcon(<FontAwesomeIcon icon='clock' className='color--brand' />);
            break;
          case '1':
            setStatusIcon(
              <Button variant='primary' onClick={completeAgreement}>
                Complete Transection
              </Button>
            );
            break;
          case '2':
            setStatusIcon(<FontAwesomeIcon icon='check-circle' className='color--success' />);
            break;
          case '3':
            setStatusIcon(<FontAwesomeIcon icon='times-circle' className='color--error' />);
            break;
          default:
            break;
        }
        setLoading(false);
      } catch (err) {
        toast.error('something went wrong');
        setLoading(false);
      }
    };
    fetchStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusIcon]);

  if (loading) {
    return <div></div>;
  }
  return statusIcon;
};

const AllAgreements: React.FC<Props> = ({ agreements }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Inv. Address</TableCell>
              <TableCell align='center'>Money Requested</TableCell>
              <TableCell align='center'>Tokens to be Transfered</TableCell>
              <TableCell align='center'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agreements.map(agreement => (
              <TableRow key={Math.random()}>
                <TableCell>
                  <Link to={`/profile/${agreement.investor}`}>{agreement.investor}</Link>
                </TableCell>
                <TableCell align='center'>{agreement.moneyRequired}</TableCell>
                <TableCell align='center'>{agreement.tokensRequired}</TableCell>
                <TableCell align='center'>{<StatusComponet agreement={agreement} />}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default AllAgreements;
