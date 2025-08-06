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
    }, 7000); // longer splash

    return () => {
      clearTimeout(stageTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  const rippleColors = [
    'rgba(59, 130, 246, 0.4)', // light blue
    'rgba(37, 99, 235, 0.35)', // medium blue
    'rgba(29, 78, 216, 0.3)',  // deep blue
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white overflow-hidden relative">
      <Head>
        <title>ThreatPulse</title>
      </Head>

      {/* Multi-shade ripple rings */}
      {showRipples &&
        rippleColors.map((color, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full blur-2xl pointer-events-none"
            style={{
              backgroundColor: color,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{
              duration: 6,       // longer cycle
              repeat: Infinity,  // keeps looping
              ease: 'easeOut',
              delay: i * 2,      // stagger start so all appear early
            }}
          />
        ))}

      {/* Main text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5 }}
        className="relative text-center z-10"
      >
        <h1 className="text-5xl font-bold tracking-widest drop-shadow-lg">
          ThreatPulse
        </h1>
        <p className="mt-2 text-gray-400">Securing Intelligence, Silently</p>
      </motion.div>
    </div>
  );
}
