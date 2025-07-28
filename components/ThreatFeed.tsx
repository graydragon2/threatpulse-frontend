'use client';

import { useEffect, useState } from 'react';

interface ThreatItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  threatScore: number;
  threatLevel: 'high' | 'medium' | 'low';
}

export default function ThreatFeed() {
  const [threats, setThreats] = useState<ThreatItem[]>([]);
  const [keywords, setKeywords] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'high' | 'excludeLow'>('all');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchThreats = async () => {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/rss`);
      url.searchParams.append('page', page.toString());
      if (keywords) url.searchParams.append('keywords', keywords);

      const res = await fetch(url.toString());
      const data = await res.json();
      setThreats(data.items);
      setTotal(data.total);
    };

    fetchThreats();
  }, [keywords, page]);

  const filteredThreats = threats.filter(item => {
    if (riskFilter === 'high') return item.threatLevel === 'high';
    if (riskFilter === 'excludeLow') return item.threatLevel !== 'low';
    return true;
  });

  const countRisk = (level: string) => threats.filter(t => t.threatLevel === level).length;

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Filter by keywords"
          className="p-2 rounded text-black"
          value={keywords}
          onChange={e => setKeywords(e.target.value)}
        />
        <button onClick={() => setRiskFilter('high')} className="bg-red-600 text-white px-2 py-1 rounded text-sm">High Risk Only</button>
        <button onClick={() => setRiskFilter('excludeLow')} className="bg-yellow-400 text-black px-2 py-1 rounded text-sm">Exclude Low Risk</button>
        <button onClick={() => setRiskFilter('all')} className="bg-blue-500 text-white px-2 py-1 rounded text-sm">Clear Filter</button>
      </div>

      <div className="text-sm text-gray-300 mb-2">
        <strong>Threat Summary (All pages):</strong><br />
        Total Fetched: {total} |
        High Risk: {countRisk('high')} |
        Medium Risk: {countRisk('medium')} |
        Low Risk: {countRisk('low')}
      </div>

      {filteredThreats.map((item, idx) => (
        <div key={idx} className="bg-gray-700 p-4 mb-3 rounded shadow">
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-300 hover:underline">
            {item.title}
          </a>
          <p className="text-sm text-gray-400">{item.pubDate}</p>
          <p className="text-xs text-gray-500">Source: {item.source} | Risk: <span className="capitalize">{item.threatLevel}</span></p>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          className="px-3 py-1 rounded bg-gray-600 text-white disabled:opacity-30"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-white">Page {page}</span>
        <button
          className="px-3 py-1 rounded bg-gray-600 text-white disabled:opacity-30"
          onClick={() => setPage(p => p + 1)}
          disabled={page * 20 >= total}
        >
          Next
        </button>
      </div>
    </div>
  );
}
