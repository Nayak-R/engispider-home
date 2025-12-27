'use client';

import { motion } from 'framer-motion';

export default function InnovationIllustration() {
  return (
    <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="solutionsGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1">
            <animate attributeName="stop-color" values="#6366f1;#8b5cf6;#6366f1" dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#a855f7">
            <animate attributeName="stop-color" values="#a855f7;#6366f1;#a855f7" dur="4s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>

        <filter id="solutionsGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background decorative elements */}
      <motion.circle
        cx="80"
        cy="80"
        r="40"
        fill="#6366f1"
        opacity="0.06"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.06, 0.12, 0.06]
        }}
        transition={{
          duration: 5,
          repeat: Infinity
        }}
      />

      <motion.circle
        cx="420"
        cy="420"
        r="50"
        fill="#a855f7"
        opacity="0.06"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.06, 0.12, 0.06]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 1.5
        }}
      />

      {/* Connecting lines - back layer */}
      {[
        { angle: 0, delay: 0 },
        { angle: 60, delay: 0.1 },
        { angle: 120, delay: 0.2 },
        { angle: 180, delay: 0.3 },
        { angle: 240, delay: 0.4 },
        { angle: 300, delay: 0.5 }
      ].map((item, index) => {
        const radius = 150;
        const x = Math.round((250 + radius * Math.cos((item.angle * Math.PI) / 180)) * 100) / 100;
        const y = Math.round((250 + radius * Math.sin((item.angle * Math.PI) / 180)) * 100) / 100;

        return (
          <motion.line
            key={`line-${index}`}
            x1="250"
            y1="250"
            x2={x}
            y2={y}
            stroke="url(#solutionsGradient1)"
            strokeWidth="2"
            strokeDasharray="6 6"
            opacity="0.3"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.3,
              strokeDashoffset: [0, -12]
            }}
            transition={{
              opacity: { delay: item.delay + 0.3, duration: 0.6 },
              strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" }
            }}
          />
        );
      })}

      {/* Central Solutions Hub */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Outer glow circle */}
        <motion.circle
          cx="250"
          cy="250"
          r="55"
          fill="url(#solutionsGradient1)"
          opacity="0.2"
          filter="url(#solutionsGlow)"
        />

        {/* Main hub circle */}
        <motion.circle
          cx="250"
          cy="250"
          r="45"
          fill="url(#solutionsGradient1)"
          opacity="0.95"
          animate={{
            scale: [1, 1.08, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity
          }}
        />

        {/* Grid/Network icon in center */}
        <g opacity="0.9">
          {/* 3x3 grid dots */}
          {[-15, 0, 15].map((x) =>
            [-15, 0, 15].map((y) => (
              <circle
                key={`${x}-${y}`}
                cx={250 + x}
                cy={250 + y}
                r="3"
                fill="#fff"
              />
            ))
          )}
          {/* Connecting lines between dots */}
          <path d="M 235 235 L 265 235 M 235 250 L 265 250 M 235 265 L 265 265" stroke="#fff" strokeWidth="1.5" opacity="0.6"/>
          <path d="M 235 235 L 235 265 M 250 235 L 250 265 M 265 235 L 265 265" stroke="#fff" strokeWidth="1.5" opacity="0.6"/>
        </g>

        {/* Pulsing ring */}
        <motion.circle
          cx="250"
          cy="250"
          r="45"
          stroke="#6366f1"
          strokeWidth="2.5"
          fill="none"
          opacity="0.5"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
        />
      </motion.g>

      {/* 6 Solution Category Nodes */}
      {[
        { angle: 0, delay: 0, color: '#3b82f6', label: 'HR', name: 'HRMS' },
        { angle: 60, delay: 0.1, color: '#8b5cf6', label: 'CR', name: 'CRM' },
        { angle: 120, delay: 0.2, color: '#10b981', label: 'IV', name: 'Inventory' },
        { angle: 180, delay: 0.3, color: '#ef4444', label: 'PH', name: 'Pharmacy' },
        { angle: 240, delay: 0.4, color: '#f59e0b', label: 'RS', name: 'Restaurant' },
        { angle: 300, delay: 0.5, color: '#6366f1', label: 'BS', name: 'Business' }
      ].map((item, index) => {
        const radius = 150;
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
                y: [0, -10, 0]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut"
              }}
            >
              {/* Outer glow */}
              <circle
                cx={x}
                cy={y}
                r="32"
                fill={item.color}
                opacity="0.2"
                filter="url(#solutionsGlow)"
              />

              {/* Main circle */}
              <motion.circle
                cx={x}
                cy={y}
                r="25"
                fill={item.color}
                opacity="0.9"
                animate={{
                  scale: [1, 1.12, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: item.delay
                }}
              />

              {/* Label */}
              <text
                x={x}
                y={y + 5}
                fontSize="14"
                fill="#fff"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="sans-serif"
              >
                {item.label}
              </text>

              {/* Pulse ring */}
              <motion.circle
                cx={x}
                cy={y}
                r="28"
                fill="none"
                stroke={item.color}
                strokeWidth="2"
                opacity="0.6"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: item.delay + 0.8
                }}
              />
            </motion.g>
          </motion.g>
        );
      })}

      {/* Orbiting data particles */}
      {[...Array(10)].map((_, i) => {
        const angle = i * 36;
        const orbitRadius = 100;

        return (
          <motion.circle
            key={`orbit-${i}`}
            cx="250"
            cy="250"
            r="2.5"
            fill="#a855f7"
            opacity="0.7"
            animate={{
              x: [
                Math.cos((angle * Math.PI) / 180) * orbitRadius,
                Math.cos(((angle + 360) * Math.PI) / 180) * orbitRadius
              ],
              y: [
                Math.sin((angle * Math.PI) / 180) * orbitRadius,
                Math.sin(((angle + 360) * Math.PI) / 180) * orbitRadius
              ]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "linear"
            }}
          />
        );
      })}

      {/* Floating energy particles */}
      {[...Array(6)].map((_, i) => {
        const angle = i * 60;
        const startRadius = 70;
        const endRadius = 130;

        return (
          <motion.circle
            key={`particle-${i}`}
            cx="250"
            cy="250"
            r="3"
            fill="#6366f1"
            opacity="0.5"
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
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        );
      })}

      {/* Diamond sparkles */}
      {[
        { x: 100, y: 160, delay: 0 },
        { x: 400, y: 340, delay: 1.5 }
      ].map((sparkle, i) => (
        <motion.g
          key={`sparkle-${i}`}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.7, 1.3, 0.7],
            rotate: [0, 90, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: sparkle.delay
          }}
        >
          <path
            d={`M ${sparkle.x} ${sparkle.y - 10} L ${sparkle.x + 4} ${sparkle.y} L ${sparkle.x} ${sparkle.y + 10} L ${sparkle.x - 4} ${sparkle.y} Z`}
            fill="#a855f7"
            opacity="0.7"
          />
        </motion.g>
      ))}

      {/* Outer rotating ring */}
      <motion.circle
        cx="250"
        cy="250"
        r="190"
        stroke="url(#solutionsGradient1)"
        strokeWidth="2"
        fill="none"
        opacity="0.2"
        strokeDasharray="10 5"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transformOrigin: '250px 250px' }}
      />

      {/* Pulse rings */}
      {[0, 1].map((i) => (
        <motion.circle
          key={`pulse-${i}`}
          cx="250"
          cy="250"
          r="170"
          stroke="url(#solutionsGradient1)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.2"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 2.5,
            ease: "easeOut"
          }}
        />
      ))}
    </svg>
  );
}
