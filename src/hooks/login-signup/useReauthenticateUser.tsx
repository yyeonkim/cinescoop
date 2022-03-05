import {
  EmailAuthProvider,
  OAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from "firebase/auth";

function useReauthenticateUser(
  authUser: any,
  user: any,
  password: string,
  setVerified: React.Dispatch<React.SetStateAction<boolean>>,
  errorToast: any
) {
  const reauthenticate = () => {
    if (user.thirdParty) {
      reauthenticateWithPopup(authUser, new OAuthProvider(user.loginMethod))
        .then(() => setVerified(true))
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
    } else {
      const credentials = EmailAuthProvider.credential(user.email, password);
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

  return { reauthenticate };
}

export default useReauthenticateUser;
