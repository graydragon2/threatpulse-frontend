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
        setFeed(data.items); // ✅ Use `.items` if your API returns `{ items: [...] }`
      } catch (err: any) {
        setError(err.message || 'Failed to fetch');
      }
    };
    fetchFeed();
  }, []);

  if (error)
    return (
      <div className="max-w-4xl mx-auto p-6 text-red-400 font-semibold">
        ⚠️ Error: {error}
      </div>
    );

  if (!feed.length)
    return (
      <div className="max-w-4xl mx-auto p-6 text-gray-300">Loading feed...</div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-6">
        🛡️ ThreatPulse Dashboard
      </h1>
      <div className="space-y-4">
        {feed.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-800 text-gray-200 p-5 rounded-xl shadow hover:bg-gray-700 transition"
          >
            <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-sm hover:underline"
              >
                Read full article
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
