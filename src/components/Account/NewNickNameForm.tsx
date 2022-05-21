import React, { useEffect } from "react";
import { useState } from "react";
import {
  Flex,
  Text,
  Button,
  Icon,
  Input,
  FormControl,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  updateDoc,
  setDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";

interface NewNickNameProps {
  onClose: any;
}

function NewNickNameForm({ onClose }: NewNickNameProps) {
  const [inputText, setInputText] = useState();
  const [docSnap, setDocSnap] = useState([]);
  const toast = useToast();
  const user = auth.currentUser;

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const userRef = doc(db, "users", user.uid);
  //     const unsub = onSnapshot(userRef, (document) => {
  //       setDocSnap(document.data());
  //     });
  //     return unsub;
  //   };
  //   fetchUser();
  // }, []);

  const handleChange = (e: any) => {
    setInputText(e.target.value);
  };

  const onChangeNickName = () => {
    if (user != null) {
      updateDoc(doc(db, "users", user?.uid), {
        username: inputText,
      })
        .then(() => {
          toast({
            title: "닉네임 변경 완료",
            description: "닉네임 변경이 성공적으로 이루어졌습니다.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onClose();
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "닉네임 변경 에러",
            description:
              "닉네임 변경 도중 에러가 발생했습니다. 재로그인해서 다시 시도하시거나 조금 있다가 시도해보십시오.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <FormControl>
      <Text mb="0.5rem">현재 닉네임</Text>
      <Text mb="1rem" fontSize="1.2rem">
        {/* {docSnap} */}
      </Text>
      <Text mb="0.5rem">새 닉네임</Text>
      <InputGroup mb="0.5rem">
        <Flex flexDir="column" w="100%">
          <Input
            onChange={handleChange}
            size="lg"
            placeholder="새 닉네임을 입력해주세요"
          />
        </Flex>
      </InputGroup>
      <Button
        onClick={onChangeNickName}
        color="black"
        bgColor="pink"
        type="submit"
        mt="3rem"
      >
        변경하기
      </Button>
    </FormControl>
  );
}

export default NewNickNameForm;
