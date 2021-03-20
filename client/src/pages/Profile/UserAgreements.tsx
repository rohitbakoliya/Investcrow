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
import DoneIcon from '@material-ui/icons/Done';
import { Button } from '@ico-ui';
import toast from 'react-hot-toast';
import web3 from 'config/web3';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import Loading from '@ico-ui/Loading';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import { Link } from 'react-router-dom';

interface Props {}
interface SProps {
  agreement: any;
}

const UserWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StatusComponet: React.FC<SProps> = ({ agreement }) => {
  const [statusIcon, setStatusIcon] = useState<null | JSX.Element>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await MainContract.methods
          .getStatus(agreement.investor, agreement.company)
          .call();
        switch (status as any) {
          case '0':
            setStatusIcon(<FontAwesomeIcon icon='clock' className='color--error' />);
            break;
          case '1':
            setStatusIcon(<DoneIcon className='color--success' />);
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
      } catch (err) {
        toast.error('something went wrong');
      }
    };
    fetchStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusIcon]);

  return statusIcon;
};

const UserAgreements: React.FC<Props> = () => {
  const [agreements, setAgreements] = useState<Array<any>>([]);
  const userVal = useSelector((state: StoreState) => state.auth.user?.userType);
  const [loading, setLoading] = useState(true);
  let userType = 'startup';
  if (userVal !== undefined) userType = userVal[0];
  useEffect(() => {
    const getAgreements = async () => {
      const [account] = await web3.eth.getAccounts();
      console.log(account);
      const agreement = await MainContract.methods.getAgreements(account).call();
      setAgreements(agreement);
      console.log(agreement);
      setLoading(false);
    };
    getAgreements();
  }, []);
  if (loading) {
    return (
      <UserWrapper>
        <p>Fetching your History</p>
        <Loading varient='secondary' />
      </UserWrapper>
    );
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              {userType === 'startup' && <TableCell align='center'>Inv. Address</TableCell>}
              {userType === 'investor' && <TableCell align='center'>Company Address</TableCell>}
              <TableCell align='center'>Money Requested</TableCell>
              <TableCell align='center'>Tokens to be Transfered</TableCell>
              <TableCell align='center'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agreements.map(agreement => (
              <TableRow key={Math.random()}>
                {userType === 'startup' && (
                  <TableCell>
                    <Link to={`/profile/${agreement.investor}`}>{agreement.investor}</Link>
                  </TableCell>
                )}
                {userType === 'investor' && (
                  <TableCell>
                    <Link to={`/profile/${agreement.company}`}>{agreement.company}</Link>
                  </TableCell>
                )}
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
export default UserAgreements;
