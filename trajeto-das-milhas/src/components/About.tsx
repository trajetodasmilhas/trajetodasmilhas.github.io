import React from 'react';
import { motion } from 'motion/react';
import { useContent } from '../context/ContentContext';

const About: React.FC = () => {
  const { content } = useContent();
  const { about } = content;

  return (
    <section id="about" className="py-24 bg-[#0A1128] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#9D00FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00D4FF] to-[#9D00FF] rounded-2xl blur opacity-20" />
              <img 
                src={about.imageUrl} 
                alt={about.title}
                className="relative rounded-2xl w-full h-[500px] object-cover shadow-2xl"
                referrerPolicy="no-referrer"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#00D4FF] text-[#0A1128] font-bold p-6 rounded-xl shadow-xl">
                <p className="text-3xl">10+</p>
                <p className="text-sm uppercase tracking-wider">Anos de Exp.</p>
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h4 className="text-[#00D4FF] font-semibold tracking-widest uppercase mb-4">
              {about.subtitle}
            </h4>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              {about.title}
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-[#8BA3C0] leading-relaxed">
                {about.description}
              </p>
              <div className="pt-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#00D4FF]/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#00D4FF]" />
                  </div>
                  <p className="text-white font-medium">Especialista em Emissões Internacionais</p>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#9D00FF]/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#9D00FF]" />
                  </div>
                  <p className="text-white font-medium">Mentor de Milhares de Alunos</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#00FF94]/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#00FF94]" />
                  </div>
                  <p className="text-white font-medium">Criador do Método Trajeto das Milhas</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
