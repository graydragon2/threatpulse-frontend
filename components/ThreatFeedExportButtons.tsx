// components/ThreatFeedExportButtons.tsx

import React from 'react';

interface ExportProps {
  keywords: string;
  sources: string[];
  riskFilter: string;
  startDate: string;
  endDate: string;
  tags: string;
}

const ThreatFeedExportButtons: React.FC<ExportProps> = ({
  keywords,
  sources,
  riskFilter,
  startDate,
  endDate,
  tags,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const buildQuery = () => {
    const params = new URLSearchParams();

    if (keywords) params.append('keywords', keywords);
    if (sources.length) sources.forEach(src => params.append('sources', src));
    if (riskFilter && riskFilter !== 'all') params.append('riskLevel', riskFilter);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (tags) params.append('tags', tags);

    return params.toString();
  };

  const handleExport = (type: 'csv' | 'pdf') => {
    const query = buildQuery();
    window.open(`${baseUrl}/export/${type}?${query}`, '_blank');
  };

  return (
    <div className="mb-4 flex gap-2 flex-wrap">
      <button
        onClick={() => handleExport('csv')}
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
      >
        Export CSV
      </button>
      <button
        onClick={() => handleExport('pdf')}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        Export PDF
      </button>
    </div>
  );
};

export default ThreatFeedExportButtons;
