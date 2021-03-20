import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

interface Props {
  handleSidebar?: () => void;
  isOpen: boolean;
}
const NavbarWrapper = styled.nav`
  width: 100%;
  padding: 10px 25px;
  position: fixed;
  user-select: none;
  background-color: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.white};
  z-index: 2;
  svg {
    transition: 0.1s;
  }
  @media screen and (${p => p.theme.media.minTablet}) {
    display: none;
  }
`;

const Navbar: React.FC<Props> = ({ handleSidebar, isOpen }) => {
  return (
    <NavbarWrapper>
      <FontAwesomeIcon
        className='hamburger--icon'
        icon={isOpen ? 'times' : 'bars'}
        onClick={handleSidebar}
        size='2x'
      />
    </NavbarWrapper>
  );
};
export default Navbar;
