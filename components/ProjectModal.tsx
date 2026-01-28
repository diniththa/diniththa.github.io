import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Project } from '../types';
import { generateProjectDeepDive } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [deepDiveContent, setDeepDiveContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      try {
        const content = await generateProjectDeepDive(project.title, project.techStack);
        setDeepDiveContent(content);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchInsight();
  }, [project]);

  // Accessibility: Focus Trap and Escape Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      
      // Simple focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Lock scroll

    // Focus close button on mount
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Use Portal to render modal outside of parent hierarchy (which may have transforms affecting fixed position)
  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="absolute inset-0 bg-primary/90 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl bg-secondary border border-accent/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50 flex justify-between items-start bg-primary/50">
           <div>
             <h2 id="modal-title" className="text-3xl font-bold text-white mb-2">{project.title}</h2>
             <div className="flex flex-wrap gap-2">
               {project.techStack.map(tech => (
                 <span key={tech} className="px-2 py-0.5 rounded text-xs font-mono bg-accent/10 text-accent border border-accent/20">
                   {tech}
                 </span>
               ))}
             </div>
           </div>
           <button 
             ref={closeButtonRef}
             onClick={onClose} 
             className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
             aria-label="Close modal"
           >
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
           <div className="prose prose-invert max-w-none">
             <div className="mb-8">
               <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                 <span className="text-accent" aria-hidden="true">#</span> Overview
               </h3>
               <p className="text-gray-300 leading-relaxed text-lg">
                 {project.description}
               </p>
             </div>

             {/* Dynamic AI Content */}
             <div className="bg-primary/30 border border-gray-800 rounded-xl p-6" aria-live="polite">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                   <span className="text-accent animate-pulse" aria-hidden="true">◈</span> 
                   Technical Deep Dive
                </h3>
                
                {loading ? (
                  <div className="space-y-4" aria-busy="true" aria-label="Loading technical analysis">
                     <div className="h-4 bg-gray-700/50 rounded w-3/4 animate-pulse"></div>
                     <div className="h-4 bg-gray-700/50 rounded w-full animate-pulse"></div>
                     <div className="h-4 bg-gray-700/50 rounded w-5/6 animate-pulse"></div>
                     <div className="h-32 bg-gray-700/30 rounded w-full animate-pulse mt-4"></div>
                  </div>
                ) : (
                  <div className="text-gray-300 text-sm leading-relaxed space-y-4">
                     {deepDiveContent && <ReactMarkdown>{deepDiveContent}</ReactMarkdown>}
                  </div>
                )}
             </div>
           </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700/50 bg-primary/50 flex justify-end gap-4">
           {project.githubUrl && (
             <a 
               href={project.githubUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent"
             >
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
               View Code
             </a>
           )}
           {project.demoUrl && (
             <a 
               href={project.demoUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-dark font-bold transition-colors shadow-lg shadow-accent/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
             >
               Live Demo
             </a>
           )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;