import React from 'react';
import Hero from '../components/Hero';
import WhatIs from '../components/WhatIs';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Bonuses from '../components/Bonuses';
import Guarantee from '../components/Guarantee';
import About from '../components/About';
import FAQ from '../components/FAQ';

const LandingPage: React.FC = () => {
  return (
    <main className="bg-[#050A14] text-[#E8F4FD] min-h-screen font-sans selection:bg-[#00D4FF] selection:text-[#050A14]">
      <Hero />
      <WhatIs />
      <Benefits />
      <Testimonials />
      <Pricing />
      <Bonuses />
      <Guarantee />
      <About />
      <FAQ />
    </main>
  );
};

export default LandingPage;
