import React from 'react';
import styled, { css } from 'styled-components';

export type IbGap = 'none' | 'small' | 'medium' | 'large' | 'xlarge' | 'huge';

interface Props {
  direction?: React.CSSProperties['flexDirection'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  nowrap?: boolean;
  gap?: IbGap;
}

export const Flex = styled.div<Props>`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  flex-wrap: ${props => (props.nowrap ? 'no-wrap' : 'wrap')};
  & > *:not(:last-child) {
    ${({ gap, direction }) =>
      gap
        ? direction === 'column'
          ? css`
              margin-bottom: ${p => p.theme.space[gap]}px;
            `
          : css`
              margin-right: ${p => p.theme.space[gap]}px;
            `
        : null}
  }
`;

export default Flex;
