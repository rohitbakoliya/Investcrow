import styled, { CSSProperties } from 'styled-components';

interface IAvatarContainerProps {
  size?: CSSProperties['width'];
  indicateError?: boolean;
}

const AvatarContainer = styled.div<IAvatarContainerProps>`
  position: relative;
  width: ${p => p.size || '130px'};
  height: ${p => p.size || '130px'};
  border: ${p => (p.indicateError ? `1px solid ${p.theme.colors.red}` : p.theme.border)};
  outline: none;
  border-radius: 50%;
  overflow: hidden;
  .dropzone {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 50%;
    background-color: rgba(88, 111, 253, 0.9);
    color: ${p => p.theme.colors.white};
    opacity: 0;
    outline: none;
    border: none;
    transform: scale(0.85);
    transition: 0.2s;
    cursor: pointer;

    p {
      margin: auto;
    }
    &:hover {
      transform: scaleY(1);
      opacity: 1;
    }
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
export const AvatarUploaderWrapper = styled.section`
  width: 100%;
  .text--error {
    font-size: 12px;
    margin-top: 5px;
    transition: 0.3s;
    text-align: center;
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
export default AvatarContainer;
