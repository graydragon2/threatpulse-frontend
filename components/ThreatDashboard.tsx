import { ShieldCheck, AlertCircle, Activity } from 'lucide-react';

export default function ThreatDashboard() {
  const mockData = [
    {
      label: 'API Health',
      status: 'Online',
      icon: <ShieldCheck className="text-green-400" />,
      description: 'ThreatPulse backend is responding correctly.',
    },
    {
      label: 'Feed Sources',
      status: '3/3 Active',
      icon: <Activity className="text-blue-400" />,
      description: 'RSS feeds from CNN, BBC, and CISA are parsing successfully.',
    },
    {
      label: 'Anomalies',
      status: '2 flagged',
      icon: <AlertCircle className="text-yellow-400" />,
      description: 'Keyword-matching items flagged for review.',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md w-full">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Threat Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockData.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm"
          >
            <div className="text-3xl">{item.icon}</div>
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{item.label}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{item.status}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
