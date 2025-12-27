'use client';

import { motion } from 'framer-motion';

export default function ContactIllustration() {
  return (
    <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="contactGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981">
            <animate attributeName="stop-color" values="#10b981;#14b8a6;#10b981" dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#06b6d4">
            <animate attributeName="stop-color" values="#06b6d4;#10b981;#06b6d4" dur="4s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>

        <filter id="contactGlow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background elements */}
      <motion.circle
        cx="90"
        cy="90"
        r="45"
        fill="#10b981"
        opacity="0.05"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity
        }}
      />

      <motion.circle
        cx="410"
        cy="410"
        r="55"
        fill="#06b6d4"
        opacity="0.05"
        animate={{
          scale: [1, 1.35, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          delay: 1.2
        }}
      />

      {/* Signal waves - back layer */}
      {[
        { angle: 0, delay: 0 },
        { angle: 90, delay: 0.15 },
        { angle: 180, delay: 0.3 },
        { angle: 270, delay: 0.45 }
      ].map((item, index) => {
        const radius = 145;
        const x = Math.round((250 + radius * Math.cos((item.angle * Math.PI) / 180)) * 100) / 100;
        const y = Math.round((250 + radius * Math.sin((item.angle * Math.PI) / 180)) * 100) / 100;

        return (
          <motion.line
            key={`wave-${index}`}
            x1="250"
            y1="250"
            x2={x}
            y2={y}
            stroke="url(#contactGradient1)"
            strokeWidth="2"
            strokeDasharray="8 4"
            opacity="0.25"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.25,
              strokeDashoffset: [0, -12]
            }}
            transition={{
              opacity: { delay: item.delay + 0.3, duration: 0.6 },
              strokeDashoffset: { duration: 2.5, repeat: Infinity, ease: "linear" }
            }}
          />
        );
      })}

      {/* Central Message Hub */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Glow circle */}
        <motion.circle
          cx="250"
          cy="250"
          r="50"
          fill="url(#contactGradient1)"
          opacity="0.2"
          filter="url(#contactGlow)"
        />

        {/* Main hub */}
        <motion.circle
          cx="250"
          cy="250"
          r="42"
          fill="url(#contactGradient1)"
          opacity="0.95"
          animate={{
            scale: [1, 1.06, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity
          }}
        />

        {/* Message envelope icon */}
        <g opacity="0.9">
          <rect x="230" y="235" width="40" height="30" rx="3" fill="#fff" opacity="0.95"/>
          <path d="M 230 235 L 250 250 L 270 235" stroke="#10b981" strokeWidth="2.5" fill="none"/>
          <motion.path
            d="M 230 235 L 250 250 L 270 235"
            fill="#10b981"
            opacity="0.3"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        </g>

        {/* Pulse ring */}
        <motion.circle
          cx="250"
          cy="250"
          r="42"
          stroke="#10b981"
          strokeWidth="2.5"
          fill="none"
          opacity="0.5"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
        />
      </motion.g>

      {/* 4 Communication Channel Nodes */}
      {[
        { angle: 0, delay: 0, color: '#10b981', icon: '📞', label: 'Phone' },
        { angle: 90, delay: 0.15, color: '#06b6d4', icon: '✉', label: 'Email' },
        { angle: 180, delay: 0.3, color: '#14b8a6', icon: '💬', label: 'Chat' },
        { angle: 270, delay: 0.45, color: '#0ea5e9', icon: '📍', label: 'Location' }
      ].map((item, index) => {
        const radius = 145;
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
                y: [0, -12, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut"
              }}
            >
              {/* Outer glow */}
              <circle
                cx={x}
                cy={y}
                r="35"
                fill={item.color}
                opacity="0.15"
                filter="url(#contactGlow)"
              />

              {/* Main circle */}
              <motion.circle
                cx={x}
                cy={y}
                r="28"
                fill={item.color}
                opacity="0.9"
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: item.delay
                }}
              />

              {/* Icon representation */}
              {index === 0 && (
                // Phone icon
                <g>
                  <path
                    d={`M ${x - 8} ${y - 8} Q ${x - 6} ${y - 10}, ${x - 3} ${y - 8} L ${x + 3} ${y + 5} Q ${x + 5} ${y + 8}, ${x + 3} ${y + 10} L ${x - 5} ${y + 4} Z`}
                    fill="#fff"
                    opacity="0.9"
                  />
                </g>
              )}
              {index === 1 && (
                // Email icon
                <g>
                  <rect x={x - 10} y={y - 7} width="20" height="14" rx="2" fill="#fff" opacity="0.9"/>
                  <path d={`M ${x - 10} ${y - 7} L ${x} ${y + 2} L ${x + 10} ${y - 7}`} stroke={item.color} strokeWidth="2" fill="none"/>
                </g>
              )}
              {index === 2 && (
                // Chat icon
                <g>
                  <rect x={x - 9} y={y - 8} width="18" height="14" rx="3" fill="#fff" opacity="0.9"/>
                  <path d={`M ${x - 3} ${y + 6} L ${x} ${y + 11} L ${x + 3} ${y + 6}`} fill="#fff" opacity="0.9"/>
                  <circle cx={x - 4} cy={y - 2} r="1.5" fill={item.color}/>
                  <circle cx={x} cy={y - 2} r="1.5" fill={item.color}/>
                  <circle cx={x + 4} cy={y - 2} r="1.5" fill={item.color}/>
                </g>
              )}
              {index === 3 && (
                // Location pin icon
                <path
                  d={`M ${x} ${y - 10} Q ${x - 7} ${y - 10}, ${x - 7} ${y - 3} Q ${x - 7} ${y + 4}, ${x} ${y + 10} Q ${x + 7} ${y + 4}, ${x + 7} ${y - 3} Q ${x + 7} ${y - 10}, ${x} ${y - 10} Z M ${x} ${y - 5} Q ${x - 3} ${y - 5}, ${x - 3} ${y - 2} Q ${x - 3} ${y + 1}, ${x} ${y + 1} Q ${x + 3} ${y + 1}, ${x + 3} ${y - 2} Q ${x + 3} ${y - 5}, ${x} ${y - 5} Z`}
                  fill="#fff"
                  opacity="0.9"
                />
              )}

              {/* Pulse ring */}
              <motion.circle
                cx={x}
                cy={y}
                r="32"
                fill="none"
                stroke={item.color}
                strokeWidth="2"
                opacity="0.5"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: item.delay + 0.7
                }}
              />
            </motion.g>
          </motion.g>
        );
      })}

      {/* Flying message dots */}
      {[...Array(8)].map((_, i) => {
        const angle = i * 45;
        const startRadius = 60;
        const endRadius = 125;

        return (
          <motion.circle
            key={`msg-${i}`}
            cx="250"
            cy="250"
            r="3"
            fill="#10b981"
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
              scale: [0, 1.3, 0]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: i * 0.35,
              ease: "easeInOut"
            }}
          />
        );
      })}

      {/* Connection signal arcs */}
      {[...Array(6)].map((_, i) => {
        const angle = i * 60;
        const orbitRadius = 95;

        return (
          <motion.circle
            key={`orbit-${i}`}
            cx="250"
            cy="250"
            r="2"
            fill="#06b6d4"
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
              duration: 12,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "linear"
            }}
          />
        );
      })}

      {/* Cross sparkles */}
      {[
        { x: 110, y: 180, delay: 0 },
        { x: 390, y: 320, delay: 1.3 }
      ].map((sparkle, i) => (
        <motion.g
          key={`cross-${i}`}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.6, 1.2, 0.6]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: sparkle.delay
          }}
        >
          <path
            d={`M ${sparkle.x} ${sparkle.y - 8} L ${sparkle.x} ${sparkle.y + 8} M ${sparkle.x - 8} ${sparkle.y} L ${sparkle.x + 8} ${sparkle.y}`}
            stroke="#14b8a6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </motion.g>
      ))}

      {/* Outer signal rings */}
      {[0, 1].map((i) => (
        <motion.circle
          key={`signal-${i}`}
          cx="250"
          cy="250"
          r="175"
          stroke="url(#contactGradient1)"
          strokeWidth="2"
          fill="none"
          opacity="0.2"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: i * 2.25,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Rotating dashed ring */}
      <motion.circle
        cx="250"
        cy="250"
        r="185"
        stroke="url(#contactGradient1)"
        strokeWidth="2"
        fill="none"
        opacity="0.15"
        strokeDasharray="12 6"
        animate={{
          rotate: -360
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transformOrigin: '250px 250px' }}
      />
    </svg>
  );
}
