import Head from 'next/head';
import Topbar from '@/components/Topbar';
import ThreatDashboard from '@/components/ThreatDashboard';
import ThreatFeed from '@/components/ThreatFeed';

export default function Home() {
  return (
    <>
      <Head>
        <title>ThreatPulse Dashboard</title>
        <meta name="description" content="Real-time security insights" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topbar />
      <main className="p-4">
        <ThreatDashboard />
        <ThreatFeed />
      </main>
    </>
  );
}
