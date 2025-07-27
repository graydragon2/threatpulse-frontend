
import { useEffect, useState } from 'react';

interface FeedItem {
  title: string;
  link: string;
  pubDate?: string;
  contentSnippet?: string;
  creator?: string;
}

interface FeedResponse {
  success: boolean;
  items: FeedItem[];
  total: number;
  page: number;
  limit: number;
}

export default function ThreatFeed() {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // 🆕 loading state
  const [keywords, setKeywords] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true); // 🆕 start loading
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/rss?keywords=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
        );
        if (!res.ok) throw new Error('Network response was not ok');
        const data: FeedResponse = await res.json();
        setFeed(data.items || []);
        setTotalPages(Math.ceil(data.total / limit));
      } catch (err: any) {
        setError(err.message || 'Failed to fetch');
      } finally {
        setLoading(false); // 🆕 stop loading
      }
    };

    fetchFeed();
  }, [query, page]);

  const handleSearch = () => {
    setPage(1);
    setQuery(keywords.trim());
  };

  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-4 bg-gray-800 rounded-lg mt-4">
      {/* Search */}
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

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center text-blue-400 py-6 animate-pulse">Loading feed...</div>
      ) : (
        <>
          {/* Feed Items */}
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

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-white">
            <button
              onClick={prevPage}
              disabled={page === 1}
              className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              Previous
            </button>
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded ${page === totalPages ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
