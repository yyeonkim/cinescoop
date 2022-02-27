import {
  Icon,
  useColorMode,
  useColorModeValue,
  Switch,
} from "@chakra-ui/react";
import { WiDaySunny } from "react-icons/wi";
import { MdModeNight } from "react-icons/md";

function SwitchMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  const switchColor = () => {
    toggleColorMode();
  };

  return (
    <>
      <Switch size="lg" onChange={switchColor} defaultChecked={true}>
        <Icon
          as={WiDaySunny}
          w="20px"
          h="20px"
          top="4px"
          left="2px"
          position="absolute"
          zIndex={colorMode == "dark" ? -1 : 0}
          fill="yellow"
        />
        <Icon
          as={MdModeNight}
          w="20px"
          h="20px"
          top="4px"
          left="28px"
          position="absolute"
          zIndex={-1}
          fill="yellow"
        />
      </Switch>
    </>
  );
}

export default SwitchMode;
