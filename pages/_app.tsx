import React from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import "@fontsource/nanum-gothic";
import "@fontsource/nanum-gothic/700.css";

import "../src/styles.css";
import customTheme from "../src/theme/customeTheme";
import Layout from "../src/components/Layout/Layout";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={customTheme}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
function firebaseConfig(firebaseConfig: any) {
  throw new Error("Function not implemented.");
}
