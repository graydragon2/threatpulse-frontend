// pages/dashboard.tsx

import Layout from '@/components/Layout';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';

export default function DashboardPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Head>
        <title>ThreatPulse Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          ThreatPulse Dashboard
        </h1>
        <p className="text-gray-700 dark:text-gray-300">Welcome to your dashboard.</p>
      </Layout>
    </ThemeProvider>
  );
}
