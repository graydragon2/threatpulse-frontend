import { useEffect, useState } from 'react';

export default function ThreatFeed() {
  const [feed, setFeed] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const limit = 20;

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1); // Reset page on new search
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

        if (!data.success || !Array.isArray(data.items)) {
          throw new Error('Invalid response format');
        }

        setFeed(data.items);
        setTotal(data.total);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch');
      }
    };

    fetchFeed();
  }, [page, debouncedSearch]);

  const totalPages = Math.ceil(total / limit);

  const getBadgeColor = (source: string) => {
    switch (source.toLowerCase()) {
      case 'cnn':
        return 'bg-red-600';
      case 'bbc':
        return 'bg-blue-500';
      case 'cisa':
        return 'bg-yellow-600 text-black';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="mt-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by keywords (e.g., cyber, attack, malware)"
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <div className="text-red-500">Error: {error}</div>}
      {!feed.length && !error && <div className="text-gray-400">Loading feed...</div>}

      <ul className="space-y-2">
        {feed.map((item, idx) => (
          <li key={idx} className="p-3 bg-gray-700 rounded-md shadow">
            <div className="flex justify-between items-start">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline"
              >
                {item.title}
              </a>
              {item.source && (
                <span
                  className={`text-xs font-semibold px-2 py-0.5 ml-2 rounded ${getBadgeColor(item.source)}`}
                >
                  {item.source.toUpperCase()}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-300">{item.pubDate}</p>
          </li>
        ))}
      </ul>

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
