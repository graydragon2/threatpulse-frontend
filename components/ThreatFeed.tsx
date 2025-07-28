
// components/ThreatFeed.tsx

import { useEffect, useState } from 'react';

export default function ThreatFeed() {
  const [items, setItems] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);

  const fetchFeed = async () => {
    setLoading(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/rss?keywords=${keywords}&page=${page}&limit=${limit}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Error fetching feed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchFeed();
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="mt-4">
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Filter by keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="px-2 py-1 border rounded w-full"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-3 py-1 rounded">Search</button>
      </div>

      <div className="text-sm text-gray-400 mb-2">
        <strong>Threat Summary (All pages):</strong><br />
        Total Fetched: {total}<br />
        High Risk: {items.filter(i => i.threatScore >= 80).length} | 
        Medium Risk: {items.filter(i => i.threatScore >= 50 && i.threatScore < 80).length} | 
        Low Risk: {items.filter(i => i.threatScore < 50).length}
      </div>

      {loading ? (
        <p className="text-gray-300">Loading feed...</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="p-3 border border-gray-700 rounded bg-gray-800 text-white">
              <strong>{item.title}</strong>
              <p className="text-xs text-gray-400">{item.pubDate}</p>
              <p className="text-sm text-gray-200">{item.contentSnippet}</p>
              <p className="text-xs mt-1">Source: {item.source} | Risk: 
                <span className={
                  item.threatScore >= 80 ? 'text-red-400 ml-1' :
                  item.threatScore >= 50 ? 'text-yellow-300 ml-1' :
                  'text-green-400 ml-1'
                }>
                  {item.threatScore >= 80 ? 'high' : item.threatScore >= 50 ? 'medium' : 'low'}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-600 text-white disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-white">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-gray-600 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
