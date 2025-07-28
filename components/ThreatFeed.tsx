// components/ThreatFeed.tsx

import { useEffect, useState } from 'react';

export default function ThreatFeed() {
  const [threats, setThreats] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [highOnly, setHighOnly] = useState(false);
  const [excludeLow, setExcludeLow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams();
      if (keyword) params.set('keywords', keyword);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rss?${params}`);
      const data = await res.json();
      setThreats(data.items || []);
    };

    fetchData();
  }, [keyword]);

  const filtered = threats.filter(item => {
    if (highOnly && item.threatLevel !== 'high') return false;
    if (excludeLow && item.threatLevel === 'low') return false;
    return true;
  });

  const countSummary = {
    high: threats.filter(t => t.threatLevel === 'high').length,
    medium: threats.filter(t => t.threatLevel === 'medium').length,
    low: threats.filter(t => t.threatLevel === 'low').length,
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-4 mb-4">
        <input
          className="px-3 py-1 rounded text-black"
          placeholder="Filter by keywords (e.g., cyber, attack, malware)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          onClick={() => setHighOnly(!highOnly)}
          className={`px-3 py-1 rounded text-white ${
            highOnly ? 'bg-red-600' : 'bg-gray-600'
          }`}
        >
          High Risk Only
        </button>
        <button
          onClick={() => setExcludeLow(!excludeLow)}
          className={`px-3 py-1 rounded text-white ${
            excludeLow ? 'bg-yellow-600' : 'bg-gray-600'
          }`}
        >
          Exclude Low Risk
        </button>
        <button
          onClick={() => {
            setHighOnly(false);
            setExcludeLow(false);
            setKeyword('');
          }}
          className="px-3 py-1 rounded bg-blue-600 text-white"
        >
          🔄 Clear Filter
        </button>
      </div>

      <div className="bg-gray-700 p-4 rounded text-white text-sm mb-4">
        <p className="font-semibold">Threat Summary (All pages):</p>
        <p>Total Fetched: {threats.length}</p>
        <p>🔴 High Risk: {countSummary.high}</p>
        <p>🟠 Medium Risk: {countSummary.medium}</p>
        <p>🟢 Low Risk: {countSummary.low}</p>
      </div>

      {filtered.map((item, idx) => (
        <div key={idx} className="mb-4 bg-gray-800 p-4 rounded">
          <h3 className="text-white font-semibold">
            <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
          </h3>
          <p className="text-gray-400 text-sm">{item.pubDate}</p>
          <p className="text-gray-400 text-xs mt-1">Source: {item.source} | Risk: {item.threatLevel}</p>
        </div>
      ))}
    </div>
  );
}
