import React from 'react';
import { DINITH_INFO } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-dark relative">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row gap-16">
          {/* Left Column: Narrative */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="text-accent font-mono text-xl">01.</span> About Me
            </h2>
            
            <div className="prose prose-invert max-w-none text-gray-400">
               <p className="text-lg leading-relaxed mb-6">
                 I am a fourth-semester <strong>Software Engineering undergraduate</strong> at Saegis Campus. 
                 Unlike the generalist approach, I have specialized early in high-complexity domains: 
                 <span className="text-gray-200"> Blockchain Architecture</span> and <span className="text-gray-200">Artificial Intelligence</span>.
               </p>
               
               <div className="bg-secondary/40 border-l-2 border-accent p-6 my-8 rounded-r-lg">
                 <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Engineering Philosophy</h4>
                 <p className="italic text-gray-300">
                   "{DINITH_INFO.philosophy}"
                 </p>
               </div>

               <div className="mt-8">
                  <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide border-b border-gray-800 pb-2">Education</h3>
                  {DINITH_INFO.education.map((edu, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-gray-200 font-medium">{edu.degree}</span>
                        <span className="text-accent text-sm font-mono">{edu.period}</span>
                      </div>
                      <span className="text-gray-500 text-sm">{edu.institution}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Right Column: Technical Matrix */}
          <div className="md:w-1/2">
             <div className="bg-secondary/20 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors h-full">
                <div className="flex items-center gap-2 mb-6 border-b border-gray-800 pb-4">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  <h3 className="text-lg font-bold text-white font-mono">Technical_Matrix</h3>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs uppercase text-gray-500 tracking-widest font-semibold mb-3">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {DINITH_INFO.skills.languages.map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-secondary text-gray-300 rounded text-sm font-mono border border-gray-700 hover:border-accent/50 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase text-gray-500 tracking-widest font-semibold mb-3">Web3 & Cryptography</h4>
                    <div className="flex flex-wrap gap-2">
                      {DINITH_INFO.skills.web3.map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-blue-900/10 text-blue-200 rounded text-sm font-mono border border-blue-900/30 hover:border-blue-500/50 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase text-gray-500 tracking-widest font-semibold mb-3">Frameworks & Infrastructure</h4>
                    <div className="flex flex-wrap gap-2">
                      {[...DINITH_INFO.skills.frameworks, ...DINITH_INFO.skills.tools].map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-secondary text-gray-400 rounded text-sm font-mono border border-gray-700 hover:border-gray-500 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;