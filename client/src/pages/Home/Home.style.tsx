import styled from 'styled-components';
import { Flex } from '@ico-ui';

const HomeWrapper = styled(Flex)`
  position: relative;
  .home__left {
    min-height: 100vh;
    flex-basis: 450px;
    position: relative;
    top: 0;
    bottom: 0;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.white};
    .home__text {
      margin-left: -50px;
      z-index: 1;
    }
  }
  h1 {
    font-size: 2rem;
  }
  .home__right {
    flex: 1;
  }
  @media screen and (${p => p.theme.media.tablet}) {
    flex-direction: column;
    .home__left {
      min-height: 45vh;
      flex-basis: 45vh;
    }
  }
  .home__shape {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    z-index: 1;
  }
`;
export default HomeWrapper;
