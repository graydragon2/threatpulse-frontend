// pages/index.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function SplashScreen() {
  const router = useRouter();
  const [showSecondStage, setShowSecondStage] = useState(false);

  useEffect(() => {
    // Show second stage after first animation
    const stageTimer = setTimeout(() => {
      setShowSecondStage(true);
    }, 2500); // first stage duration

    // Redirect after second stage
    const redirectTimer = setTimeout(() => {
      router.push('/dashboard');
    }, 5000); // total duration

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
        className="text-center"
      >
        <h1 className="text-5xl font-bold tracking-widest">ThreatPulse</h1>
        <p className="mt-2 text-gray-400">Securing Intelligence, Silently</p>
      </motion.div>

      {showSecondStage && (
        <motion.div
          className="mt-8 flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Bouncing Dots Animation */}
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
