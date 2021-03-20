import React from 'react';
// import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components/macro';
import { VariantType } from '@ico-ui';
import Flex from './Flex';

interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantType;
  size?: 'small' | 'medium';
  width?: React.CSSProperties['width'];
}

//* https://github.com/FortAwesome/Font-Awesome/issues/14774#issuecomment-482662084
interface Props extends StyledButtonProps {
  icon?: any;
  isLoading?: boolean;
}

const buttonSizes = {
  small: css`
    padding: 8px 10px;
    font-size: 12px;
  `,
  medium: css`
    padding: 10px 15px;
    font-size: 12px;
  `,
};

interface PropswithDefault {
  variant: VariantType;
  size?: 'small' | 'medium';
  width?: React.CSSProperties['width'];
}

const StyledButton = styled.button<PropswithDefault>`
  border: none;
  outline: none;
  cursor: pointer;
  margin: 10px 0;
  padding: 10px 15px;
  border-radius: 50px;
  line-height: 1;
  font-size: 14px;
  transition: 0.2s;
  height: fit-content;

  width: ${p => p.width};
  ${p => p.theme.variants[p.variant]}
  ${p => (buttonSizes as any)[p.size as string]}

  &:hover {
    transform: scale(1.02);
    transition: 0.2s;
  }

  &:disabled {
    opacity: 0.8;
  }

  @media screen and (${p => p.theme.media.mobile}) {
    padding: 10px 25px;
  }
`;

export const Button: React.FC<Props> = ({
  variant = 'primary',
  width,
  size,
  icon,
  isLoading = false,
  children,
  ...rest
}) => (
  <StyledButton variant={variant} size={size} disabled={isLoading} width={width} {...rest}>
    {icon && <FontAwesomeIcon spin={isLoading} icon={isLoading ? 'spinner' : icon} />}
    {children}
  </StyledButton>
);
export default Button;

const ButtonGroupFloat: any = {
  left: `margin-right: auto;`,
  right: `margin-left: auto;`,
};
export const ButtonGroup = styled(Flex)<{ float?: string }>`
  width: fit-content;

  ${p => ButtonGroupFloat[p.float || 'right']}
`;
