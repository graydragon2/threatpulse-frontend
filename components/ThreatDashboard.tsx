// components/ThreatDashboard.tsx

import { useEffect, useState } from 'react';
import RecentActivity from '@/components/RecentActivity';

export default function ThreatDashboard() {
  const [apiStatus, setApiStatus] = useState<'online' | 'offline'>('offline');
  const [feedItems, setFeedItems] = useState([]);

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

    const fetchFeed = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rss`);
        const data = await res.json();
        if (res.ok && data.items) {
          setFeedItems(data.items);
        }
      } catch (err) {
        console.error('Failed to fetch feed:', err);
      }
    };

    checkHealth();
    fetchFeed();

    const healthInterval = setInterval(checkHealth, 15000);
    const feedInterval = setInterval(fetchFeed, 30000);

    return () => {
      clearInterval(healthInterval);
      clearInterval(feedInterval);
    };
  }, []);

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow">
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

      <p className="text-gray-300 mb-4">Real-time threat data will appear here.</p>

      <RecentActivity feedItems={feedItems} />
    </div>
  );
}
