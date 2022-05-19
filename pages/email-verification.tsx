import { Button, Heading, Text } from "@chakra-ui/react";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { auth } from "../firebase";

const Verification: NextPage = () => {
  const router = useRouter();

  const user = auth.currentUser;

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      // 메일이 인증됐으면
      if (user?.emailVerified) {
        alert("인증되었습니다.");
        router.push("/");
      }
    });
  }, []);

  const resendEmail = () => {
    sendEmailVerification(user as any)
      .then(() => {
        alert("메일을 전송했습니다.");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const completeJoin = () => {
    location.reload(); // 페이지를 새로고침해서 메일 인증을 user에 반영
  };

  return (
    <>
      <Heading>이메일 인증</Heading>
      <Text>메일을 보냈습니다. 메일을 인증하고 '확인'을 눌러주세요.</Text>
      <Text>(확인을 눌러도 변화가 없다면 다시 인증해주세요)</Text>
      <Button onClick={resendEmail}>메일 재전송</Button>
      <Button onClick={completeJoin}>확인</Button>{" "}
    </>
  );
};

export default Verification;
