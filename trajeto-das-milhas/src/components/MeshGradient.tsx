import React from 'react';
import { motion } from 'motion/react';

const MeshGradient: React.FC = () => {
  return (
    <div className="relative w-full h-96 overflow-hidden bg-[#050A14]">
      {/* SVG Canvas para o Mesh Gradient */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
          </filter>
          
          {/* Gradientes animados */}
          <motion.linearGradient
            id="grad1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            animate={{
              x1: ['0%', '100%', '0%'],
              y1: ['0%', '100%', '0%'],
              x2: ['100%', '0%', '100%'],
              y2: ['100%', '0%', '100%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#7B2FFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF006E" stopOpacity="0.8" />
          </motion.linearGradient>

          <motion.linearGradient
            id="grad2"
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
            animate={{
              x1: ['100%', '0%', '100%'],
              y1: ['0%', '100%', '0%'],
              x2: ['0%', '100%', '0%'],
              y2: ['100%', '0%', '100%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          >
            <stop offset="0%" stopColor="#7B2FFF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFB400" stopOpacity="0.6" />
          </motion.linearGradient>

          <motion.linearGradient
            id="grad3"
            x1="50%"
            y1="100%"
            x2="50%"
            y2="0%"
            animate={{
              x1: ['50%', '100%', '50%'],
              y1: ['100%', '0%', '100%'],
              x2: ['50%', '0%', '50%'],
              y2: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          >
            <stop offset="0%" stopColor="#FF006E" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#FFB400" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.7" />
          </motion.linearGradient>
        </defs>

        {/* Círculos com blur para criar o efeito de mesh gradient */}
        <motion.circle
          cx="300"
          cy="100"
          r="150"
          fill="url(#grad1)"
          filter="url(#blur)"
          animate={{
            cx: [300, 400, 300],
            cy: [100, 200, 100],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.circle
          cx="900"
          cy="300"
          r="180"
          fill="url(#grad2)"
          filter="url(#blur)"
          animate={{
            cx: [900, 800, 900],
            cy: [300, 150, 300],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        <motion.circle
          cx="600"
          cy="200"
          r="160"
          fill="url(#grad3)"
          filter="url(#blur)"
          animate={{
            cx: [600, 500, 600],
            cy: [200, 250, 200],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        <motion.circle
          cx="200"
          cy="350"
          r="120"
          fill="url(#grad1)"
          filter="url(#blur)"
          animate={{
            cx: [200, 300, 200],
            cy: [350, 250, 350],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />

        <motion.circle
          cx="1000"
          cy="100"
          r="140"
          fill="url(#grad2)"
          filter="url(#blur)"
          animate={{
            cx: [1000, 900, 1000],
            cy: [100, 250, 100],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        />
      </svg>

      {/* Overlay para suavizar as bordas */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050A14] via-transparent to-[#050A14] pointer-events-none" />
    </div>
  );
};

export default MeshGradient;
