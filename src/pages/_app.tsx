import { AppProps } from 'next/dist/next-server/lib/router/router';

import { LocalizationProvider } from '@contexts/Localization';
import { AppContextProvider } from '@contexts/app';

import '@styles/css/fonts.css';
import 'tailwindcss/tailwind.css';
import '@styles/css/algolia.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <LocalizationProvider>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </LocalizationProvider>
  );
};

export default MyApp;
