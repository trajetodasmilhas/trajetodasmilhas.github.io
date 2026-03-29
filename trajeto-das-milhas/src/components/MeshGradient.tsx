import React from 'react';
import { motion } from 'motion/react';

const MeshGradient: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Container para gradientes animados */}
      <div className="absolute inset-0 w-full h-full">
        {/* Gradiente 1 - Azul claro, movendo-se suavemente */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%)',
            top: '-20%',
            left: '-10%',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Gradiente 2 - Azul médio, movendo-se em direção oposta */}
        <motion.div
          className="absolute w-[900px] h-[900px] rounded-full blur-[130px] opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(10, 74, 111, 0.3) 0%, transparent 70%)',
            top: '10%',
            right: '-15%',
          }}
          animate={{
            x: [-100, 50, -100],
            y: [50, -50, 50],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Gradiente 3 - Azul escuro, movimento lento */}
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full blur-[140px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.25) 0%, transparent 70%)',
            bottom: '-10%',
            left: '30%',
          }}
          animate={{
            x: [50, -50, 50],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />

        {/* Gradiente 4 - Azul claro, movimento rápido */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(10, 74, 111, 0.35) 0%, transparent 70%)',
            bottom: '5%',
            right: '10%',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Gradiente 5 - Azul médio, movimento suave */}
        <motion.div
          className="absolute w-[750px] h-[750px] rounded-full blur-[125px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
            top: '40%',
            left: '50%',
          }}
          animate={{
            x: [-60, 60, -60],
            y: [30, -30, 30],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
      </div>

      {/* Overlay para suavizar as bordas e garantir discretion */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050A14] via-transparent to-[#050A14] pointer-events-none" />
    </div>
  );
};

export default MeshGradient;
