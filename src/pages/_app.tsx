import React from "react";
import { AppProps } from "next/app";
import { globalStyles } from "src/styles/global";
import { LoaderContextProvider } from "src/contexts/LoaderContext";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  globalStyles();

  return (
    <LoaderContextProvider>
      <Component {...pageProps} />
    </LoaderContextProvider>
  );
};

export default MyApp;
