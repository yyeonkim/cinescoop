import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  EmailAuthProvider,
  getAuth,
  OAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillCheckCircle,
} from "react-icons/ai";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../../atom";
import { IPasswordForm } from "../../interfaces";
import { reauthenticateSchema } from "../../schema";
import ErrorMessage from "./ErrorMessage";

interface ReauthenticateFormProps {
  verified: boolean;
  setVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReauthenticateForm({
  verified,
  setVerified,
}: ReauthenticateFormProps) {
  const errorToast = useToast();
  const [show, setShow] = useState(false);
  const user = useRecoilValue(userState);
  const auth = getAuth();
  const authUser = auth.currentUser;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IPasswordForm>({
    resolver: yupResolver(reauthenticateSchema),
  });

  const clickShow = () => setShow(!show);

  const onVerifySubmit: SubmitHandler<IPasswordForm> = () => {
    if (user.thirdParty && authUser != null) {
      reauthenticateWithPopup(authUser, new OAuthProvider(user.loginMethod))
        .then(() => setVerified(true))
        .catch((error) => {
          console.log({ error });
          errorToast({
            title: "인증 실패",
            description:
              "입력하신 비밀번호가 현재 비밀번호와 일치하지 않습니다.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    } else {
      const credentials = EmailAuthProvider.credential(
        user.email,
        getValues("password")
      );
      authUser &&
        reauthenticateWithCredential(authUser, credentials)
          .then(() => {
            setVerified(true);
          })
          .catch((error) => {
            console.log({ error });
            errorToast({
              title: "인증 실패",
              description:
                "입력하신 비밀번호가 현재 비밀번호와 일치하지 않습니다.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          });
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onVerifySubmit)}>
      {user.thirdParty ? (
        <Flex mb="1rem">
          <Text flexGrow={1} m="0">
            비밀번호 인증
          </Text>
          {verified ? (
            <Button
              leftIcon={<AiFillCheckCircle />}
              isDisabled={true}
              size="lg"
              backgroundColor="brightBlue"
              _disabled={{ backgroundColor: "brightBlue" }}
              _hover={{ backgroundColor: "brightBlue" }}
            >
              인증완료
            </Button>
          ) : (
            <Button type="submit" size="lg">
              인증하기
            </Button>
          )}
        </Flex>
      ) : (
        <Flex flexDir="column" mb="2rem">
          <Text mr="3rem" mb="0.5rem">
            비밀번호 인증
          </Text>
          <Flex>
            <InputGroup>
              <Input
                {...register("password")}
                type={show ? "text" : "password"}
                size="lg"
                placeholder="비밀번호를 입력해주세요"
              />
              <InputRightElement width="3rem">
                {show ? (
                  <Icon boxSize="1.5rem" as={AiFillEye} onClick={clickShow} />
                ) : (
                  <Icon
                    boxSize="1.5rem"
                    as={AiFillEyeInvisible}
                    onClick={clickShow}
                  />
                )}
              </InputRightElement>
            </InputGroup>
            {verified ? (
              <Button
                leftIcon={<AiFillCheckCircle />}
                isDisabled={true}
                size="lg"
                ml="1rem"
                backgroundColor="brightBlue"
                _disabled={{ backgroundColor: "brightBlue" }}
                _hover={{ backgroundColor: "brightBlue" }}
              >
                인증완료
              </Button>
            ) : (
              <Button type="submit" size="lg" ml="1rem">
                인증하기
              </Button>
            )}
          </Flex>
          <ErrorMessage message={errors?.password?.message} />
        </Flex>
      )}
    </StyledForm>
  );
}

export default ReauthenticateForm;

const StyledForm = styled.form`
  width: 100%;
`;
