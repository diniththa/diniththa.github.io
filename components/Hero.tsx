import React from 'react';
import { DINITH_INFO } from '../constants';

const Hero: React.FC = () => {
  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 border-b border-gray-800/50">
      
      {/* Hero Specific Animated Background */}
      <div className="absolute inset-0 z-0">
         {/* 1. Ambient Spotlight (Top Center) */}
         <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
         
         {/* 2. Moving Tech Grid with Radial Mask */}
         <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
              style={{
                 backgroundImage: 'linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)',
                 backgroundSize: '40px 40px',
                 maskImage: 'radial-gradient(circle at 50% 40%, black 0%, transparent 70%)',
                 WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 0%, transparent 70%)',
                 animation: 'panGrid 25s linear infinite'
              }}>
         </div>
         
         {/* 3. Subtle Abstract Lines/Particles */}
         <div className="absolute top-1/4 left-1/5 w-[1px] h-[100px] bg-gradient-to-b from-transparent via-accent/50 to-transparent opacity-50 animate-pulse"></div>
         <div className="absolute bottom-1/3 right-1/4 w-[1px] h-[150px] bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

         <style>{`
            @keyframes panGrid {
                0% { background-position: 0 0; }
                100% { background-position: 40px 40px; }
            }
         `}</style>
      </div>

      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-gray-700/50 backdrop-blur-sm mb-8 animate-fade-in hover:border-accent/30 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-xs font-mono text-gray-400 tracking-wide uppercase">Available for Engineering Roles</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white animate-fade-in drop-shadow-xl" style={{ animationDelay: '0.1s' }}>
            {DINITH_INFO.name}
          </h1>
          
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl md:text-3xl text-gray-300 font-medium">
                {DINITH_INFO.role}
              </h2>
              <p className="text-xl text-accent/90 mt-2 font-light">
                {DINITH_INFO.subRole}
              </p>
          </div>

          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed animate-fade-in backdrop-blur-sm p-4 rounded-xl" style={{ animationDelay: '0.3s' }}>
             Engineering robust solutions at the intersection of Web3 and Artificial Intelligence.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a 
              href="#projects" 
              onClick={scrollToProjects}
              className="px-8 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-hover transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transform hover:-translate-y-1"
            >
              View Portfolio
            </a>
            <a href="#contact" className="px-8 py-3 border border-gray-700 hover:border-accent/50 text-gray-300 hover:text-white rounded-lg transition-all bg-secondary/30 backdrop-blur-sm transform hover:-translate-y-1">
              Contact Me
            </a>
          </div>

          {/* Tech Stack Ticker */}
          <div className="border-t border-gray-800/50 pt-10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
             <p className="text-xs text-gray-500 mb-6 font-mono uppercase tracking-widest">Core Technologies</p>
             <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
               {['Rust', 'Linera SDK', 'React', 'TypeScript', 'FHEVM', 'Solidity', 'Gemini'].map((tech) => (
                 <span key={tech} className="text-sm font-mono text-gray-400 hover:text-accent cursor-default transition-colors border-b border-transparent hover:border-accent/30 pb-1">
                   {tech}
                 </span>
               ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;