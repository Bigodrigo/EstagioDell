
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import { ContextProvider } from "../components/context/Context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </ContextProvider>
  );
}

export default MyApp;