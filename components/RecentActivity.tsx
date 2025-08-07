// components/RecentActivity.tsx

import React from 'react';

type FeedItem = {
  title: string;
  pubDate: string;
  source: string;
  threatLevel: string;
  tags: string[];
  link: string;
};

interface RecentActivityProps {
  feedItems: FeedItem[];
}

const HIGH_PRIORITY_TAGS = [
  'explosion',
  'attack',
  'fatality',
  'warning',
  'chemical',
  'radiation',
  'civil unrest',
  'military',
  'cyber',
];

export default function RecentActivity({ feedItems }: RecentActivityProps) {
  const filteredItems = feedItems
    .filter((item) =>
      item.tags?.some((tag) => HIGH_PRIORITY_TAGS.includes(tag))
    )
    .slice(0, 5); // Show latest 5 high-priority alerts

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow mt-6">
      <h3 className="text-lg font-bold text-white mb-2">🔥 Recent Activity</h3>
      {filteredItems.length === 0 ? (
        <p className="text-gray-400 text-sm">No high-priority activity yet.</p>
      ) : (
        <ul className="space-y-3">
          {filteredItems.map((item, idx) => (
            <li
              key={idx}
              className="bg-gray-800 p-3 rounded border border-gray-700"
            >
              <p className="text-sm text-white font-semibold">{item.title}</p>
              <p className="text-xs text-gray-400">
                {new Date(item.pubDate).toLocaleString()} | {item.source}
              </p>
              <p className="text-xs text-yellow-300 mt-1">
                Tags: {item.tags.join(', ')}
              </p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-xs"
              >
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
