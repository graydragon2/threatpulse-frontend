import { useEffect, useState } from 'react';

export default function ThreatFeed() {
  const [feed, setFeed] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [keywords, setKeywords] = useState('');

  const fetchFeed = async (kw = '', pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rss?keywords=${kw}&page=${pageNum}`
      );
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setFeed(data.items);
      setTotalPages(Math.ceil(data.total / data.limit));
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch');
      setFeed([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed(keywords, page);
  }, [keywords, page]);

  const handleSearch = () => {
    setPage(1);
    setKeywords(search.trim());
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow mt-4">
      <h2 className="text-white text-lg font-semibold mb-2">Threat Feed</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Filter by keywords (e.g., cyber, attack)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading ? (
        <div className="text-white animate-pulse">Loading feed...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : feed.length === 0 ? (
        <div className="text-gray-300">No threats found.</div>
      ) : (
        <>
          <ul className="space-y-2">
            {feed.map((item, idx) => (
              <li key={idx} className="bg-gray-800 p-3 rounded text-white">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {item.title}
                </a>
                <p className="text-gray-400 text-sm">{item.pubDate}</p>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-white">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
