// pages/index.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function SplashScreen() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      router.push('/dashboard'); // Redirect to dashboard
    }, 4000); // Splash duration

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Ripple Rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-500 opacity-20 blur-3xl"
          style={{ width: 200, height: 200, zIndex: 0 }}
          animate={{
            scale: [1, 3],
            opacity: [0.3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Text Content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold">ThreatPulse</h1>
        <p className="text-sm mt-2 text-gray-300">Securing Intelligence, Silently</p>
      </motion.div>
    </div>
  );
}

// Hide sidebar on splash page
SplashScreen.hideSidebar = true;
