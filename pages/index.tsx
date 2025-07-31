// pages/index.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function SplashScreen() {
  const router = useRouter();
  const [showRipples, setShowRipples] = useState(false);

  useEffect(() => {
    const stageTimer = setTimeout(() => {
      setShowRipples(true);
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white overflow-hidden relative">
      <Head>
        <title>ThreatPulse</title>
      </Head>

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5 }}
        className="relative text-center z-10"
      >
        <h1 className="text-5xl font-bold tracking-widest relative z-20">ThreatPulse</h1>
        <p className="mt-2 text-gray-400 z-20">Securing Intelligence, Silently</p>

        {/* Blurred Ripple Glow Rings */}
        {showRipples && (
          <>
            {[0, 1.5, 3].map((delay, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-blue-500 opacity-30 blur-2xl pointer-events-none"
                style={{ transform: 'translate(-50%, -50%)' }}
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 0,
                  ease: 'easeOut',
                  delay,
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </div>
  );
}
