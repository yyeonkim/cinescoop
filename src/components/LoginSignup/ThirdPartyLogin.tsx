import { Button, Circle, Flex, Image, Text } from "@chakra-ui/react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import {
  auth,
  db,
  facebookProvider,
  googleProvider,
  twitterProvider,
} from "../../../firebase";
import facebookLogo from "../../../public/facebookLogo.png";
import twitterLogo from "../../../public/twitterLogo.png";

function ThirdPartyLogin() {
  const router = useRouter();

  const saveThirdPartyUserToDb = async (
    id: string,
    username: string | null
  ) => {
    const dbUser = await getDoc(doc(db, "users", id));

    if (dbUser.exists()) {
      console.log("user already exists");
    } else {
      // username이 없을 경우 랜덤 문자 부여
      if (!username) {
        username = Math.random().toString(36).substr(2, 11);
      }

      try {
        await setDoc(doc(db, "users", id), {
          id: id,
          username: username,
          friends: [],
          movies: { watch: [], good: [], bad: [] },
          genres: {},
        });
        console.log("complete to save");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const logError = (error: any, provider: any) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = provider.credentialFromError(error);
    console.log(errorCode, errorMessage, email, credential);
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const googleUser = result.user;

        console.log("login success with Google");
        saveThirdPartyUserToDb(googleUser.uid, googleUser.displayName);
        router.push("/");
      })
      .catch((error) => {
        logError(error, GoogleAuthProvider);
      });
  };

  const loginWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const facebookUser = result.user;

        console.log("login success with Facebook");
        saveThirdPartyUserToDb(facebookUser.uid, facebookUser.displayName);
        router.push("/");
      })
      .catch((error) => {
        logError(error, FacebookAuthProvider);
      });
  };

  const loginWithTwitter = () => {
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        const twitterUser = result.user;

        console.log("login success with Twitter");
        saveThirdPartyUserToDb(twitterUser.uid, twitterUser.displayName);
        router.push("/");
      })
      .catch((error) => {
        logError(error, TwitterAuthProvider);
      });
  };

  return (
    <>
      <Text mb="1rem">&#60;SNS 계정으로 로그인하기&#62;</Text>
      <Flex justify="center" alignItems="center" gap="1rem" flexGrow="1">
        <Circle backgroundColor="white">
          <Button onClick={loginWithGoogle} p="0">
            <Image
              w="2rem"
              src="https://img.icons8.com/color/48/000000/google-logo.png"
            />
          </Button>
        </Circle>
        <Circle backgroundColor="white" h="fit-content">
          <Button onClick={loginWithFacebook} p="0">
            <Image w="2rem" src={facebookLogo.src} />
          </Button>
        </Circle>
        <Circle backgroundColor="white" h="fit-content">
          <Button onClick={loginWithTwitter} p="0">
            <Image w="2rem" src={twitterLogo.src} />
          </Button>
        </Circle>
      </Flex>
    </>
  );
}

export default ThirdPartyLogin;
