// components/Layout.tsx
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
  const currentPage = children.type;

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar fade-in if not splash */}
      {!currentPage.hideSidebar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="w-64 bg-gray-800"
        >
          <Sidebar />
        </motion.div>
      )}

      <main className="flex-1">{children}</main>
    </div>
  );
}
