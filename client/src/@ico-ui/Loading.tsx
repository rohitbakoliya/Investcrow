import React from 'react';
import styled from 'styled-components';

interface Props {
  varient: 'primary' | 'secondary';
}

const PrimaryLoaderWrapper = styled.div`
  .spinner- {
    width: 40px;
    height: 40px;
    position: relative;
    animation: spinner- 2.5s infinite linear both;
  }

  .spinner--dot {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: spinner--dot 2s infinite ease-in-out both;
  }

  .spinner--dot:before {
    content: '';
    display: block;
    width: 25%;
    height: 25%;
    background-color: ${p => p.theme.colors.primary};
    border-radius: 100%;
    animation: spinner--dot-before 2s infinite ease-in-out both;
  }

  .spinner--dot:nth-child(1) {
    animation-delay: -1.1s;
  }
  .spinner--dot:nth-child(2) {
    animation-delay: -1s;
  }
  .spinner--dot:nth-child(3) {
    animation-delay: -0.9s;
  }
  .spinner--dot:nth-child(4) {
    animation-delay: -0.8s;
  }
  .spinner--dot:nth-child(5) {
    animation-delay: -0.7s;
  }
  .spinner--dot:nth-child(6) {
    animation-delay: -0.6s;
  }
  .spinner--dot:nth-child(1):before {
    animation-delay: -1.1s;
  }
  .spinner--dot:nth-child(2):before {
    animation-delay: -1s;
  }
  .spinner--dot:nth-child(3):before {
    animation-delay: -0.9s;
  }
  .spinner--dot:nth-child(4):before {
    animation-delay: -0.8s;
  }
  .spinner--dot:nth-child(5):before {
    animation-delay: -0.7s;
  }
  .spinner--dot:nth-child(6):before {
    animation-delay: -0.6s;
  }

  @keyframes spinner- {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spinner--dot {
    80%,
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spinner--dot-before {
    50% {
      transform: scale(0.4);
    }
    100%,
    0% {
      transform: scale(1);
    }
  }
`;

const PrimaryLoader: React.FC = () => (
  <PrimaryLoaderWrapper>
    <div className='spinner-'>
      <div className='spinner--dot'></div>
      <div className='spinner--dot'></div>
      <div className='spinner--dot'></div>
      <div className='spinner--dot'></div>
      <div className='spinner--dot'></div>
      <div className='spinner--dot'></div>
    </div>
  </PrimaryLoaderWrapper>
);

const SecondaryLoaderWrapper = styled.div`
  .half-circle-spinner,
  .half-circle-spinner * {
    box-sizing: border-box;
  }

  .half-circle-spinner {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    position: relative;
  }

  .half-circle-spinner .circle {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: calc(60px / 10) solid transparent;
  }

  .half-circle-spinner .circle.circle-1 {
    border-top-color: ${p => p.theme.colors.primary};
    animation: half-circle-spinner-animation 1s infinite;
  }

  .half-circle-spinner .circle.circle-2 {
    border-bottom-color: ${p => p.theme.colors.primary};
    animation: half-circle-spinner-animation 1s infinite alternate;
  }

  @keyframes half-circle-spinner-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const SecondaryLoader: React.FC = () => (
  <SecondaryLoaderWrapper>
    <div className='half-circle-spinner'>
      <div className='circle circle-1'></div>
      <div className='circle circle-2'></div>
    </div>
  </SecondaryLoaderWrapper>
);

const Loading: React.FC<Props> = ({ varient = 'primary' }) => {
  if (varient === 'primary') {
    return <PrimaryLoader />;
  }
  return <SecondaryLoader />;
};

export default Loading;
