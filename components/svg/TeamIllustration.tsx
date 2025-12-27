'use client';

import { motion } from 'framer-motion';

export default function TeamIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      {/* Background Circle */}
      <motion.circle
        cx="200"
        cy="150"
        r="120"
        fill="url(#teamGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Central Collaboration Hub */}
      <motion.circle
        cx="200"
        cy="150"
        r="30"
        fill="#fff"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      />

      {/* Lightning bolt icon - made more visible */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        {/* Lightning bolt shape */}
        <motion.path
          d="M 207 137 L 197 150 L 203 150 L 193 163 L 210 147 L 203 147 Z"
          fill="#fbbf24"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeLinejoin="round"
          animate={{
            opacity: [0.9, 1, 0.9],
            scale: [1, 1.08, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: '200px 150px' }}
        />

        {/* Glow effect */}
        <motion.path
          d="M 207 137 L 197 150 L 203 150 L 193 163 L 210 147 L 203 147 Z"
          fill="#fbbf24"
          opacity="0.3"
          filter="blur(2px)"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: '200px 150px' }}
        />
      </motion.g>

      {/* Team Members - 6 positions around center */}
      {[0, 60, 120, 180, 240, 300].map((angle, index) => {
        const radius = 80;
        const x = Math.round((200 + radius * Math.cos((angle * Math.PI) / 180)) * 100) / 100;
        const y = Math.round((150 + radius * Math.sin((angle * Math.PI) / 180)) * 100) / 100;

        return (
          <motion.g
            key={angle}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
          >
            {/* Person circle */}
            <motion.circle
              cx={x}
              cy={y}
              r="20"
              fill="#fff"
              opacity="0.95"
              animate={{ y: [y - 2, y + 2, y - 2] }}
              transition={{ duration: 2 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Person head */}
            <circle cx={x} cy={y - 5} r="6" fill="#3b82f6" opacity="0.8"/>

            {/* Person body */}
            <path
              d={`M ${x} ${y + 2} Q ${x - 5} ${y + 8}, ${x - 6} ${y + 12} M ${x} ${y + 2} Q ${x + 5} ${y + 8}, ${x + 6} ${y + 12}`}
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.8"
              fill="none"
            />

            {/* Connection line to center */}
            <motion.line
              x1={x}
              y1={y}
              x2="200"
              y2="150"
              stroke="#fff"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, strokeDashoffset: [0, -8] }}
              transition={{
                pathLength: { delay: 1 + index * 0.1, duration: 0.8 },
                strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: "linear" }
              }}
            />
          </motion.g>
        );
      })}

      {/* Data flowing indicators */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '200px 150px' }}
      >
        <motion.circle
          cx="240"
          cy="150"
          r="4"
          fill="#10b981"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="160"
          cy="150"
          r="4"
          fill="#f59e0b"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle
          cx="200"
          cy="110"
          r="4"
          fill="#ec4899"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        <motion.circle
          cx="200"
          cy="190"
          r="4"
          fill="#8b5cf6"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />
      </motion.g>

      {/* Communication waves */}
      <motion.g opacity="0.3">
        <motion.circle
          cx="200"
          cy="150"
          r="50"
          stroke="#fff"
          strokeWidth="2"
          fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.circle
          cx="200"
          cy="150"
          r="50"
          stroke="#fff"
          strokeWidth="2"
          fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
        />
      </motion.g>

      <defs>
        <linearGradient id="teamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981"/>
          <stop offset="50%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#8b5cf6"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
