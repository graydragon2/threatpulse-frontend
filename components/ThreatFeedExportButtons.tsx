// components/ThreatFeedExportButtons.tsx

import React from 'react';

interface ExportProps {
  keywords: string;
  sources: string[];
  startDate: string;
  endDate: string;
  riskFilter: string;
  tags: string;
}

export default function ThreatFeedExportButtons({
  keywords,
  sources,
  startDate,
  endDate,
  riskFilter,
  tags,
}: ExportProps) {
  const params = new URLSearchParams();
  if (keywords) params.append('keywords', keywords);
  sources.forEach(source => params.append('sources', source));
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  if (riskFilter && riskFilter !== 'all') params.append('riskLevel', riskFilter);
  if (tags) params.append('tags', tags);

  const csvUrl = `${process.env.NEXT_PUBLIC_API_URL}/export/csv?${params.toString()}`;
  const pdfUrl = `${process.env.NEXT_PUBLIC_API_URL}/export/pdf?${params.toString()}`;

  return (
    <div className="flex gap-4 mb-4">
      <a
        href={csvUrl}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        target="_blank"
        rel="noopener noreferrer"
      >
        Export CSV
      </a>
      <a
        href={pdfUrl}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        target="_blank"
        rel="noopener noreferrer"
      >
        Export PDF
      </a>
    </div>
  );
}
