// components/ThreatFeed.tsx
import { useEffect, useState } from 'react';

interface ThreatItem {
  title: string;
  link: string;
  contentSnippet: string;
  pubDate: string;
  source: string;
  threatScore: number;
  threatLevel: 'low' | 'medium' | 'high';
}

export default function ThreatFeed() {
  const [items, setItems] = useState<ThreatItem[]>([]);
  const [keywords, setKeywords] = useState('');
  const [filter, setFilter] = useState<'all' | 'high' | 'exclude-low'>('all');
  const [apiStatus, setApiStatus] = useState<'online' | 'offline'>('offline');

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const params = new URLSearchParams();
        if (keywords) params.append('keywords', keywords);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rss?${params.toString()}`);
        const data = await res.json();
        if (res.ok) {
          setItems(data.items);
          setApiStatus('online');
        } else {
          setApiStatus('offline');
        }
      } catch {
        setApiStatus('offline');
      }
    };
    fetchThreats();
  }, [keywords]);

  const filteredItems = items.filter(item => {
    if (filter === 'high') return item.threatLevel === 'high';
    if (filter === 'exclude-low') return item.threatLevel !== 'low';
    return true;
  });

  const countByLevel = (level: 'low' | 'medium' | 'high') =>
    items.filter(item => item.threatLevel === level).length;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <input
          type="text"
          placeholder="Filter by keywords (e.g., cyber, attack, malware)"
          className="w-full p-2 rounded bg-gray-700 text-white mr-2"
          value={keywords}
          onChange={e => setKeywords(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('high')}
            className="px-2 py-1 text-xs bg-red-600 text-white rounded"
          >
            High Risk Only
          </button>
          <button
            onClick={() => setFilter('exclude-low')}
            className="px-2 py-1 text-xs bg-yellow-500 text-white rounded"
          >
            Exclude Low Risk
          </button>
          <button
            onClick={() => setFilter('all')}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
          >
            🔄 Clear Filter
          </button>
        </div>
      </div>

      <div className="text-gray-300 text-sm mt-2 mb-4">
        <strong>Threat Summary (All pages):</strong>
        <div>Total Fetched: {items.length}</div>
        <div>🔴 High Risk: {countByLevel('high')}</div>
        <div>🟠 Medium Risk: {countByLevel('medium')}</div>
        <div>🟢 Low Risk: {countByLevel('low')}</div>
      </div>

      {filteredItems.map((item, index) => (
        <div key={index} className="mb-4 p-4 rounded bg-gray-700 shadow">
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-400 hover:underline">
            {item.title}
          </a>
          <div className="text-sm text-gray-300 mt-1">{item.contentSnippet}</div>
          <div className="text-xs text-gray-400 mt-1">{new Date(item.pubDate).toUTCString()}</div>
          <div className="text-xs text-gray-400 mt-1">Source: {item.source} | Risk: {item.threatLevel}</div>
        </div>
      ))}
    </div>
  );
}
