import React, { useState, useEffect } from 'react';
import ChatAssistant from './ChatAssistant';
import { DINITH_INFO } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset calculation for fixed header if scroll-padding isn't enough or consistent
      // Using scrollIntoView is usually fine with scroll-padding-top in CSS, 
      // but let's stick to standard behavior defined in HTML + CSS first.
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-dark text-white min-h-screen font-sans relative overflow-x-hidden">
      
      {/* Global Tech Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Moving Grid */}
        <div className="absolute -inset-[100%] w-[300%] h-[300%] bg-tech-grid opacity-20 transform rotate-12"></div>
        
        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-900/30 rounded-full glow-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full glow-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[60%] w-64 h-64 bg-indigo-900/20 rounded-full glow-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ease-in-out ${isScrolled ? 'py-3' : 'py-6'}`}>
        
        {/* Scrolled Background Layer with IT/Cyber Effect */}
        <div className={`absolute inset-0 -z-10 transition-opacity duration-500 overflow-hidden ${isScrolled ? 'opacity-100 shadow-lg shadow-blue-900/5' : 'opacity-0'}`}>
             {/* Deep Glass Background */}
             <div className="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[#0B1120]/60"></div>
             
             {/* Subtle Border Bottom */}
             <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-800"></div>
             
             {/* Animated Data Line (IT Status Indicator) */}
             <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-70 animate-shimmer"></div>
        </div>

        <div className="container mx-auto px-6 flex justify-between items-center relative z-20">
          {/* Brand */}
          <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="group relative text-xl font-bold font-mono tracking-tighter text-white flex items-center gap-1">
            <span className="text-accent transition-transform group-hover:-translate-x-1">&lt;</span>
            <span className="relative">
              Dinith
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </span>
            <span className="text-accent transition-transform group-hover:translate-x-1">/&gt;</span>
          </a>
          
          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            {['About', 'Hackathons', 'Blog', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={(e) => handleNavClick(e, item.toLowerCase())}
                className="group relative text-sm font-mono font-medium text-gray-400 hover:text-white transition-colors py-1 cursor-pointer"
              >
                <span className="absolute -left-3 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-accent font-bold">{'['}</span>
                {item}
                <span className="absolute -right-3 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-accent font-bold">{']'}</span>
                
                {/* Glow effect on hover */}
                <span className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 blur-md transition-all duration-300 rounded-full -z-10"></span>
              </a>
            ))}

            {/* CTA Button */}
            <a 
                href="#projects" 
                onClick={(e) => handleNavClick(e, 'projects')}
                className="relative px-5 py-2 group overflow-hidden rounded bg-accent/10 border border-accent/50 text-accent font-mono text-sm font-bold transition-all duration-300 hover:bg-accent hover:text-dark hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] cursor-pointer"
            >
                <span className="relative z-10 flex items-center gap-2">
                    View All Works
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-gray-300 hover:text-accent focus:outline-none p-2 rounded transition-colors relative group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 rounded-lg transition-colors"></div>
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-[#0B1120]/95 backdrop-blur-xl border-b border-gray-800 shadow-2xl transition-all duration-300 origin-top transform ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
             <div className="flex flex-col py-4 px-6 space-y-1">
                {['About', 'Hackathons', 'Blog', 'Contact'].map((item) => (
                   <a 
                     key={item} 
                     href={`#${item.toLowerCase()}`}
                     className="text-gray-300 hover:text-accent hover:bg-white/5 font-mono text-sm font-medium py-4 px-4 rounded-lg transition-colors block border-l-2 border-transparent hover:border-accent"
                     onClick={(e) => handleNavClick(e, item.toLowerCase())}
                   >
                     <span className="text-accent/50 mr-2">0{['About', 'Hackathons', 'Blog', 'Contact'].indexOf(item) + 1}.</span>
                     {item}
                   </a>
                ))}
                
                <div className="pt-4 mt-2 border-t border-gray-800">
                    <a 
                        href="#projects"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-accent/10 border border-accent/30 text-accent font-mono font-bold rounded-lg active:bg-accent/20 cursor-pointer"
                        onClick={(e) => handleNavClick(e, 'projects')}
                    >
                        View All Works
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </a>
                </div>
             </div>
        </div>
      </nav>

      <main className="relative z-10">
        {children}
      </main>

      <footer className="bg-secondary/50 py-8 border-t border-gray-800 relative z-10 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
           <p>© {new Date().getFullYear()} {DINITH_INFO.name}. Built with React, Tailwind & Gemini AI.</p>
        </div>
      </footer>

      <ChatAssistant />
    </div>
  );
};

export default Layout;