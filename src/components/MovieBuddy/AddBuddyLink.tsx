import {
  Input,
  InputGroup,
  InputRightAddon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { auth } from "../../../firebase";
import { BsCheckAll } from "react-icons/bs";

function AddBuddyLink() {
  const initialFocusRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef();
  const currTime = new Date().getTime();
  const user = auth.currentUser;
  const [copied, setCopied] = useState(false);

  const createLink = () => {
    return `http://localhost:3000/addbuddy/${user?.uid}/${currTime}`;
  };

  const copyLink = async () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
    await navigator.clipboard.writeText(createLink());
  };

  console.log(currTime);

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Text>버디 추가 링크&gt;</Text>
      </PopoverTrigger>
      <PopoverContent color="darkBlue" bg="white" w="30rem">
        <PopoverHeader fontWeight="bold" border="0">
          무비버디 추가 링크
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <InputGroup variant="outline" borderColor="lightBlue">
            <Input
              value={createLink()}
              ref={linkRef}
              _placeholder={{ color: "black" }}
            />
            <InputRightAddon bgColor="lightBlue" p="0" w="4rem" align="center">
              <Button onClick={copyLink} _focus={{ border: "none" }} w="100%">
                {copied ? (
                  <Icon as={BsCheckAll} />
                ) : (
                  <Text fontWeight="bold">복사</Text>
                )}
              </Button>
            </InputRightAddon>
          </InputGroup>
          <Text fontSize="0.8rem" fontStyle="italic" mt="0.5rem">
            *위 링크를 무비버디하고자 하는 분에게 공유하십시오. 해당 링크는 지금
            시점으로부터 하루동안만 유효합니다.
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default AddBuddyLink;
