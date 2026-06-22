'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * Client-side redirect used by retired/legacy URLs (e.g. /contacts, /book-demo).
 * The page also carries a canonical tag to the real destination and is marked
 * noindex, so crawlers consolidate it to the target instead of indexing the stub.
 */
export default function RedirectNotice({ to, label }: { to: string; label: string }) {
  useEffect(() => {
    const t = setTimeout(() => window.location.replace(to), 50);
    return () => clearTimeout(t);
  }, [to]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-gray-400 mb-4">Redirecting you to {label}…</p>
        <Link href={to} className="text-indigo-300 underline">
          Click here if you are not redirected automatically
        </Link>
      </div>
    </main>
  );
}
