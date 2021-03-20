// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as styled from 'styled-components';

// extending default theme interface
declare module 'styled-components' {
  interface DefaultTheme {
    variants: {
      primary: CSSProp;
      secondary: CSSProp;
      warning: CSSProp;
      danger: CSSProp;
      success: CSSProp;
    };
    colors: {
      primary: string;
      secondary: string;
      light: string;
      accent: string;
      offwhite: string;
      white: string;
      black: string;
      gray: string;
      green: string;
      greenlight: string;
      yellow: string;
      yellowlight: string;
      red: string;
      redlight: string;
      cardBg: string;
    };
    font: {
      primary: string;
      primaryBold: string;
      primaryItalic: string;
      primaryMedium: string;
      primaryLight: string;
    };
    shadows: {
      xsmall: string;
      small: string;
      medium: string;
    };
    space: {
      none: number;
      small: number;
      medium: number;
      large: number;
      xlarge: number;
      huge: number;
    };
    border: string;
    spacings: {
      top: number;
      bottom: number;
      left: number;
      right: number;
      my: string;
      mx: string;
    };
    media: {
      mobileS: string;
      mobile: string;
      tablet: string;
      minTablet: string;
      desktop: string;
      desktopL: string;
    };
  }
}
