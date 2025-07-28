import { useEffect, useState } from 'react';

export default function ThreatDashboard() {
  const [apiStatus, setApiStatus] = useState<'online' | 'offline'>('offline');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);
        const data = await res.json();
        if (res.ok && data.status === 'ok') {
          setApiStatus('online');
        } else {
          setApiStatus('offline');
        }
      } catch (error) {
        setApiStatus('offline');
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Threat Dashboard</h1>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            apiStatus === 'online'
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {apiStatus === 'online' ? '🟢 API Online' : '🔴 API Offline'}
        </span>
      </div>
      <p className="text-gray-300 mt-2">Real-time threat data will appear here.</p>
    </div>
  );
}
