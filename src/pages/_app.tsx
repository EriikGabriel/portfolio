import React from "react";
import { AppProps } from "next/app";
import { globalStyles } from "src/styles/global";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  globalStyles();

  return <Component {...pageProps} />;
};

export default MyApp;
