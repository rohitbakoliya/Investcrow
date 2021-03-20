import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import CircleIcon from './CircleIcon';

const INavLink = styled(NavLink)<NavLinkProps>`
  .start--icon {
    margin-right: 10px;
    transition: 0.2s;
  }
  display: flex;
  align-items: center;
  svg.fa-arrow-right {
    transition: 0.3s;
  }

  &:hover {
    svg.fa-arrow-right {
      transform: translateX(5px);
      transition: 0.3s;
    }
  }
`;

interface Props extends NavLinkProps {
  startIcon?: IconProp;
  endIcon?: IconProp;
  circleIcon?: boolean;
}

export const IconLink: React.FC<Props> = ({
  startIcon,
  endIcon,
  children,
  circleIcon,
  ...rest
}) => {
  if (circleIcon) {
    return (
      <INavLink {...rest}>
        {startIcon && <CircleIcon className='start--icon' size='28px' icon={startIcon} />}
        {children}
        {endIcon && <CircleIcon icon={endIcon} />}
      </INavLink>
    );
  }
  return (
    <INavLink {...rest}>
      {startIcon && <FontAwesomeIcon className='start--icon' icon={startIcon} />}
      {children}
      {endIcon && <FontAwesomeIcon icon={endIcon} />}
    </INavLink>
  );
};
export default IconLink;
