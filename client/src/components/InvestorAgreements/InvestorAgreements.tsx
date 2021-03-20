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

interface Props {
  agreements: Array<any>;
}
interface SProps {
  agreement: any;
}

const StyledButtonsGrp = styled.div`
  svg {
    font-size: 20px;
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusComponet: React.FC<SProps> = ({ agreement }) => {
  const [loading, setLoading] = useState(true);
  const [statusIcon, setStatusIcon] = useState<null | JSX.Element>(null);

  const transferMoney = async (agreement: any) => {
    try {
      await MainContract.methods.depositMoney().send({
        from: agreement.investor,
        value: agreement.moneyRequired,
      });
      setStatusIcon(null);
      toast.success(`Approved and money transferred to contract`);
    } catch (err) {
      console.log(err);
      toast.error(`something went wrong`);
    }
  };
  const handleApprove = async () => {
    try {
      const [account] = await web3.eth.getAccounts();
      await MainContract.methods
        .approveAgreement(agreement.investor, agreement.company)
        .send({ from: account });
      await transferMoney(agreement);
    } catch (err) {
      toast.error('something went wrong');
    }
  };
  const handleReject = async () => {
    try {
      const [account] = await web3.eth.getAccounts();
      await MainContract.methods
        .rejectAgreement(agreement.investor, agreement.company)
        .send({ from: account });
      setStatusIcon(null);
      toast.success(`Approval rejected`);
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
            setStatusIcon(
              <StyledButtonsGrp>
                <FontAwesomeIcon
                  icon='check-circle'
                  className='color--success'
                  onClick={handleApprove}
                />
                <FontAwesomeIcon
                  icon='times-circle'
                  className='color--error'
                  onClick={handleReject}
                />
              </StyledButtonsGrp>
            );
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
              <TableCell align='center'>Company Address</TableCell>
              <TableCell align='center'>Money Requested</TableCell>
              <TableCell align='center'>Tokens to be Transfered</TableCell>
              <TableCell align='center'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agreements.map(agreement => (
              <TableRow key={Math.random()}>
                <TableCell>{agreement.investor}</TableCell>
                <TableCell align='center'>{agreement.company}</TableCell>
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
