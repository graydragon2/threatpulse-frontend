// components/TopBar.tsx

export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <h1 className="text-lg font-bold text-gray-900 dark:text-white">ThreatPulse</h1>
      <button
        onClick={() => {
          document.documentElement.classList.toggle('dark');
          localStorage.setItem(
            'theme',
            document.documentElement.classList.contains('dark') ? 'dark' : 'light'
          );
        }}
        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm text-gray-900 dark:text-white"
      >
        Toggle Theme
      </button>
    </header>
  );
}
