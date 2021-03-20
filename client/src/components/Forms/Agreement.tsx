import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '@ico-ui/Form';
import { Button, Flex } from '@ico-ui';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { useEffect, useState } from 'react';
import MainContract from 'config/MainContract';
import web3 from 'config/web3';

const AgreementSchema = yup.object().shape({
  investorAddress: yup.string().required().trim(),
  moneyPromised: yup.string().min(1).required(),
  tokenPromised: yup.string().min(1).required(),
});
interface Agreement {
  investorAddress: string;
  moneyPromised: number;
  tokenPromised: number;
}
interface Props {
  address: string;
  token: string;
}

const AgreementForm: React.FC<Props> = ({ address: companyAddress, token: tokenAddress }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  console.log('Inside agg', companyAddress);
  console.log('token', tokenAddress);
  const { register, handleSubmit, errors } = useForm<Agreement>({
    mode: 'onChange',
    resolver: yupResolver(AgreementSchema),
  });
  const onSubmit = async (data: Agreement) => {
    try {
      const accounts = await web3.eth.getAccounts();
      await MainContract.methods
        .makeAgreement(
          data.investorAddress,
          companyAddress,
          data.moneyPromised,
          data.tokenPromised,
          tokenAddress
        )
        .send({ from: accounts[0] });
      const k = await MainContract.methods
        .getAgreement(data.investorAddress, companyAddress)
        .call();
      console.log(k);
      setOpen(false);
    } catch (err) {
      console.log(err);
      setOpen(false);
    }
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Create New Agreement</Button>
      <Dialog fullWidth={true} open={open} aria-labelledby='form-dialog-title'>
        <DialogTitle disableTypography id='form-dialog-title'>
          <h2 className='text--center'>Agreement form</h2>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type='text'
              name='investorAddress'
              placeholder='Investor Account Address'
              inputRef={register}
              errors={errors}
            />
            <Input
              type='number'
              name='moneyPromised'
              placeholder="What ammont you're hoping from investor?"
              inputRef={register}
              errors={errors}
            />
            <Input
              type='number'
              name='tokenPromised'
              placeholder='How many token you may want to promise?'
              inputRef={register}
              errors={errors}
            />
            <Flex justify='space-between'>
              <Button onClick={() => setOpen(false)}>Close</Button>
              <Button type='submit'>Create new agreement</Button>
            </Flex>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AgreementForm;
