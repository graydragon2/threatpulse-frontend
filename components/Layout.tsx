// components/Layout.tsx
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">ThreatPulse</h2>
        <nav className="mt-4 space-y-2">
          <a href="/" className="block text-gray-600 dark:text-gray-300 hover:underline">Dashboard</a>
          <a href="/threatfeed" className="block text-gray-600 dark:text-gray-300 hover:underline">Feed</a>
        </nav>
      </aside>

      {/* Main content with top bar */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Threat Dashboard</h1>
          <button
            onClick={() => {
              document.documentElement.classList.toggle('dark');
              localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
            }}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm text-gray-900 dark:text-white"
          >
            Toggle Theme
          </button>
        </header>

        {/* Body */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
