/* eslint-disable @next/next/inline-script-id */
import "../styles/globals.css";
import Script from "next/script";
import { StoreContextProvider } from "../components/StoreContext";
import { Provider } from "react-redux";
import { useEffect } from "react";
import AOS from "aos";
/* import ReactGA from "react-ga";
const TRACKING_ID = "UA-XXXXX-X"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID); */

import "aos/dist/aos.css";
import store from "../src/store";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-N2YH78K6PR`}
      />

      <Script strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-N2YH78K6PR', {
        page_path: window.location.pathname,
        });
    `}
      </Script>

      <StoreContextProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </StoreContextProvider>
    </>
  );
}

export default MyApp;
