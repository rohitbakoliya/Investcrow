import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '@ico-ui/Form';
import { Button } from '@ico-ui';
import web3 from 'config/web3';
import MainContract from 'config/MainContract';
import styled from 'styled-components';

const TokenSchema = yup.object().shape({
  tokenName: yup.string().required().trim(), //Bitcoin
  symbol: yup.string().required().trim(), //BTC
  noOfTokens: yup.string().required().trim(), //1000000000
});

interface Token {
  tokenName: string;
  symbol: string;
  noOfTokens: number;
}

const FormWrapper = styled.div`
  h1,
  p {
    text-align: center;
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

interface Props {
  tokenCreated: () => void;
}

const CreateTokenForm: React.FC<Props> = ({ tokenCreated }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm<Token>({
    mode: 'onChange',
    resolver: yupResolver(TokenSchema),
  });

  const createToken = async (token: Token) => {
    const accounts = await web3.eth.getAccounts();
    try {
      await MainContract.methods.createToken(token.tokenName, token.symbol, token.noOfTokens).send({
        from: accounts[0],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data: Token) => {
    setLoading(true);
    await createToken(data);
    setLoading(false);
    tokenCreated();
  };
  return (
    <FormWrapper>
      <h1 className='text--bold'>It seems your havn't created any token</h1>
      <p>Please create a token first</p>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type='text' name='symbol' placeholder='Symbol' inputRef={register} errors={errors} />
        <Input
          type='text'
          name='tokenName'
          placeholder='Token Name'
          inputRef={register}
          errors={errors}
        />
        <Input
          type='number'
          name='noOfTokens'
          placeholder='Number of Tokens'
          inputRef={register}
          errors={errors}
        />
        <Button isLoading={loading} icon='arrow-right' type='submit'>
          Create New Token
        </Button>
      </form>
    </FormWrapper>
  );
};

export default CreateTokenForm;
