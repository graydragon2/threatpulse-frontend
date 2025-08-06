// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Small delay so transition is noticeable
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 1 }}
    >
      <Head>
        <title>Dashboard | ThreatPulse</title>
      </Head>

      <h1 className="text-3xl font-bold mb-4">ThreatPulse Dashboard</h1>
      <p className="text-gray-400">Welcome to your dashboard. Real-time threat data will appear here.</p>
      
      {/* Example placeholder content */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Threat Summary</h2>
          <p className="text-gray-400">High: 0 | Medium: 0 | Low: 0</p>
        </div>
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          <p className="text-gray-400">No new threats detected.</p>
        </div>
      </div>
    </motion.div>
  );
}
