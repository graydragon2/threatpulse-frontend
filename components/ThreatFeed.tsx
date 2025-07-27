
import { useEffect, useState } from 'react';

export default function ThreatFeed() {
  const [feed, setFeed] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [keywords, setKeywords] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/rss?keywords=${encodeURIComponent(query)}`
        );
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setFeed(data.items || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch');
      }
    };

    fetchFeed();
  }, [query]);

  const handleSearch = () => {
    setQuery(keywords.trim());
  };

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!feed.length) return <div className="text-gray-400 p-4">Loading feed...</div>;

  return (
    <div className="p-4 bg-gray-800 rounded-lg mt-4">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Filter by keywords (e.g., cyber, attack)"
          className="flex-grow px-3 py-2 rounded-l bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      <ul className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {feed.map((item, idx) => (
          <li
            key={idx}
            className="p-4 bg-gray-700 rounded hover:bg-gray-600 transition cursor-pointer"
          >
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <h3 className="text-lg font-semibold text-blue-300 hover:underline">
                {item.title}
              </h3>
            </a>
            <p className="text-sm text-gray-400 mt-1">
              {item.pubDate && new Date(item.pubDate).toLocaleString()}
              {item.creator ? ` — ${item.creator}` : ''}
            </p>
            {item.contentSnippet && (
              <p className="text-gray-300 mt-2 text-sm">{item.contentSnippet}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
