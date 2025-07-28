// components/ThreatCard.tsx

import React from 'react';

type ThreatCardProps = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  score: number;
  threatLevel: string;
  category: string;
  contentSnippet: string;
};

export default function ThreatCard({
  title,
  link,
  pubDate,
  source,
  score,
  threatLevel,
  category,
  contentSnippet
}: ThreatCardProps) {
  const scoreColor =
    threatLevel === 'high' ? 'bg-red-600' :
    threatLevel === 'medium' ? 'bg-yellow-600' : 'bg-green-600';

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm px-2 py-1 rounded-full bg-blue-700 text-white">{category}</span>
        <span className={`text-sm px-2 py-1 rounded-full ${scoreColor} text-white`}>
          Score: {score}
        </span>
      </div>
      <h3 className="text-white font-semibold text-lg mb-1">
        <a href={link} target="_blank" rel="noopener noreferrer">{title}</a>
      </h3>
      <p className="text-gray-400 text-sm mb-1">{contentSnippet}</p>
      <div className="text-gray-500 text-xs mt-2 flex justify-between">
        <span>{new Date(pubDate).toLocaleString()}</span>
        <span>{source}</span>
      </div>
    </div>
  );
}
