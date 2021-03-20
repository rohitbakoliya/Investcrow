import React from 'react';
import {
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

interface Props {
  agreements: Array<any>;
}

const ApprovedAgreements: React.FC<Props> = ({ agreements }) => {
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
              <TableCell align='center'>Complete Transection</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agreements.map(agreement => (
              <TableRow key={agreement.investor}>
                <TableCell>{agreement.investor}</TableCell>
                <TableCell align='center'>{agreement.company}</TableCell>
                <TableCell align='center'>{agreement.moneyRequired}</TableCell>
                <TableCell align='center'>{agreement.tokensRequired}</TableCell>
                <TableCell align='center'>{'HeLo'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default ApprovedAgreements;
