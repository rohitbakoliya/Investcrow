import styled from 'styled-components';

const LoginWrapper = styled.div`
  padding: 30px 0;
  height: 100%;
  display: flex;
  justify-content: center;
  h2 {
    margin-bottom: ${p => p.theme.spacings.my};
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    .util--links {
      width: 100%;
      text-align: right;
      a {
        font-size: 14px;
      }
    }
    .MuiTypography-root {
      font-size: 14px !important;
      font-family: ${p => p.theme.font.primary};
    }
  }

  a.link-sm {
    font-size: 14px;
    margin: 30px 5px 0 5px;
    text-align: center;
  }
`;

export default LoginWrapper;
