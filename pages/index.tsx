// pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3000); // 3-second delay

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to ThreatPulse</h1>
      <p className="text-lg text-gray-300">Your AI-Powered Threat Intelligence Dashboard</p>
      <span className="mt-6 text-sm text-gray-500">Redirecting to dashboard...</span>
    </div>
  );
}
