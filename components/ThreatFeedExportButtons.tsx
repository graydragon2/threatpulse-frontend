import React from 'react';

export interface ExportProps {
  filters: {
    keywords: string;
    sources: string[];
    riskLevel: string;
    startDate: string;
    endDate: string;
  };
}

const ThreatFeedExportButtons: React.FC<ExportProps> = ({ filters }) => {
  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (filters.keywords) params.append('keywords', filters.keywords);
    if (filters.sources.length > 0) filters.sources.forEach(src => params.append('sources', src));
    if (filters.riskLevel !== 'all') params.append('riskLevel', filters.riskLevel);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    return params.toString();
  };

  const downloadFile = (format: 'csv' | 'pdf') => {
    const query = buildQueryString();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/export/${format}?${query}`;
    window.open(url, '_blank');
  };

  return (
    <div className="mb-4 flex gap-2">
      <button
        onClick={() => downloadFile('csv')}
        className="bg-green-700 text-white px-4 py-1 rounded hover:bg-green-800"
      >
        Export CSV
      </button>
      <button
        onClick={() => downloadFile('pdf')}
        className="bg-purple-700 text-white px-4 py-1 rounded hover:bg-purple-800"
      >
        Export PDF
      </button>
    </div>
  );
};

export default ThreatFeedExportButtons;
