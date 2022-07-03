import { extendTheme, ThemeConfig } from "@chakra-ui/react";

import { styles } from "./styles";

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const customTheme = extendTheme({
  config,
  styles,
  fonts: {
    body: "Noto Sans Korean",
    heading: "Noto Sans Korean",
  },
  colors: {
    pink: "#FF5AF1",
    lightPink: "#f7cbf4",
    darkBlue: "#0E0A48",
    blue: "#242089",
    brightBlue: "#3843CD",
    lightBlue: "#b5baff",
    lightPurple: "#867aa0",
    white: "#FFFFFF",
    grey: "#C4C4C4",
    darkGrey: "#A9A9A",
    yellow: "#FFE800",
  },
});

export default customTheme;
