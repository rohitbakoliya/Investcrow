import { css } from 'styled-components';

export type VariantType = 'primary' | 'success' | 'warning' | 'danger' | 'secondary';

const primary = css`
  color: ${p => p.theme.colors.accent};
  background-color: ${p => p.theme.colors.primary};
`;

const success = css`
  color: ${p => p.theme.colors.green};
  background-color: ${p => p.theme.colors.greenlight};
`;

const warning = css`
  color: ${p => p.theme.colors.yellow};
  background-color: ${p => p.theme.colors.yellowlight};
`;

const danger = css`
  color: ${p => p.theme.colors.red};
  background-color: ${p => p.theme.colors.redlight};
`;

const secondary = css`
  color: ${p => p.theme.colors.secondary};
  background-color: ${p => p.theme.colors.accent};
`;

export const colorVariants: any = {
  primary,
  success,
  warning,
  danger,
  secondary,
};
export default colorVariants;
