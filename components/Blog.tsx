import React, { useState } from 'react';
import { INITIAL_BLOGS } from '../constants';
import { BlogPost } from '../types';
import { generateBlogPost } from '../services/geminiService';
import BlogModal from './BlogModal';

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [newTopic, setNewTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    setIsGenerating(true);
    const content = await generateBlogPost(newTopic);
    
    // Parse the response to remove potential markdown code blocks or titles if duplicated
    const newPost: BlogPost = {
      id: `ai-gen-${Date.now()}`,
      title: newTopic, 
      date: new Date().toISOString().split('T')[0],
      content: content,
      tags: ['AI Generated', 'Tech']
    };

    setBlogs([newPost, ...blogs]);
    setNewTopic('');
    setIsGenerating(false);
  };

  return (
    <section id="blog" className="py-20 bg-secondary/30 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          <span className="border-b-4 border-accent pb-2">Knowledge Hub</span>
        </h2>

        {/* AI Generator Control */}
        <div className="max-w-2xl mx-auto mb-16 bg-primary p-6 rounded-xl border border-gray-700 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
             <h3 className="text-lg font-semibold text-white">AI Article Generator</h3>
          </div>
          <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Enter a topic (e.g., 'Zero Knowledge Proofs')" 
              className="w-full sm:flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
              disabled={isGenerating}
            />
            <button 
              type="submit" 
              disabled={isGenerating || !newTopic}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg font-bold transition-all whitespace-nowrap ${isGenerating ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-accent text-dark hover:bg-accent-hover'}`}
            >
              {isGenerating ? 'Generating...' : 'Create'}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2 ml-1">
            * Uses Gemini AI to draft a technical post based on your topic.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((post) => (
            <div 
              key={post.id} 
              onClick={() => setSelectedPost(post)}
              className="bg-primary border border-gray-800 rounded-xl p-8 hover:border-gray-600 transition-all cursor-pointer group hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
            >
              <div className="flex justify-between items-center mb-4">
                 <span className="text-sm text-accent font-mono">{post.date}</span>
                 <div className="flex gap-2">
                   {post.tags.map(tag => (
                     <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">{tag}</span>
                   ))}
                 </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors">{post.title}</h3>
              <div className="text-gray-400 leading-relaxed mb-6 max-h-40 overflow-hidden relative">
                 <div className="whitespace-pre-wrap">{post.content.substring(0, 150).replace(/[#*]/g, '')}...</div>
                 <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-primary to-transparent"></div>
              </div>
              <button 
                className="text-accent hover:text-white text-sm font-semibold flex items-center gap-2 group/btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPost(post);
                }}
              >
                Read Full Article
                <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Modal Popup */}
      {selectedPost && (
        <BlogModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}
    </section>
  );
};

export default Blog;