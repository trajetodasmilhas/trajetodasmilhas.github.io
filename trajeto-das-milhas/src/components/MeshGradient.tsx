import React from 'react';
import { motion } from 'motion/react';

const MeshGradient: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
      {/* Container para gradientes animados */}
      <div className="absolute inset-0 w-full h-full opacity-40">
        {/* Gradiente 1 - Ciano Vibrante */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.6) 0%, transparent 70%)',
            top: '-10%',
            left: '-5%',
          }}
          animate={{
            x: [0, 150, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Gradiente 2 - Azul Royal */}
        <motion.div
          className="absolute w-[900px] h-[900px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(123, 47, 255, 0.4) 0%, transparent 70%)',
            top: '20%',
            right: '-10%',
          }}
          animate={{
            x: [0, -150, 0],
            y: [0, 150, 0],
            scale: [1.1, 0.9, 1.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Gradiente 3 - Azul Profundo */}
        <motion.div
          className="absolute w-[1000px] h-[1000px] rounded-full blur-[140px]"
          style={{
            background: 'radial-gradient(circle, rgba(0, 80, 255, 0.5) 0%, transparent 70%)',
            bottom: '10%',
            left: '10%',
          }}
          animate={{
            x: [100, -100, 100],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Gradiente 4 - Roxo/Violeta */}
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full blur-[110px]"
          style={{
            background: 'radial-gradient(circle, rgba(123, 47, 255, 0.3) 0%, transparent 70%)',
            bottom: '-10%',
            right: '15%',
          }}
          animate={{
            x: [-80, 80, -80],
            y: [80, -80, 80],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
      </div>

      {/* Overlay para suavizar e integrar com o fundo escuro do site */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050A14] via-transparent to-[#050A14] opacity-60" />
      
      {/* Textura de ruído sutil para um look mais premium */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default MeshGradient;
