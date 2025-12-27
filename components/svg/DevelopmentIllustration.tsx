'use client';

import { motion } from 'framer-motion';

export default function DevelopmentIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      {/* Background Circle */}
      <motion.circle
        cx="200"
        cy="150"
        r="120"
        fill="url(#devGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Code Editor Window */}
      <motion.g
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Window */}
        <rect x="130" y="100" width="140" height="100" rx="6" fill="#1f2937"/>

        {/* Window Header */}
        <rect x="130" y="100" width="140" height="20" rx="6" fill="#374151"/>
        <circle cx="142" cy="110" r="3" fill="#ef4444"/>
        <circle cx="152" cy="110" r="3" fill="#fbbf24"/>
        <circle cx="162" cy="110" r="3" fill="#10b981"/>

        {/* Code Lines */}
        <motion.g
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <rect x="140" y="130" width="50" height="4" rx="2" fill="#3b82f6"/>
          <rect x="140" y="140" width="70" height="4" rx="2" fill="#8b5cf6"/>
          <rect x="150" y="150" width="60" height="4" rx="2" fill="#10b981"/>
          <rect x="150" y="160" width="40" height="4" rx="2" fill="#f59e0b"/>
          <rect x="140" y="170" width="80" height="4" rx="2" fill="#3b82f6"/>
          <rect x="150" y="180" width="50" height="4" rx="2" fill="#ec4899"/>
        </motion.g>

        {/* Cursor */}
        <motion.rect
          x="195"
          y="180"
          width="2"
          height="4"
          fill="#fff"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </motion.g>

      {/* Floating Code Brackets */}
      <motion.g
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.text
          x="100"
          y="150"
          fontSize="40"
          fill="#fff"
          opacity="0.7"
          fontFamily="monospace"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {'<'}
        </motion.text>
      </motion.g>

      <motion.g
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <motion.text
          x="280"
          y="150"
          fontSize="40"
          fill="#fff"
          opacity="0.7"
          fontFamily="monospace"
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {'>'}
        </motion.text>
      </motion.g>

      {/* Terminal Window */}
      <motion.g
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <rect x="110" y="210" width="80" height="45" rx="4" fill="#0f172a" opacity="0.9"/>

        {/* Terminal prompt */}
        <motion.text
          x="118"
          y="228"
          fontSize="8"
          fill="#10b981"
          fontFamily="monospace"
        >
          $ npm run dev
        </motion.text>

        {/* Running dots */}
        <motion.g
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <circle cx="125" cy="240" r="2" fill="#3b82f6"/>
          <circle cx="132" cy="240" r="2" fill="#3b82f6"/>
          <circle cx="139" cy="240" r="2" fill="#3b82f6"/>
        </motion.g>
      </motion.g>

      {/* Git Branch */}
      <motion.g
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <circle cx="220" cy="230" r="5" fill="#fff" opacity="0.8"/>
        <path d="M 220 235 L 220 245" stroke="#fff" strokeWidth="2" opacity="0.6"/>
        <circle cx="220" cy="250" r="5" fill="#fff" opacity="0.8"/>

        <motion.path
          d="M 225 240 L 235 240 L 235 250"
          stroke="#fff"
          strokeWidth="2"
          opacity="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        />
        <motion.circle
          cx="235"
          cy="255"
          r="5"
          fill="#10b981"
          opacity="0.8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, duration: 0.4 }}
        />
      </motion.g>

      {/* Check marks for successful build */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
      >
        <circle cx="265" cy="225" r="12" fill="#10b981" opacity="0.9"/>
        <path d="M 260 225 L 263 228 L 270 220" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </motion.g>

      <defs>
        <linearGradient id="devGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af"/>
          <stop offset="50%" stopColor="#6366f1"/>
          <stop offset="100%" stopColor="#8b5cf6"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
