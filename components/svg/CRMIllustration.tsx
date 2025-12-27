'use client';

import { motion } from 'framer-motion';

export default function CRMIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      {/* Background Circle */}
      <motion.circle
        cx="200"
        cy="150"
        r="120"
        fill="url(#crmGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Central Customer */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <circle cx="200" cy="140" r="25" fill="#fff"/>
        <path d="M200 170 C 180 170, 180 195, 180 195 L 220 195 C 220 195, 220 170, 200 170 Z" fill="#fff"/>
      </motion.g>

      {/* Connection Lines */}
      <motion.g
        stroke="#fff"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <motion.path
          d="M 200 140 L 150 100"
          animate={{ strokeDashoffset: [0, -8] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 200 140 L 250 100"
          animate={{ strokeDashoffset: [0, -8] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 200 140 L 150 180"
          animate={{ strokeDashoffset: [0, -8] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 200 140 L 250 180"
          animate={{ strokeDashoffset: [0, -8] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </motion.g>

      {/* Data Points */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5, staggerChildren: 0.1 }}
      >
        <motion.circle
          cx="150"
          cy="100"
          r="12"
          fill="#fff"
          opacity="0.9"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="250"
          cy="100"
          r="12"
          fill="#fff"
          opacity="0.9"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.circle
          cx="150"
          cy="180"
          r="12"
          fill="#fff"
          opacity="0.9"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.circle
          cx="250"
          cy="180"
          r="12"
          fill="#fff"
          opacity="0.9"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </motion.g>

      {/* Sales Chart */}
      <motion.path
        d="M 120 220 L 140 210 L 160 215 L 180 200 L 200 205 L 220 190 L 240 195 L 260 180 L 280 185"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      />

      {/* Email Icon */}
      <motion.g
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <rect x="265" y="70" width="30" height="20" rx="3" fill="#fff" opacity="0.9"/>
        <path d="M 265 70 L 280 82 L 295 70" stroke="#a855f7" strokeWidth="2" fill="none"/>
      </motion.g>

      <defs>
        <linearGradient id="crmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7"/>
          <stop offset="50%" stopColor="#9333ea"/>
          <stop offset="100%" stopColor="#ec4899"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
