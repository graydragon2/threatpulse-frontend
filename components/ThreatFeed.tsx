import { useEffect, useState } from 'react';

export default function ThreatFeed() {
  const [feed, setFeed] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rss`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setFeed(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch');
      }
    };
    fetchFeed();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!feed.length) return <div>Loading feed...</div>;

  return (
    <ul>
      {feed.map((item, idx) => (
        <li key={idx}>{item.title}</li>
      ))}
    </ul>
  );
}
