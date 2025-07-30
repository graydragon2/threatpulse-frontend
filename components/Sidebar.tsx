import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isActive = (path: string) => router.pathname === path;

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6">ThreatPulse</h1>
        <nav className="space-y-4">
                    
        <Link href="/dashboard">
         <span className={`block px-4 py-2 rounded hover:bg-gray-700 ${isActive('/dashboard') ? 'bg-gray-700' : ''}`}>Dashboard</span>
        </Link>
        <Link href="/feed">
         <span className={`block px-4 py-2 rounded hover:bg-gray-700 ${isActive('/feed') ? 'bg-gray-700' : ''}`}>Threat Feed</span>
        </Link>
        <Link href="/savedReports">
         <span className={`block px-4 py-2 rounded hover:bg-gray-700 ${isActive('/savedReports') ? 'bg-gray-700' : ''}`}>Saved Reports</span>
        </Link>

        </nav>
      </div>

      <div className="flex justify-between items-center mt-8">
        <span className="text-sm text-gray-400">Theme</span>
        {mounted && (
          <button
            className="p-2 rounded-full hover:bg-gray-700"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}
      </div>
    </aside>
  );
}

