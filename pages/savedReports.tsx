// pages/SavedReports.tsx

import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function SavedReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`);
        const data = await res.json();
        if (res.ok) {
          setReports(data);
        } else {
          setError('Failed to fetch history');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="p-4 text-white">
      <Head>
        <title>Saved Reports | ThreatPulse</title>
      </Head>

      <h1 className="text-2xl font-bold mb-4">📁 Saved Reports</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && reports.length === 0 && <p>No saved reports found.</p>}

      {!loading && !error && reports.length > 0 && (
        <ul className="space-y-4">
          {reports.map((report: any, index: number) => (
            <li key={index} className="bg-gray-800 p-4 rounded shadow">
              <p className="text-sm text-gray-400">Generated: {new Date(report.timestamp).toLocaleString()}</p>
              <p><strong>Format:</strong> {report.format.toUpperCase()}</p>
              <p><strong>Risk Summary:</strong> High: {report.summary.high}, Medium: {report.summary.medium}, Low: {report.summary.low}</p>
              <p><strong>Tags:</strong> {report.tags?.join(', ') || 'None'}</p>
              <a href={report.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mt-2 inline-block">Download</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
