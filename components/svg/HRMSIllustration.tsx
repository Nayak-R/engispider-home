'use client';

import { motion } from 'framer-motion';

export default function HRMSIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      {/* Background Circle */}
      <motion.circle
        cx="200"
        cy="150"
        r="120"
        fill="url(#hrmsGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Users Group */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* User 1 */}
        <circle cx="160" cy="120" r="20" fill="#fff" opacity="0.9"/>
        <path d="M160 145 C 145 145, 145 165, 145 165 L 175 165 C 175 165, 175 145, 160 145 Z" fill="#fff" opacity="0.9"/>

        {/* User 2 */}
        <circle cx="200" cy="110" r="24" fill="#fff"/>
        <path d="M200 140 C 182 140, 182 165, 182 165 L 218 165 C 218 165, 218 140, 200 140 Z" fill="#fff"/>

        {/* User 3 */}
        <circle cx="240" cy="120" r="20" fill="#fff" opacity="0.9"/>
        <path d="M240 145 C 225 145, 225 165, 225 165 L 255 165 C 255 165, 255 145, 240 145 Z" fill="#fff" opacity="0.9"/>
      </motion.g>

      {/* Data Lines */}
      <motion.g
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <motion.path
          d="M 120 180 L 280 180"
          opacity="0.6"
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 130 195 L 270 195"
          opacity="0.5"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.path
          d="M 140 210 L 260 210"
          opacity="0.4"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
      </motion.g>

      {/* Clock Icon */}
      <motion.g
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <circle cx="280" cy="80" r="15" fill="#fff" opacity="0.9"/>
        <motion.path
          d="M 280 70 L 280 80 L 287 85"
          stroke="#0ea5e9"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '280px 80px' }}
        />
      </motion.g>

      {/* Chart Icon */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <rect x="110" y="85" width="8" height="15" fill="#fff" opacity="0.8" rx="2"/>
        <rect x="122" y="75" width="8" height="25" fill="#fff" opacity="0.9" rx="2"/>
        <rect x="134" y="70" width="8" height="30" fill="#fff" rx="2"/>
      </motion.g>

      <defs>
        <linearGradient id="hrmsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6"/>
          <stop offset="50%" stopColor="#2563eb"/>
          <stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
