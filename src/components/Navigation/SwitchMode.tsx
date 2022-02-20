import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Icon,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { WiDaySunny } from "react-icons/wi";
import { MdModeNight } from "react-icons/md";
import styled from "styled-components";

function SwitchMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("darkBlue", "white");
  const ballColor = useColorModeValue("white", "darkBlue");
  const switchColor = () => {
    toggleColorMode();
    // colorMode === "light"
      // this.setState(() => ({ transform: translateX(24px);}
  }

  return (
    // <Box
    //   w="3.5rem"
    //   //   minW="50px"
    //   h="100%"
    //   backgroundColor="darkblue"
    //   borderRadius="5rem"
    //   p="0.15rem"
    // >
    //   <Box
    //     backgroundColor="white"
    //     w="1.1rem"
    //     h="1.1rem"
    //     borderRadius="5rem"
    //     transform="5.7rem"
    //   />
    // </Box>
    <Flex>
      <Button
        onClick={toggleColorMode}
        variant="outline"
        size="md"
        borderRadius="50px"
        height="26px"
        width="50px"
        _focus={{ outline: "none" }}
        _hover={{ borderColor: "pink" }}
        display="flex"
        justifyItems="flex-start"
        alignItems="flex-start"
        backgroundColor={bgColor}
      >
        <Box
          position="absolute"
          top="2px"
          left="2px"
          width="22px"
          height="22px"
          borderRadius="50%"
          backgroundColor={ballColor}
          transition="transform 0.2s linear"
        />
      </Button>
    </Flex>
    // <Switch>
    // <Flex
    //   backgroundColor="darkblue"
    //   borderRadius="50px"
    //   height="26px"
    //   width="50px"
    //   justifyContent="space-between"
    //   alignItems="center"
    //   position="relative"
    //   zIndex={0}
    // >
    //   <Button
    //     position="absolute"
    //     width="22px"
    //     height="22px"
    //     borderRadius="50%"
    //     backgroundColor="white"
    //   />
    //<Icon className="moon" as={MdModeNight}/>
    // <Icon className="sun" as={WiDaySunny}/>
    // { <Box className="ball" position="absolute" zIndex={3}/>
    // {/* </Flex> */}
    // {/* // </Switch> */}
  );
}

export default SwitchMode;

const Switch = styled.div`
  .label {
    background-color: darkblue;
    display: flex;
    border-radius: 50px;
    height: 26px;
    width: 50px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 0;
  }

  .moon {
    color: #f1c40f;
  }
  .sun {
    color: #f39c12;
  }

  .ball {
    width: 22px;
    height: 22px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    left: 2px;
    top: 2px;
    transition: transform 0.2s linear;
  }

  .checkbox:checked + .ball {
    transform: translateX(24px);
  }
`;
