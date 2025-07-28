import { useEffect, useState } from 'react';

export default function ThreatFeed() {
  const [feed, setFeed] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const limit = 20;

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1); // reset to first page on search change
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

  return (
    <div className="mt-6 px-2">
      {/* 🔍 Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by keywords (e.g., cyber, attack, malware)"
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🧠 Error or Loading */}
      {error && <div className="text-red-500">Error: {error}</div>}
      {!feed.length && !error && <div className="text-gray-400">Loading feed...</div>}

      {/* 📄 Feed Cards */}
      <ul className="space-y-3">
        {feed.map((item, idx) => (
          <li
            key={idx}
            className="p-4 bg-gray-700 rounded-md shadow hover:bg-gray-600 transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 font-semibold hover:underline"
              >
                {item.title}
              </a>

              {/* 📎 Source */}
              {item.link?.includes('cisa.gov') && (
                <span className="ml-2 px-2 py-1 text-xs rounded bg-yellow-600 text-white">CISA</span>
              )}
              {item.link?.includes('bbc.co.uk') && (
                <span className="ml-2 px-2 py-1 text-xs rounded bg-blue-600 text-white">BBC</span>
              )}
              {item.link?.includes('cnn.com') && (
                <span className="ml-2 px-2 py-1 text-xs rounded bg-red-600 text-white">CNN</span>
              )}
            </div>
            <p className="text-sm text-gray-300 mt-2">{item.pubDate}</p>
            {item.contentSnippet && (
              <p className="text-sm text-gray-400 mt-1 line-clamp-3">{item.contentSnippet}</p>
            )}
          </li>
        ))}
      </ul>

      {/* ⏮ Pagination */}
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
