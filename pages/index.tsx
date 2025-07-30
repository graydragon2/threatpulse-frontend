import Head from 'next/head';
import Topbar from '@/components/TopBar';
import ThreatDashboard from '@/components/ThreatDashboard';
import threatfeed from '@/components/threatfeed';

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
