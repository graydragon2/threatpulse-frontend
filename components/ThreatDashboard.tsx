import { useEffect, useState } from 'react';
import RecentActivity from '@/components/RecentActivity';

export default function ThreatDashboard() {
  const [apiStatus, setApiStatus] = useState<'online' | 'offline'>('offline');
  const [summary, setSummary] = useState({ high: 0, medium: 0, low: 0 });
  const [feedItems, setFeedItems] = useState<any[]>([]);
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
      } catch {
        setApiStatus('offline');
      }
    };

    const fetchSummary = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feed`);
        const data = await res.json();
        if (res.ok && Array.isArray(data.items)) {
          const counts = { high: 0, medium: 0, low: 0 };
          data.items.forEach((item: any) => {
            if (item.risk === 'high') counts.high++;
            if (item.risk === 'medium') counts.medium++;
            if (item.risk === 'low') counts.low++;
          });
          setSummary(counts);
          setFeedItems(data.items); // <-- This line is critical
        }
      } catch (err) {
        setError('Failed to load summary');
      }
    };

    checkHealth();
    fetchSummary();
    const interval = setInterval(() => {
      checkHealth();
      fetchSummary();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Threat Dashboard</h2>
        <span
          className={`text-sm px-2 py-1 rounded-full font-semibold transition-all duration-200 ${
            apiStatus === 'online' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {apiStatus === 'online' ? '🟢 API Online' : '🔴 API Offline'}
        </span>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-3 gap-4 mb-6 text-white">
        <div className="bg-gray-900 p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">High Risk</h3>
          <p className="text-3xl font-bold text-red-500">{summary.high}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Medium Risk</h3>
          <p className="text-3xl font-bold text-yellow-500">{summary.medium}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Low Risk</h3>
          <p className="text-3xl font-bold text-green-500">{summary.low}</p>
        </div>
      </div>

      <RecentActivity feedItems={feedItems} />
    </div>
  );
}
