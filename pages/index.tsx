// pages/index.tsx (Splash screen with redirect to /dashboard)

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to ThreatPulse</h1>
        <p className="text-lg">Intelligent Threat Monitoring</p>
      </div>
    </div>
  );
}
