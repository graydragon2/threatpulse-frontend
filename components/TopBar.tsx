// components/TopBar.tsx

import ThemeToggle from './ThemeToggle';

export default function TopBar() {
  return (
    <header className="flex justify-between items-center px-4 py-3 bg-gray-900 text-white border-b border-gray-700">
      <h1 className="text-xl font-semibold">ThreatPulse</h1>
      <ThemeToggle />
    </header>
  );
}
