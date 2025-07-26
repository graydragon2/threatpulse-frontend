import Head from 'next/head'
import ThreatDashboard from '@/components/ThreatDashboard'

export default function Home() {
  return (
    <>
      <Head>
        <title>ThreatPulse Dashboard</title>
        <meta name="description" content="Real-time security insights" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ThreatDashboard />
      </main>
    </>
  )
}
