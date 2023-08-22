import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import LoadingAnimation from '../components/Displays/Loading';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'; // Import useState

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Initialize a loading state

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);
    const handleRouteChangeError = () => setLoading(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    // Clean up event listeners
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, []);

  return (
    <>
      {/* Show loading animation based on the loading state */}
      {loading && <LoadingAnimation />}

      {/* Render the main content */}
      <Component {...pageProps} />
      <NextNProgress />
    </>
  );
}

export default MyApp;
