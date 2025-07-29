// components/ThreatFeedExportButtons.tsx

import React from 'react';

interface ExportProps {
  keywords: string;
  sources: string[];
  startDate: string;
  endDate: string;
  riskFilter: string;
}

const ThreatFeedExportButtons: React.FC<ExportProps> = ({
  keywords,
  sources,
  startDate,
  endDate,
  riskFilter,
}) => {
  const exportType = async (type: 'csv' | 'pdf') => {
    const params = new URLSearchParams();
    if (keywords) params.append('keywords', keywords);
    sources.forEach(src => params.append('sources', src));
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (riskFilter && riskFilter !== 'all') params.append('risk', riskFilter);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/export/${type}?${params.toString()}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4 mb-6">
      <span className="text-sm text-gray-400 mr-2">Export:</span>
      <button
        onClick={() => exportType('csv')}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 rounded shadow-sm text-sm"
      >
        Export CSV
      </button>
      <button
        onClick={() => exportType('pdf')}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded shadow-sm text-sm"
      >
        Export PDF
      </button>
    </div>
  );
};

export default ThreatFeedExportButtons;

