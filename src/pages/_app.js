import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          A L P H A - S Y S T E M
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthConsumer>
            {
              (auth) => Component.public || !auth.isLoading
                ? getLayout(<Component {...pageProps} />)
                : <SplashScreen />
            }
          </AuthConsumer>
        </ThemeProvider>
      </AuthProvider>
    </CacheProvider>
  );
};

export default App;
