// components/ThreatFeed.tsx

import { useEffect, useState } from 'react';

interface ThreatItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  source: string;
  threatScore: number;
  threatLevel: 'high' | 'medium' | 'low';
}

export default function ThreatFeed() {
  const [threats, setThreats] = useState<ThreatItem[]>([]);
  const [keywords, setKeywords] = useState('');
  const [sources, setSources] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  const fetchThreats = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        keywords,
        page: String(page),
        limit: String(limit),
      });

      if (sources.length > 0) {
        params.append('sources', sources.join(','));
      }
      if (startDate) {
        params.append('startDate', startDate);
      }
      if (endDate) {
        params.append('endDate', endDate);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rss?${params}`);
      const data = await res.json();

      if (data.success) {
        setThreats(data.items);
        setTotal(data.total);
      }
    } catch (err) {
      console.error('Error fetching threats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreats();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchThreats();
  };

  const toggleSource = (source: string) => {
    setSources(prev =>
      prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]
    );
  };

  const totalPages = Math.ceil(total / limit);

  const riskCounts = {
    high: threats.filter(t => t.threatLevel === 'high').length,
    medium: threats.filter(t => t.threatLevel === 'medium').length,
    low: threats.filter(t => t.threatLevel === 'low').length,
  };

  return (
    <div className="mt-6">
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Filter by keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-300">From:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-2 py-1 rounded dark:bg-gray-700 dark:text-white"
          />
          <label className="text-sm text-gray-300">To:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-2 py-1 rounded dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {['CNN', 'BBC', 'Reuters'].map(source => (
          <button
            key={source}
            onClick={() => toggleSource(source)}
            className={`px-3 py-1 rounded ${
              sources.includes(source)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-gray-200'
            }`}
          >
            {source}
          </button>
        ))}
        <button
          onClick={handleSearch}
          className="ml-auto bg-green-600 text-white px-4 py-1 rounded"
        >
          Search
        </button>
      </div>

      <div className="text-sm text-gray-300 mb-2">
        <strong>Threat Summary (All pages):</strong><br />
        Total Fetched: {total} |
        High Risk: <span className="text-red-500">{riskCounts.high}</span> |
        Medium Risk: <span className="text-yellow-400">{riskCounts.medium}</span> |
        Low Risk: <span className="text-green-400">{riskCounts.low}</span>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        threats.map((item, idx) => (
          <div key={idx} className="mb-4 p-3 border border-gray-600 rounded bg-gray-800">
            <h3 className="text-lg font-semibold text-blue-300">
              <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
            </h3>
            <p className="text-sm text-gray-400">{item.pubDate}</p>
            <p className="text-sm text-gray-300 mt-1">{item.contentSnippet}</p>
            <div className="text-xs text-gray-500 mt-1">
              Source: {item.source} | Risk:{' '}
              <span className={
                item.threatLevel === 'high' ? 'text-red-500' :
                item.threatLevel === 'medium' ? 'text-yellow-400' :
                'text-green-400'
              }>
                {item.threatLevel}
              </span>
            </div>
          </div>
        ))
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-white px-2">Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

