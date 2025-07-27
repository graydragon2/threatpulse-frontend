import { useEffect, useState } from 'react';

export default function ThreatFeed() {
  const [feed, setFeed] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rss`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setFeed(data.items || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch');
      }
    };
    fetchFeed();
  }, []);

  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-white mb-4">Live Threat Feed</h2>

      {error && <div className="text-red-500">{error}</div>}
      {!feed.length && !error && <div className="text-gray-400">Loading feed...</div>}

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
