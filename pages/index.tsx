// pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        <title>ThreatPulse</title>
      </Head>
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5 }}
          className="text-center"
        >
          <h1 className="text-4xl text-white font-bold">⚡ ThreatPulse</h1>
          <p className="text-gray-400 mt-2">Monitoring critical threat data...</p>
        </motion.div>
      </div>
    </>
  );
}
