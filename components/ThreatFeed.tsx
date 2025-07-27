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
        setFeed(data.items);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch');
      }
    };
    fetchFeed();
  }, []);

  if (error)
    return <div className="text-red-500 dark:text-red-400">Error: {error}</div>;

  if (!feed.length)
    return <div className="text-gray-500 dark:text-gray-400">Loading feed...</div>;

  return (
    <div className="mt-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md w-full">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Live Threat Feed
      </h2>
      <ul className="space-y-4">
        {feed.map((item, idx) => (
          <li
            key={idx}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.pubDate}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
