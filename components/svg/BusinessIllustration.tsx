'use client';

import { motion } from 'framer-motion';

export default function BusinessIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      {/* Background Circle */}
      <motion.circle
        cx="200"
        cy="150"
        r="120"
        fill="url(#businessGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Laptop */}
      <motion.g
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <rect x="140" y="130" width="120" height="70" rx="4" fill="#fff"/>
        <rect x="145" y="135" width="110" height="55" rx="2" fill="#6366f1" opacity="0.3"/>
        <rect x="130" y="200" width="140" height="5" rx="2" fill="#fff"/>
      </motion.g>

      {/* Code Lines on Screen */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, staggerChildren: 0.1 }}
      >
        <motion.rect x="155" y="145" width="40" height="3" rx="1" fill="#6366f1" opacity="0.7"/>
        <motion.rect x="155" y="153" width="60" height="3" rx="1" fill="#8b5cf6" opacity="0.7"/>
        <motion.rect x="155" y="161" width="35" height="3" rx="1" fill="#6366f1" opacity="0.7"/>
        <motion.rect x="155" y="169" width="55" height="3" rx="1" fill="#8b5cf6" opacity="0.7"/>
        <motion.rect x="155" y="177" width="45" height="3" rx="1" fill="#6366f1" opacity="0.7"/>
      </motion.g>

      {/* Gears */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '270px 100px' }}
      >
        <circle cx="270" cy="100" r="20" fill="#fff" opacity="0.9"/>
        <circle cx="270" cy="100" r="12" fill="#6366f1" opacity="0.5"/>
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <rect
            key={angle}
            x="268"
            y="85"
            width="4"
            height="10"
            rx="2"
            fill="#fff"
            transform={`rotate(${angle} 270 100)`}
          />
        ))}
      </motion.g>

      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '240px 120px' }}
      >
        <circle cx="240" cy="120" r="15" fill="#fff" opacity="0.8"/>
        <circle cx="240" cy="120" r="9" fill="#8b5cf6" opacity="0.5"/>
        {[0, 72, 144, 216, 288].map((angle) => (
          <rect
            key={angle}
            x="238"
            y="108"
            width="4"
            height="8"
            rx="2"
            fill="#fff"
            transform={`rotate(${angle} 240 120)`}
          />
        ))}
      </motion.g>

      {/* Cloud */}
      <motion.g
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <ellipse cx="140" cy="95" rx="18" ry="12" fill="#fff" opacity="0.9"/>
        <ellipse cx="155" cy="90" rx="20" ry="15" fill="#fff" opacity="0.9"/>
        <ellipse cx="170" cy="95" rx="18" ry="12" fill="#fff" opacity="0.9"/>
        <rect x="122" y="95" width="66" height="12" fill="#fff" opacity="0.9"/>
      </motion.g>

      {/* Upload Arrow */}
      <motion.g
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: [0, -5, 0], opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.5, repeat: Infinity }}
      >
        <path d="M 155 100 L 155 85 M 155 85 L 148 92 M 155 85 L 162 92" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </motion.g>

      {/* Rocket (Growth) */}
      <motion.g
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <path d="M 120 170 L 120 190 L 125 185 L 130 190 L 130 170 L 125 165 Z" fill="#fff"/>
        <circle cx="125" cy="175" r="3" fill="#6366f1"/>
        <motion.path
          d="M 115 195 Q 115 200, 120 202 M 135 195 Q 135 200, 130 202"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </motion.g>

      {/* Chart Growth */}
      <motion.path
        d="M 265 180 L 270 170 L 275 175 L 280 160 L 285 165 L 290 150"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      />

      <defs>
        <linearGradient id="businessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1"/>
          <stop offset="50%" stopColor="#4f46e5"/>
          <stop offset="100%" stopColor="#3b82f6"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
