declare module 'react-native-parallax-scroll' {
  import { ReactNode } from 'react';
  import { ViewStyle } from 'react-native';

  interface ParallaxScrollProps {
    headerBackgroundColor?: {
      light: string;
      dark: string;
    };
    headerImage?: ReactNode;
    children: ReactNode;
    style?: ViewStyle;
  }

  export default function ParallaxScroll(props: ParallaxScrollProps): JSX.Element;
}