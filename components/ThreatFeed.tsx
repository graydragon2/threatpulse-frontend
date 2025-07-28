import { useEffect, useState } from 'react';

export default function ThreatFeed() {
  const [feed, setFeed] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'highOnly' | 'excludeLow'>('all');
  const limit = 20;

  const [riskCounts, setRiskCounts] = useState({
    high: 0,
    medium: 0,
    low: 0,
  });

  useEffect(() => {
    const storedFilter = localStorage.getItem('riskFilter');
    if (storedFilter === 'highOnly' || storedFilter === 'excludeLow' || storedFilter === 'all') {
      setRiskFilter(storedFilter);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('riskFilter', riskFilter);
  }, [riskFilter]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const keywordParam = debouncedSearch.trim().split(/\s+/).join(',');
        const url = `${process.env.NEXT_PUBLIC_API_URL}/rss?page=${page}&limit=${limit}&keywords=${keywordParam}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        if (!data.success || !Array.isArray(data.items)) throw new Error('Invalid response format');

        let filteredItems = data.items;

        // Risk-based filtering
        if (riskFilter === 'highOnly') {
          filteredItems = filteredItems.filter((item) => item.riskScore === 'high');
        } else if (riskFilter === 'excludeLow') {
          filteredItems = filteredItems.filter((item) => item.riskScore !== 'low');
        }

        // Count risk levels in unfiltered set (not filtered by UI toggle)
        const riskTally = { high: 0, medium: 0, low: 0 };
        for (const item of data.items) {
          const level = item.riskScore;
          if (level === 'high') riskTally.high++;
          else if (level === 'medium') riskTally.medium++;
          else if (level === 'low') riskTally.low++;
        }

        setRiskCounts(riskTally);
        setFeed(filteredItems);
        setTotal(data.total);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch');
      }
    };

    fetchFeed();
  }, [page, debouncedSearch, riskFilter]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="mt-6">
      {/* 🔍 Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by keywords (e.g., cyber, attack, malware)"
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ☢️ AI Risk Filter Buttons */}
      <div className="mb-4 flex gap-2 text-sm">
        <button
          onClick={() => setRiskFilter('highOnly')}
          className={`px-3 py-1 rounded ${
            riskFilter === 'highOnly' ? 'bg-red-600 text-white' : 'bg-gray-600 text-gray-200'
          }`}
        >
          🛑 High Risk Only
        </button>
        <button
          onClick={() => setRiskFilter('excludeLow')}
          className={`px-3 py-1 rounded ${
            riskFilter === 'excludeLow' ? 'bg-yellow-600 text-white' : 'bg-gray-600 text-gray-200'
          }`}
        >
          ⚠ Exclude Low Risk
        </button>
        <button
          onClick={() => setRiskFilter('all')}
          className={`px-3 py-1 rounded ${
            riskFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-200'
          }`}
        >
          🔄 Clear Filter
        </button>
      </div>

      {/* 📊 Summary Stats */}
      <div className="mb-4 bg-gray-800 p-4 rounded text-white">
        <div className="text-sm">Threat Summary (All pages):</div>
        <ul className="text-xs mt-1 space-y-1">
          <li>🧠 Total Fetched: {total}</li>
          <li>🛑 High Risk: {riskCounts.high}</li>
          <li>⚠ Medium Risk: {riskCounts.medium}</li>
          <li>✅ Low Risk: {riskCounts.low}</li>
        </ul>
      </div>

      {/* 📰 Threat List */}
      {error && <div className="text-red-500">Error: {error}</div>}
      {!feed.length && !error && <div className="text-gray-400">No threats found.</div>}

      <ul className="space-y-2">
        {feed.map((item, idx) => (
          <li key={idx} className="p-3 bg-gray-700 rounded-md shadow">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
              {item.title}
            </a>
            <p className="text-sm text-gray-300">{item.pubDate}</p>
            <p className="text-xs text-gray-400">
              Source: {item.source || 'Unknown'} | Risk:{' '}
              <span className="font-bold capitalize">{item.riskScore}</span>
            </p>
          </li>
        ))}
      </ul>

      {/* ⏩ Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center text-white">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-600 rounded disabled:opacity-50"
          >
            ⬅ Prev
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-600 rounded disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}
