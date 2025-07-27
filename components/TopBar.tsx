
import { useEffect, useState } from 'react';

export default function Topbar() {
  const [status, setStatus] = useState<'online' | 'offline'>('offline');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`);
        if (res.ok) setStatus('online');
        else setStatus('offline');
      } catch {
        setStatus('offline');
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 15000); // Ping every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-gray-950 text-white px-4 py-3 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">ThreatPulse</h1>
      <div className="flex items-center gap-2">
        <span
          className={`w-3 h-3 rounded-full ${
            status === 'online' ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></span>
        <span className="text-sm">{status === 'online' ? 'API Online' : 'API Offline'}</span>
      </div>
    </header>
  );
}
