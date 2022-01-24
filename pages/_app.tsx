import React from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

import "../src/styles.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
