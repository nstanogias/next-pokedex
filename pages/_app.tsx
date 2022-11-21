import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

export const fetcher = async (url: string) => fetch(url).then((res) => res.json());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className='flex flex-col w-full max-w-[1440px] px-8 md:px-[100px] mx-auto my-14'>
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
