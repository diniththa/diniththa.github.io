import React, { useState } from 'react';
import { Project } from '../types';
import { generateProjectSummary } from '../services/geminiService';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal opening
    if (aiSummary) return; // Already generated
    setLoading(true);
    setError(null);
    try {
      const summary = await generateProjectSummary(project.title, project.techStack);
      setAiSummary(summary);
    } catch (err) {
      setError("Unable to generate insights. Click to retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article 
      className="group relative flex flex-col h-full bg-secondary/30 border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/30 cursor-pointer"
      onClick={onClick}
      aria-labelledby={`project-title-${project.id}`}
    >
      
      {/* Card Content */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
              {/* Accessible trigger for the modal */}
              <button 
                id={`project-title-${project.id}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent double firing with parent onClick
                  onClick();
                }}
                className="text-left w-full focus:outline-none focus:underline decoration-accent underline-offset-4"
              >
                {project.title}
              </button>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
            {project.description}
            </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.slice(0, 4).map(tech => (
            <span key={tech} className="text-[10px] font-mono px-2 py-1 bg-primary/80 border border-gray-700 rounded text-gray-300 transition-colors group-hover:border-gray-600">
              {tech}
            </span>
          ))}
           {project.techStack.length > 4 && (
              <span className="text-[10px] font-mono px-2 py-1 bg-primary/80 border border-gray-700 rounded text-gray-500">
                  +{project.techStack.length - 4}
              </span>
           )}
        </div>

        {/* AI Summary Section - Enhanced Visual Hierarchy */}
        <div className="mt-auto mb-6" aria-live="polite">
           {loading ? (
             <div className="relative p-5 rounded-lg border border-accent/10 bg-accent/5 overflow-hidden" aria-busy="true" aria-label="Generating AI summary">
                {/* Shimmer Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full animate-shimmer z-10"></div>
                
                <div className="flex items-center gap-2 mb-4 relative z-20">
                   <div className="w-2 h-2 bg-accent rounded-full animate-ping"></div>
                   <span className="text-xs font-mono text-accent/80 animate-pulse">Gemini is analyzing architecture...</span>
                </div>
                
                <div className="space-y-3 relative z-20">
                    <div className="h-2 bg-accent/20 rounded w-full animate-pulse"></div>
                    <div className="h-2 bg-accent/20 rounded w-5/6 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="h-2 bg-accent/20 rounded w-4/5 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
             </div>
           ) : aiSummary ? (
             <div className="relative group/summary">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-blue-600/20 rounded-lg blur opacity-0 group-hover/summary:opacity-100 transition duration-500"></div>
                <div className="relative p-5 rounded-lg border border-accent/20 bg-primary/50 backdrop-blur-sm">
                   <div className="flex items-center gap-2 mb-2 border-b border-accent/10 pb-2">
                     <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                     <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">Architectural Analysis</span>
                   </div>
                   <p className="text-xs text-gray-300 leading-relaxed font-sans">
                     {aiSummary}
                   </p>
                </div>
             </div>
           ) : (
             <button 
                 onClick={handleGenerateSummary}
                 aria-label={error ? "Retry generating AI insights" : "Generate AI insights for this project"}
                 className={`w-full py-3 px-4 rounded-lg border border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-1 group/btn relative overflow-hidden min-h-[50px] ${
                   error 
                     ? 'border-red-500/30 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/50' 
                     : 'border-gray-700 hover:border-accent hover:bg-accent/5'
                 }`}
               >
                 <div className="flex items-center gap-2">
                    <svg className={`w-4 h-4 transition-colors ${error ? 'text-red-400' : 'text-gray-500 group-hover/btn:text-accent'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    <span className={`text-xs font-semibold uppercase tracking-wider ${error ? 'text-red-400' : 'text-gray-400 group-hover/btn:text-white'}`}>
                      {error ? 'Retry Generation' : 'Reveal AI Insights'}
                    </span>
                 </div>
                 {error && <span className="text-[10px] text-red-500/80 text-center leading-tight" role="alert">{error}</span>}
             </button>
           )}
        </div>

        {/* Footer Links */}
        <div className="pt-4 border-t border-gray-800/50 flex items-center justify-between mt-auto">
           {project.githubUrl ? (
             <a href={project.githubUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors focus:text-accent focus:outline-none" aria-label="View source code on GitHub">
               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
               Source Code
             </a>
           ) : <span />}
           
           {project.demoUrl && (
             <a href={project.demoUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-accent hover:text-accent-hover flex items-center gap-1.5 transition-colors focus:underline focus:outline-none" aria-label="View live demo">
               Live Demo
               <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
             </a>
           )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;