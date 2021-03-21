import React from 'react';
import ErrorImg from 'assets/svg/Error.svg';
import styled from 'styled-components';

interface ErrorCatchState {
  hasError: boolean;
}

const ErrorWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-size: 34px;
  }
  img {
    margin: 20px;
    max-width: 400px;
  }
`;

class ErrorCatch extends React.Component<{}, ErrorCatchState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorWrapper>
          <span className='text--center text--error'>Opps! Some Error Occurred</span>
          <img src={ErrorImg} alt='error' />
        </ErrorWrapper>
      );
    }

    return this.props.children;
  }
}

export default ErrorCatch;
