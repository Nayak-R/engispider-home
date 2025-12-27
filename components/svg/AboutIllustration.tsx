'use client';

import { motion } from 'framer-motion';

export default function AboutIllustration() {
  return (
    <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="aboutGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6">
            <animate attributeName="stop-color" values="#3b82f6;#06b6d4;#3b82f6" dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#06b6d4">
            <animate attributeName="stop-color" values="#06b6d4;#3b82f6;#06b6d4" dur="4s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>

        <filter id="aboutGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background elements */}
      <motion.circle
        cx="100"
        cy="100"
        r="50"
        fill="#3b82f6"
        opacity="0.05"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 4,
          repeat: Infinity
        }}
      />

      <motion.circle
        cx="400"
        cy="400"
        r="60"
        fill="#06b6d4"
        opacity="0.05"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 1
        }}
      />

      {/* Connecting lines - back layer */}
      {[
        { angle: 0, delay: 0 },
        { angle: 72, delay: 0.1 },
        { angle: 144, delay: 0.2 },
        { angle: 216, delay: 0.3 },
        { angle: 288, delay: 0.4 }
      ].map((item, index) => {
        const radius = 140;
        const x = Math.round((250 + radius * Math.cos((item.angle * Math.PI) / 180)) * 100) / 100;
        const y = Math.round((250 + radius * Math.sin((item.angle * Math.PI) / 180)) * 100) / 100;

        return (
          <motion.line
            key={`line-${index}`}
            x1="250"
            y1="250"
            x2={x}
            y2={y}
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            opacity="0.2"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.2,
              strokeDashoffset: [0, -10]
            }}
            transition={{
              opacity: { delay: item.delay + 0.3, duration: 0.6 },
              strokeDashoffset: { duration: 2.5, repeat: Infinity, ease: "linear" }
            }}
          />
        );
      })}

      {/* Central team/people hub */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Main circle */}
        <motion.circle
          cx="250"
          cy="250"
          r="50"
          fill="url(#aboutGradient1)"
          opacity="0.2"
          filter="url(#aboutGlow)"
        />

        <motion.circle
          cx="250"
          cy="250"
          r="40"
          fill="url(#aboutGradient1)"
          opacity="0.9"
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />

        {/* Team icon - simplified people */}
        <g>
          {/* Person 1 */}
          <circle cx="235" cy="240" r="6" fill="#fff" opacity="0.9"/>
          <path d="M 235 247 Q 235 252 230 255 L 240 255 Q 235 252 235 247" fill="#fff" opacity="0.9"/>

          {/* Person 2 */}
          <circle cx="250" cy="235" r="7" fill="#fff" opacity="1"/>
          <path d="M 250 243 Q 250 249 244 252 L 256 252 Q 250 249 250 243" fill="#fff" opacity="1"/>

          {/* Person 3 */}
          <circle cx="265" cy="240" r="6" fill="#fff" opacity="0.9"/>
          <path d="M 265 247 Q 265 252 260 255 L 270 255 Q 265 252 265 247" fill="#fff" opacity="0.9"/>
        </g>

        {/* Pulse ring */}
        <motion.circle
          cx="250"
          cy="250"
          r="40"
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0, 0.4]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
        />
      </motion.g>

      {/* Value/Achievement nodes */}
      {[
        { angle: 0, delay: 0, color: '#3b82f6', icon: 'I', label: 'Innovation' },
        { angle: 72, delay: 0.1, color: '#10b981', icon: 'Q', label: 'Quality' },
        { angle: 144, delay: 0.2, color: '#8b5cf6', icon: 'T', label: 'Trust' },
        { angle: 216, delay: 0.3, color: '#f59e0b', icon: 'E', label: 'Excellence' },
        { angle: 288, delay: 0.4, color: '#ec4899', icon: 'P', label: 'Passion' }
      ].map((item, index) => {
        const radius = 140;
        const x = Math.round((250 + radius * Math.cos((item.angle * Math.PI) / 180)) * 100) / 100;
        const y = Math.round((250 + radius * Math.sin((item.angle * Math.PI) / 180)) * 100) / 100;

        return (
          <motion.g
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item.delay + 0.3, duration: 0.6 }}
          >
            <motion.g
              animate={{
                y: [0, -8, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut"
              }}
            >
              {/* Outer glow */}
              <circle
                cx={x}
                cy={y}
                r="28"
                fill={item.color}
                opacity="0.15"
                filter="url(#aboutGlow)"
              />

              {/* Main circle */}
              <motion.circle
                cx={x}
                cy={y}
                r="22"
                fill={item.color}
                opacity="0.9"
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: item.delay
                }}
              />

              {/* Icon */}
              <text
                x={x}
                y={y + 6}
                fontSize="16"
                fill="#fff"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="sans-serif"
              >
                {item.icon}
              </text>

              {/* Outer ring */}
              <motion.circle
                cx={x}
                cy={y}
                r="26"
                fill="none"
                stroke={item.color}
                strokeWidth="1.5"
                opacity="0.5"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: item.delay + 0.5
                }}
              />
            </motion.g>
          </motion.g>
        );
      })}

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => {
        const angle = i * 45;
        const startRadius = 60;
        const endRadius = 120;

        return (
          <motion.circle
            key={`particle-${i}`}
            cx="250"
            cy="250"
            r="2.5"
            fill="#3b82f6"
            opacity="0.6"
            animate={{
              x: [
                Math.cos((angle * Math.PI) / 180) * startRadius,
                Math.cos((angle * Math.PI) / 180) * endRadius,
                Math.cos((angle * Math.PI) / 180) * startRadius
              ],
              y: [
                Math.sin((angle * Math.PI) / 180) * startRadius,
                Math.sin((angle * Math.PI) / 180) * endRadius,
                Math.sin((angle * Math.PI) / 180) * startRadius
              ],
              opacity: [0, 0.8, 0],
              scale: [0, 1.2, 0]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        );
      })}

      {/* Decorative stars */}
      {[
        { x: 120, y: 180, delay: 0 },
        { x: 380, y: 320, delay: 1.2 }
      ].map((star, i) => (
        <motion.g
          key={`star-${i}`}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: star.delay
          }}
        >
          <path
            d={`M ${star.x} ${star.y - 8} L ${star.x + 2} ${star.y - 2} L ${star.x + 8} ${star.y} L ${star.x + 2} ${star.y + 2} L ${star.x} ${star.y + 8} L ${star.x - 2} ${star.y + 2} L ${star.x - 8} ${star.y} L ${star.x - 2} ${star.y - 2} Z`}
            fill="#06b6d4"
            opacity="0.6"
          />
        </motion.g>
      ))}

      {/* Outer rings */}
      {[0, 1].map((i) => (
        <motion.circle
          key={`ring-${i}`}
          cx="250"
          cy="250"
          r="160"
          stroke="url(#aboutGradient1)"
          strokeWidth="2"
          fill="none"
          opacity="0.15"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeOut"
          }}
        />
      ))}
    </svg>
  );
}
