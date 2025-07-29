// components/ThreatFeedExportButtons.js

import React from 'react';

export default function ThreatFeedExportButtons({ filters }) {
  const buildQuery = () => {
    const params = new URLSearchParams();

    if (filters.keywords) params.append('keywords', filters.keywords);
    if (filters.riskLevel) params.append('riskLevel', filters.riskLevel);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.sources.length > 0) {
      filters.sources.forEach(source => params.append('sources', source));
    }

    return params.toString();
  };

  const handleExport = (type) => {
    const query = buildQuery();
    const base = process.env.NEXT_PUBLIC_API_URL;
    window.open(`${base}/export/${type}?${query}`, '_blank');
  };

  return (
    <div className="flex gap-2 mt-2">
      <button
        onClick={() => handleExport('csv')}
        className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
      >
        Export CSV
      </button>
      <button
        onClick={() => handleExport('pdf')}
        className="bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
      >
        Export PDF
      </button>
    </div>
  );
}
