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
import toast from 'react-hot-toast';
import styled from 'styled-components';
import Loading from '@ico-ui/Loading';
import { Link } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import { SyTooltip } from '@ico-ui';

interface Props {
  user: any;
}
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

const UserAgreements: React.FC<Props> = ({ user }) => {
  const [agreements, setAgreements] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  let userType: string | undefined = undefined;
  if (user instanceof Object && Object.keys(user).length !== 0) {
    userType = user.userType[0];
  }

  useEffect(() => {
    const getAgreements = async () => {
      if (user instanceof Object && Object.keys(user).length !== 0) {
        const account = user.address;
        const agreement = await MainContract.methods.getAgreements(account).call();
        setAgreements(agreement);
        setLoading(false);
      }
    };
    getAgreements();
  }, [user]);

  if (loading || !user) {
    return (
      <UserWrapper>
        <p>Fetching your History</p>
        <Loading varient='secondary' />
      </UserWrapper>
    );
  }
  if (agreements.length === 0) {
    return <>No agreements made yet</>;
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
                    <SyTooltip title='copy address'>
                      <CopyToClipboard
                        text={agreement.investor}
                        onCopy={() => toast.success('Copied to clipboard!')}
                      >
                        <FontAwesomeIcon
                          style={{ marginLeft: '12px', cursor: 'pointer' }}
                          icon='clipboard'
                        />
                      </CopyToClipboard>
                    </SyTooltip>
                  </TableCell>
                )}
                {userType === 'investor' && (
                  <TableCell>
                    <Link to={`/profile/${agreement.company}`}>{agreement.company}</Link>
                    <SyTooltip title='copy clipboard'>
                      <CopyToClipboard
                        text={agreement.investor}
                        onCopy={() => toast.success('Copied to clipboard!')}
                      >
                        <FontAwesomeIcon
                          style={{ marginLeft: '12px', cursor: 'pointer' }}
                          icon='clipboard'
                        />
                      </CopyToClipboard>
                    </SyTooltip>
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
