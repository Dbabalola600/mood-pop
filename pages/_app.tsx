import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';
import LoadingAnimation from '../components/Displays/Loading';
import { useRouter } from 'next/router';
import { useEffect } from 'react';



function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();


  useEffect(() => {
    router.events.on('routeChangeStart', () =>

      <LoadingAnimation />

    );

    router.events.on('routeChangeComplete', () =>

      <LoadingAnimation />

    );
    router.events.on('routeChangeError', () =>

      <LoadingAnimation />

    );
  }, []);


  return <Component {...pageProps} />
}

export default MyApp
