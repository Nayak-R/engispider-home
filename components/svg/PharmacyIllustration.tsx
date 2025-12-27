'use client';

import { motion } from 'framer-motion';

export default function PharmacyIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      {/* Background Circle */}
      <motion.circle
        cx="200"
        cy="150"
        r="120"
        fill="url(#pharmacyGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Medicine Bottle */}
      <motion.g
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <rect x="170" y="120" width="60" height="80" rx="8" fill="#fff"/>
        <rect x="180" y="110" width="40" height="15" rx="3" fill="#fff" opacity="0.9"/>
        <ellipse cx="200" cy="150" rx="20" ry="25" fill="#ef4444" opacity="0.3"/>
        <text x="200" y="158" fontSize="24" fill="#ef4444" fontWeight="bold" textAnchor="middle">Rx</text>
      </motion.g>

      {/* Pills Floating */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, staggerChildren: 0.1 }}
      >
        <motion.ellipse
          cx="140" cy="110" rx="12" ry="8"
          fill="#fff"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.ellipse
          cx="260" cy="120" rx="12" ry="8"
          fill="#fff"
          opacity="0.9"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.circle
          cx="145" cy="180" r="10"
          fill="#fff"
          opacity="0.9"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
        <motion.circle
          cx="255" cy="170" r="10"
          fill="#fff"
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        />
      </motion.g>

      {/* Medical Cross */}
      <motion.g
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <rect x="265" y="75" width="8" height="24" rx="2" fill="#fff"/>
        <rect x="257" y="83" width="24" height="8" rx="2" fill="#fff"/>
      </motion.g>

      {/* Prescription Paper */}
      <motion.g
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <rect x="110" y="80" width="35" height="45" rx="3" fill="#fff" opacity="0.9"/>
        <path d="M 118 90 L 137 90 M 118 97 L 137 97 M 118 104 L 132 104 M 118 111 L 137 111"
          stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      </motion.g>

      {/* Alert Icon for Expiry */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        <circle cx="130" cy="200" r="12" fill="#fff" opacity="0.9"/>
        <text x="130" y="207" fontSize="16" fill="#f59e0b" fontWeight="bold" textAnchor="middle">!</text>
      </motion.g>

      <defs>
        <linearGradient id="pharmacyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444"/>
          <stop offset="50%" stopColor="#dc2626"/>
          <stop offset="100%" stopColor="#f97316"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
