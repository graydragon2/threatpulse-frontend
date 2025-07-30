// pages/dashboard.tsx

import Head from 'next/head';

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>ThreatPulse Dashboard</title>
      </Head>
      <div className="p-4 bg-gray-800 rounded-lg shadow text-white">
        <h1 className="text-2xl font-semibold mb-2">ThreatPulse Dashboard</h1>
        <p>Welcome to your dashboard.</p>
      </div>
    </>
  );
}
