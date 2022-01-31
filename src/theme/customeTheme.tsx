import { extendTheme, ThemeConfig } from "@chakra-ui/react";

import { styles } from "./styles";

const config: ThemeConfig = {
  useSystemColorMode: false, 
  initialColorMode: "dark",
}

const customTheme = extendTheme({
  config, 
  styles,
  colors: {
    pink: "#FF5AF1",
    darkBlue: "#0E0A48",
    brightBlue: "#3843CD",
    white: "#FFFFFF",
    grey: "#C4C4C4",
    darkGrey: "#A9A9A",
    yellow: "#FFE800",
  },
});

export default customTheme;
