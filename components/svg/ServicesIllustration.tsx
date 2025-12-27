'use client';

import { motion } from 'framer-motion';

export default function ServicesIllustration() {
  return (
    <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="servicesGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6">
            <animate attributeName="stop-color" values="#8b5cf6;#3b82f6;#8b5cf6" dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#ec4899">
            <animate attributeName="stop-color" values="#ec4899;#8b5cf6;#ec4899" dur="4s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>

        <linearGradient id="servicesGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#10b981"/>
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background code brackets */}
      <motion.text
        x="50"
        y="100"
        fontSize="120"
        fill="#fff"
        opacity="0.05"
        fontFamily="monospace"
        fontWeight="bold"
        animate={{
          y: [100, 90, 100],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {'</>'}
      </motion.text>

      <motion.text
        x="320"
        y="400"
        fontSize="100"
        fill="#fff"
        opacity="0.05"
        fontFamily="monospace"
        fontWeight="bold"
        animate={{
          y: [400, 390, 400],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        {'{}'}
      </motion.text>

      {/* Connecting lines - rendered first (back layer) */}
      {[
        { angle: 0, delay: 0, color: '#3b82f6', label: 'WEB', size: 45 },
        { angle: 60, delay: 0.1, color: '#10b981', label: 'API', size: 40 },
        { angle: 120, delay: 0.2, color: '#8b5cf6', label: 'APP', size: 42 },
        { angle: 180, delay: 0.3, color: '#f59e0b', label: 'DB', size: 38 },
        { angle: 240, delay: 0.4, color: '#ec4899', label: 'UI', size: 41 },
        { angle: 300, delay: 0.5, color: '#06b6d4', label: 'AI', size: 39 }
      ].map((item, index) => {
        const radius = 160;
        const x = Math.round((250 + radius * Math.cos((item.angle * Math.PI) / 180)) * 100) / 100;
        const y = Math.round((250 + radius * Math.sin((item.angle * Math.PI) / 180)) * 100) / 100;

        return (
          <motion.line
            key={`line-${index}`}
            x1="250"
            y1="250"
            x2={x}
            y2={y}
            stroke="#fff"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.2"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.2,
              strokeDashoffset: [0, -8]
            }}
            transition={{
              opacity: { delay: item.delay + 0.3, duration: 0.6 },
              strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
            }}
          />
        );
      })}

      {/* Central Laptop/Code Screen */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Laptop base */}
        <motion.path
          d="M 180 280 L 320 280 L 340 300 L 160 300 Z"
          fill="url(#servicesGradient1)"
          opacity="0.9"
          animate={{
            opacity: [0.9, 1, 0.9]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />

        {/* Laptop screen */}
        <motion.rect
          x="190"
          y="160"
          width="120"
          height="120"
          rx="5"
          fill="#1e293b"
          stroke="url(#servicesGradient1)"
          strokeWidth="3"
        />

        {/* Code lines on screen */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect
            key={`line-${i}`}
            x="200"
            y={175 + i * 20}
            width={80 - i * 10}
            height="3"
            rx="1.5"
            fill="#8b5cf6"
            opacity="0.7"
            animate={{
              opacity: [0.4, 0.9, 0.4],
              width: [80 - i * 10, 90 - i * 10, 80 - i * 10]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}

        {/* Screen glow */}
        <motion.rect
          x="190"
          y="160"
          width="120"
          height="120"
          rx="5"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="2"
          opacity="0.3"
          filter="url(#glow)"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
      </motion.g>

      {/* Orbiting Tech Icons - rendered last (front layer) */}
      {[
        { angle: 0, delay: 0, color: '#3b82f6', label: 'WEB', size: 45 },
        { angle: 60, delay: 0.1, color: '#10b981', label: 'API', size: 40 },
        { angle: 120, delay: 0.2, color: '#8b5cf6', label: 'APP', size: 42 },
        { angle: 180, delay: 0.3, color: '#f59e0b', label: 'DB', size: 38 },
        { angle: 240, delay: 0.4, color: '#ec4899', label: 'UI', size: 41 },
        { angle: 300, delay: 0.5, color: '#06b6d4', label: 'AI', size: 39 }
      ].map((item, index) => {
        const radius = 160;
        const x = Math.round((250 + radius * Math.cos((item.angle * Math.PI) / 180)) * 100) / 100;
        const y = Math.round((250 + radius * Math.sin((item.angle * Math.PI) / 180)) * 100) / 100;

        return (
          <motion.g
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item.delay + 0.3, duration: 0.6 }}
          >
            {/* Orbiting circle container */}
            <motion.g
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
                delay: item.delay
              }}
              style={{ transformOrigin: '250px 250px' }}
            >
              {/* Icon circle with gradient */}
              <motion.circle
                cx={x}
                cy={y}
                r={item.size / 2}
                fill={item.color}
                opacity="0.15"
                filter="url(#glow)"
              />

              <motion.circle
                cx={x}
                cy={y}
                r={item.size / 2.5}
                fill={item.color}
                opacity="0.9"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: item.delay
                }}
              />

              {/* Tech label */}
              <text
                x={x}
                y={y + 5}
                fontSize="11"
                fill="#fff"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="sans-serif"
              >
                {item.label}
              </text>

              {/* Outer ring */}
              <motion.circle
                cx={x}
                cy={y}
                r={item.size / 2 + 5}
                fill="none"
                stroke={item.color}
                strokeWidth="1.5"
                opacity="0.4"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0, 0.4]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: item.delay + 0.5
                }}
              />
            </motion.g>
          </motion.g>
        );
      })}

      {/* Floating data particles */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30);
        const startRadius = 80;
        const endRadius = 140;

        return (
          <motion.circle
            key={`particle-${i}`}
            cx="250"
            cy="250"
            r="2"
            fill="#fff"
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
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut"
            }}
          />
        );
      })}

      {/* Sparkle effects */}
      {[
        { x: 100, y: 150, delay: 0 },
        { x: 400, y: 350, delay: 1 },
        { x: 150, y: 400, delay: 0.5 },
        { x: 380, y: 120, delay: 1.5 }
      ].map((sparkle, i) => (
        <motion.g
          key={`sparkle-${i}`}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: sparkle.delay
          }}
        >
          <path
            d={`M ${sparkle.x} ${sparkle.y - 6} L ${sparkle.x} ${sparkle.y + 6} M ${sparkle.x - 6} ${sparkle.y} L ${sparkle.x + 6} ${sparkle.y}`}
            stroke="#fbbf24"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.g>
      ))}

      {/* Outer pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={`ring-${i}`}
          cx="250"
          cy="250"
          r="180"
          stroke="url(#servicesGradient1)"
          strokeWidth="2"
          fill="none"
          opacity="0.15"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
            ease: "easeOut"
          }}
        />
      ))}
    </svg>
  );
}
