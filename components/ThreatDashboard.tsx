// components/ThreatDashboard.tsx

import { useEffect, useState } from 'react';
import RecentActivity from '@/components/RecentActivity';

export default function ThreatDashboard() {
  const [apiStatus, setApiStatus] = useState<'online' | 'offline'>('offline');
  const [feedItems, setFeedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    const fetchThreats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rss`);
        const data = await res.json();
        if (res.ok) {
          setFeedItems(data.items);
        } else {
          setError('Failed to fetch feed data');
        }
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
    fetchThreats();

    const interval = setInterval(() => {
      checkHealth();
      fetchThreats();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const countByRisk = (level: string) =>
    feedItems.filter((item) => item.threatLevel === level).length;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Threat Dashboard</h2>
        <span
          className={`text-sm px-2 py-1 rounded-full font-semibold transition-all duration-200 ${
            apiStatus === 'online'
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {apiStatus === 'online' ? '🟢 API Online' : '🔴 API Offline'}
        </span>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded shadow text-white">
          <h3 className="text-lg font-semibold mb-2">High Risk</h3>
          <p className="text-3xl font-bold text-red-500">{countByRisk('high')}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded shadow text-white">
          <h3 className="text-lg font-semibold mb-2">Medium Risk</h3>
          <p className="text-3xl font-bold text-yellow-500">{countByRisk('medium')}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded shadow text-white">
          <h3 className="text-lg font-semibold mb-2">Low Risk</h3>
          <p className="text-3xl font-bold text-green-500">{countByRisk('low')}</p>
        </div>
      </div>

      <RecentActivity feedItems={feedItems} />
    </div>
  );
}
