import { ErrorMessage } from '@hookform/error-message';
import styled from 'styled-components';
import React from 'react';

interface Props {
  errors?: any;
  name?: string;
}

const ErrorTextWrapper = styled.div`
  margin-bottom: 10px;
  width: 100%;
  .text--error {
    font-size: 12px;
    margin-top: 5px;
    margin-left: 16px;
    transition: 0.3s;
    transform: translateY(-20px);
    opacity: 0;

    &:before {
      content: '* ';
    }
  }
  .show-error {
    transform: translateY(0);
    opacity: 1;
    transition: 0.3s;
  }
`;

const ErrorText: React.FC<Props> = ({ errors, name }) => {
  return (
    <ErrorTextWrapper>
      {errors && (
        <div className={`text--error ${errors[name as string] && 'show-error'}`}>
          <ErrorMessage name={name as string} errors={errors} />
        </div>
      )}
    </ErrorTextWrapper>
  );
};

export default ErrorText;
