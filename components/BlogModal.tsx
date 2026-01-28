import React from 'react';
import { createPortal } from 'react-dom';
import { BlogPost } from '../types';
import ReactMarkdown from 'react-markdown';

interface BlogModalProps {
  post: BlogPost;
  onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-primary/95 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-3xl bg-secondary border border-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in custom-scrollbar">
        
        {/* Header */}
        <div className="p-8 border-b border-gray-700/50 bg-primary/50 relative">
           <button 
             onClick={onClose} 
             className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full z-10"
           >
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
           </button>

           <div className="flex items-center gap-3 mb-4">
             <span className="text-sm font-mono text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
               {post.date}
             </span>
             {post.tags.map(tag => (
                <span key={tag} className="text-xs font-mono text-gray-400 border border-gray-700 px-2 py-1 rounded">
                  {tag}
                </span>
             ))}
           </div>
           
           <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
             {post.title}
           </h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-dark/30">
           <article className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-accent hover:prose-a:text-accent-hover prose-strong:text-white prose-code:text-accent prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800">
             <ReactMarkdown>{post.content}</ReactMarkdown>
           </article>
           
           {/* Author Sign-off */}
           <div className="mt-12 pt-8 border-t border-gray-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                DT
              </div>
              <div>
                <p className="text-white font-medium">Dinith Tharindu</p>
                <p className="text-sm text-gray-500">Software Engineer</p>
              </div>
           </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BlogModal;