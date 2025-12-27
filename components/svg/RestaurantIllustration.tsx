'use client';

import { motion } from 'framer-motion';

export default function RestaurantIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      {/* Background Circle */}
      <motion.circle
        cx="200"
        cy="150"
        r="120"
        fill="url(#restaurantGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* POS/Cash Register */}
      <motion.g
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Monitor Screen */}
        <rect x="160" y="90" width="80" height="60" rx="4" fill="#fff"/>
        <rect x="165" y="95" width="70" height="45" rx="2" fill="#1f2937"/>

        {/* Screen Content - Menu Items */}
        <motion.g
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <rect x="170" y="100" width="30" height="8" rx="2" fill="#fbbf24"/>
          <rect x="170" y="112" width="40" height="8" rx="2" fill="#fbbf24"/>
          <rect x="170" y="124" width="25" height="8" rx="2" fill="#fbbf24"/>
        </motion.g>

        {/* Price Display */}
        <motion.text
          x="220"
          y="120"
          fontSize="16"
          fill="#10b981"
          fontWeight="bold"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ₹499
        </motion.text>

        {/* Base/Stand */}
        <rect x="185" y="150" width="30" height="8" rx="2" fill="#fff"/>
        <rect x="175" y="158" width="50" height="6" rx="3" fill="#fff" opacity="0.9"/>
      </motion.g>

      {/* Chef Hat */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <ellipse cx="130" cy="125" rx="25" ry="12" fill="#fff"/>
        <rect x="105" y="125" width="50" height="30" rx="4" fill="#fff"/>
        <ellipse cx="130" cy="120" rx="28" ry="18" fill="#fff"/>
        <motion.path
          d="M 115 135 Q 130 125, 145 135"
          stroke="#f59e0b"
          strokeWidth="2"
          fill="none"
          animate={{ strokeDashoffset: [0, 10] }}
          strokeDasharray="2 3"
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.g>

      {/* Menu Board */}
      <motion.g
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <rect x="250" y="80" width="45" height="65" rx="3" fill="#fff" opacity="0.95"/>
        <rect x="253" y="83" width="39" height="8" rx="2" fill="#f59e0b"/>

        {/* Menu Items */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="256" y="95" width="25" height="3" rx="1" fill="#d97706"/>
          <rect x="256" y="101" width="30" height="3" rx="1" fill="#d97706"/>
          <rect x="256" y="107" width="20" height="3" rx="1" fill="#d97706"/>
          <rect x="256" y="113" width="28" height="3" rx="1" fill="#d97706"/>
          <rect x="256" y="119" width="22" height="3" rx="1" fill="#d97706"/>
          <rect x="256" y="125" width="26" height="3" rx="1" fill="#d97706"/>
          <rect x="256" y="131" width="24" height="3" rx="1" fill="#d97706"/>
        </motion.g>
      </motion.g>

      {/* Cloche/Food Cover */}
      <motion.g
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        {/* Base Plate */}
        <ellipse cx="200" cy="210" rx="45" ry="8" fill="#fff" opacity="0.9"/>

        {/* Cloche Dome */}
        <motion.path
          d="M 160 210 Q 160 175, 200 175 Q 240 175, 240 210 Z"
          fill="#fff"
          opacity="0.85"
          animate={{ opacity: [0.85, 0.95, 0.85] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Handle */}
        <ellipse cx="200" cy="175" rx="8" ry="5" fill="#fff"/>

        {/* Steam */}
        <motion.g
          animate={{ y: [0, -8, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        >
          <path d="M 190 168 Q 185 160, 190 152" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
          <path d="M 200 168 Q 195 158, 200 148" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
          <path d="M 210 168 Q 215 160, 210 152" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        </motion.g>
      </motion.g>

      {/* Order/Table Number */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <circle cx="130" cy="200" r="18" fill="#fff" opacity="0.95"/>
        <motion.text
          x="130"
          y="208"
          fontSize="18"
          fill="#f59e0b"
          fontWeight="bold"
          textAnchor="middle"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          #5
        </motion.text>
      </motion.g>

      {/* Notification Bell */}
      <motion.g
        initial={{ rotate: -20 }}
        animate={{ rotate: [0, -15, 15, -15, 0] }}
        transition={{ delay: 1.8, duration: 0.8, repeat: Infinity, repeatDelay: 3 }}
        style={{ transformOrigin: '270px 110px' }}
      >
        <path d="M 270 120 Q 260 118, 260 110 Q 260 102, 270 100 Q 280 102, 280 110 Q 280 118, 270 120 Z" fill="#fff"/>
        <rect x="265" y="120" width="10" height="4" rx="2" fill="#fff"/>
        <circle cx="270" cy="96" r="3" fill="#ef4444">
          <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite"/>
        </circle>
      </motion.g>

      <defs>
        <linearGradient id="restaurantGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b"/>
          <stop offset="50%" stopColor="#d97706"/>
          <stop offset="100%" stopColor="#fbbf24"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
