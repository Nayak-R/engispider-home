'use client';

import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { CLIENTS } from '@/data/clients';

/**
 * Hero for /customers, built to the same pattern as the About and Services
 * heroes: full-height, two columns, text sliding in from the left and the
 * artwork from the right, over a radial wash.
 *
 * It lives in its own client component so app/customers/page.tsx can stay a
 * server component and keep exporting metadata — 'use client' on the page
 * itself would forfeit that.
 *
 * Unlike the other heroes the artwork is a photograph, not an SVG, so it is
 * framed: rounded and bordered, with a colour bloom behind it and a scrim over
 * the bottom edge. Without that the light-blue image reads as a bright
 * rectangle pasted onto a black page.
 */

const CREDENTIALS = [
  `${CLIENTS.length} brands`,
  'Education & training',
  'Logistics & infrastructure',
  'Hospitality & healthcare',
];

export default function CustomersHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />

      <div className="container z-10 mx-auto px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="min-w-0 px-4 py-10 text-left lg:pl-12"
          >
            <h1 className="mb-6 break-words bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              The Teams We Build For
            </h1>

            <p className="mb-8 text-xl text-gray-300 md:text-2xl">
              Institutes, fleets, builders and cafes —{' '}
              <span className="font-semibold text-cyan-400">running on software we made</span>
            </p>

            <div className="mb-16 mt-8 flex flex-wrap gap-4">
              {CREDENTIALS.map((text, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <FaCheckCircle className="h-5 w-5 text-green-400" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-blue-600/30 via-cyan-500/25 to-purple-600/30 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-cyan-500/20">
              <img
                src="/images/customers-hero.webp"
                alt="A team working together around a table of laptops and tablets"
                width={1200}
                height={1076}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
              {/* Blends the light photo into the dark page */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
