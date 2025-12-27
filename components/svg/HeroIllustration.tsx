'use client';

import { motion } from 'framer-motion';

export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 500 400" fill="none" className="w-full h-full">
      {/* Animated gradient background */}
      <defs>
        <linearGradient id="heroGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6">
            <animate attributeName="stop-color" values="#3b82f6;#8b5cf6;#3b82f6" dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#8b5cf6">
            <animate attributeName="stop-color" values="#8b5cf6;#ec4899;#8b5cf6" dur="4s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>

        <linearGradient id="heroGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981"/>
          <stop offset="100%" stopColor="#3b82f6"/>
        </linearGradient>
        <clipPath id="logoClip">
          <circle cx="250" cy="200" r="28" />
        </clipPath>
      </defs>

      {/* Code brackets floating */}
      <motion.text
        x="100"
        y="150"
        fontSize="60"
        fill="#fff"
        opacity="0.1"
        fontFamily="monospace"
        fontWeight="bold"
        animate={{
          y: [150, 140, 150],
          opacity: [0.1, 0.2, 0.1]
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
        x="380"
        y="250"
        fontSize="50"
        fill="#fff"
        opacity="0.1"
        fontFamily="monospace"
        fontWeight="bold"
        animate={{
          y: [250, 240, 250],
          opacity: [0.1, 0.2, 0.1]
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

      {/* Innovation spark */}
      <motion.g
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transformOrigin: '250px 200px' }}
      >
        {[0, 90, 180, 270].map((angle, i) => {
          const x = Math.round((250 + 180 * Math.cos((angle * Math.PI) / 180)) * 100) / 100;
          const y = Math.round((200 + 180 * Math.sin((angle * Math.PI) / 180)) * 100) / 100;

          return (
            <motion.circle
              key={`spark-${i}`}
              cx={x}
              cy={y}
              r="4"
              fill="#fbbf24"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          );
        })}
      </motion.g>

      {/* Data particles flowing */}
      {[...Array(8)].map((_, i) => {
        const offsetX = Math.round(Math.cos((i * 45 * Math.PI) / 180) * 80 * 100) / 100;
        const offsetY = Math.round(Math.sin((i * 45 * Math.PI) / 180) * 80 * 100) / 100;

        return (
          <motion.circle
            key={`particle-${i}`}
            cx="250"
            cy="200"
            r="3"
            fill="#fff"
            opacity="0.6"
            initial={{ opacity: 0 }}
            animate={{
              x: [0, offsetX, 0],
              y: [0, offsetY, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        );
      })}

      {/* Orbiting Elements - Representing different solutions */}
      {[
        { angle: 0, delay: 0, color: '#3b82f6', radius: 120, symbol: '●' },
        { angle: 60, delay: 0.1, color: '#8b5cf6', radius: 120, symbol: '■' },
        { angle: 120, delay: 0.2, color: '#ec4899', radius: 120, symbol: '▲' },
        { angle: 180, delay: 0.3, color: '#10b981', radius: 120, symbol: '◆' },
        { angle: 240, delay: 0.4, color: '#f59e0b', radius: 120, symbol: '★' },
        { angle: 300, delay: 0.5, color: '#ef4444', radius: 120, symbol: '✦' },
      ].map((item, index) => {
        const x = Math.round((250 + item.radius * Math.cos((item.angle * Math.PI) / 180)) * 100) / 100;
        const y = Math.round((200 + item.radius * Math.sin((item.angle * Math.PI) / 180)) * 100) / 100;

        return (
          <motion.g
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: item.delay, duration: 0.6 }}
          >
            {/* Connection line */}
            <motion.line
              x1="250"
              y1="200"
              x2={x}
              y2={y}
              stroke="#fff"
              strokeWidth="2"
              strokeDasharray="5 5"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                strokeDashoffset: [0, -10]
              }}
              transition={{
                pathLength: { delay: item.delay + 0.3, duration: 0.8 },
                strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
              }}
            />

            {/* Orbiting circle */}
            <motion.g
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                delay: item.delay
              }}
              style={{ transformOrigin: '250px 200px' }}
            >
              <motion.circle
                cx={x}
                cy={y}
                r="25"
                fill={item.color}
                opacity="0.9"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay
                }}
              />

              {/* Symbol */}
              <motion.text
                x={x}
                y={y + 7}
                fontSize="24"
                fill="#fff"
                fontWeight="bold"
                textAnchor="middle"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay
                }}
              >
                {item.symbol}
              </motion.text>
            </motion.g>
          </motion.g>
        );
      })}

      {/* Central Network Hub with Logo - Rendered last to be on top */}
      <motion.circle
        cx="250"
        cy="200"
        r="40"
        fill="url(#heroGradient1)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Logo in the center - Rendered last to be on top */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <image
          href="/images/icon-logo.png"
          x="222"
          y="172"
          width="56"
          height="56"
          clipPath="url(#logoClip)"
        />
      </motion.g>
    </svg>
  );
}
