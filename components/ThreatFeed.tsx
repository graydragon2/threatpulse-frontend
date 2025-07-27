import { useEffect, useState } from 'react';

export default function ThreatFeed() {
  const [feed, setFeed] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const query = keywords ? `?keywords=${encodeURIComponent(keywords)}` : '';
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rss${query}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setFeed(data.items || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed(); // Initial load
  }, []);

  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-white mb-4">Live Threat Feed</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter keywords (e.g. cyber, attack)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <button
          onClick={fetchFeed}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Filter Feed
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}
      {loading && <div className="text-gray-400">Loading feed...</div>}

      <ul className="space-y-3">
        {feed.map((item, idx) => (
          <li
            key={idx}
            className="bg-gray-700 hover:bg-gray-600 transition-colors p-3 rounded-md"
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium"
            >
              {item.title}
            </a>
            <p className="text-sm text-gray-300 mt-1">{item.pubDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
