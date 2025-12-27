'use client';

import { motion } from 'framer-motion';

export default function InventoryIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      {/* Background Circle */}
      <motion.circle
        cx="200"
        cy="150"
        r="120"
        fill="url(#inventoryGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Warehouse/Boxes */}
      <motion.g
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Box 1 */}
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.rect x="140" y="130" width="40" height="40" fill="#fff" opacity="0.9" rx="4"
            whileHover={{ scale: 1.1 }}
          />
          <path d="M 140 150 L 180 150" stroke="#10b981" strokeWidth="2"/>
          <path d="M 160 130 L 160 170" stroke="#10b981" strokeWidth="2"/>
        </motion.g>

        {/* Box 2 */}
        <motion.g
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <motion.rect x="190" y="120" width="50" height="50" fill="#fff" rx="4"
            whileHover={{ scale: 1.1 }}
          />
          <path d="M 190 145 L 240 145" stroke="#10b981" strokeWidth="2"/>
          <path d="M 215 120 L 215 170" stroke="#10b981" strokeWidth="2"/>
        </motion.g>

        {/* Box 3 */}
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <motion.rect x="250" y="135" width="35" height="35" fill="#fff" opacity="0.9" rx="4"
            whileHover={{ scale: 1.1 }}
          />
          <path d="M 250 152 L 285 152" stroke="#10b981" strokeWidth="2"/>
          <path d="M 267 135 L 267 170" stroke="#10b981" strokeWidth="2"/>
        </motion.g>
      </motion.g>

      {/* Barcode Scanner */}
      <motion.g
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <rect x="120" y="85" width="50" height="30" rx="5" fill="#fff" opacity="0.9"/>
        <motion.g
          opacity="0.7"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="128" y="92" width="2" height="16" fill="#10b981"/>
          <rect x="133" y="92" width="3" height="16" fill="#10b981"/>
          <rect x="139" y="92" width="2" height="16" fill="#10b981"/>
          <rect x="144" y="92" width="4" height="16" fill="#10b981"/>
          <rect x="151" y="92" width="2" height="16" fill="#10b981"/>
          <rect x="156" y="92" width="3" height="16" fill="#10b981"/>
          <rect x="162" y="92" width="2" height="16" fill="#10b981"/>
        </motion.g>
      </motion.g>

      {/* Checkmark for stock verification */}
      <motion.path
        d="M 265 95 L 275 105 L 290 85"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      />

      {/* Stock Level Indicator */}
      <motion.g
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{ transformOrigin: 'center bottom' }}
      >
        <rect x="130" y="200" width="140" height="15" rx="7" fill="#fff" opacity="0.3"/>
        <rect x="130" y="200" width="105" height="15" rx="7" fill="#fff"/>
        <text x="203" y="211" fontSize="10" fill="#10b981" fontWeight="bold">75%</text>
      </motion.g>

      <defs>
        <linearGradient id="inventoryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981"/>
          <stop offset="50%" stopColor="#059669"/>
          <stop offset="100%" stopColor="#34d399"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
