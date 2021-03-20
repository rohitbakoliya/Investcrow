import React, { CSSProperties } from 'react';
import LogoImg from 'assets/svg/logo.svg';

const AppLogo: React.FC<{ width?: CSSProperties['width'] }> = ({ width }) => (
  <img src={LogoImg} className='logo' alt='App logo' width={width} />
);

export default AppLogo;
