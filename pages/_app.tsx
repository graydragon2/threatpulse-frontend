import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import TopBar from '@/components/TopBar'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <>
      <TopBar />
      <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white p-4">
        <Component {...pageProps} />
      </main>
    </>
  );
}
