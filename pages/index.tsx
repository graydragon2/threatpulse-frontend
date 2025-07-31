// pages/index.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function SplashScreen() {
  const router = useRouter();
  const [showSecondStage, setShowSecondStage] = useState(false);

  useEffect(() => {
    const stageTimer = setTimeout(() => {
      setShowSecondStage(true);
    }, 2500);

    const redirectTimer = setTimeout(() => {
      router.push('/dashboard');
    }, 5000);

    return () => {
      clearTimeout(stageTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <Head>
        <title>ThreatPulse</title>
      </Head>

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5 }}
        className="relative text-center"
      >
        <h1 className="text-5xl font-bold tracking-widest z-10 relative">ThreatPulse</h1>
        <p className="mt-2 text-gray-400 z-10 relative">Securing Intelligence, Silently</p>

        {/* Glowing Pulse Ring */}
        {showSecondStage && (
          <motion.div
            className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full border-4 border-blue-500 opacity-60"
            style={{ transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </motion.div>
    </div>
  );
}

