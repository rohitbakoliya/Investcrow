import styled from 'styled-components';
import { Flex } from '@ico-ui';

const HomeWrapper = styled(Flex)`
  min-height: 100vh;
  .home__left {
    flex-basis: 450px;
    padding-top: 200px;
    background-color: ${p => p.theme.colors.primary};
    /* background-image: radial-gradient(circle at 0% 0%, #373b52, #252736 51%, #1d1e26); */
    color: ${p => p.theme.colors.white};
    .home__text {
      margin-left: 80px;
      z-index: 1;
    }
  }
  .app--logo {
    margin-bottom: 20px;
    font-size: 44px;
  }
  .home__right {
    flex: 1;
  }
  @media screen and (${p => p.theme.media.tablet}) {
    flex-direction: column;
    .home__left {
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
