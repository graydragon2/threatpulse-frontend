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

        if (!data.success || !Array.isArray(data.items)) {
          throw new Error('Invalid response format');
        }

        setFeed(data.items);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch');
      }
    };
    fetchFeed();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!feed.length) return <div className="text-gray-400">Loading feed...</div>;

  return (
    <ul className="mt-4 space-y-2">
      {feed.map((item, idx) => (
        <li key={idx} className="p-3 bg-gray-700 rounded-md shadow">
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
            {item.title}
          </a>
          <p className="text-sm text-gray-300">{item.pubDate}</p>
        </li>
      ))}
    </ul>
  );
}
