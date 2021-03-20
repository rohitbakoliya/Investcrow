import styled from 'styled-components';

export const RequestFormWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 10px;
  h3,
  h2,
  p {
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    padding-bottom: 40px;
  }
  @media screen and (${p => p.theme.media.tablet}) {
    margin-top: ${p => p.theme.spacings.top}px;
    padding: 0 20px;
    margin-bottom: ${p => p.theme.spacings.bottom}px;
  }
`;
