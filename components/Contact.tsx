import React, { useState } from 'react';
import { DINITH_INFO } from '../constants';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validate()) {
      // Simulate network request
      setTimeout(() => {
        setIsSent(true);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1500);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-dark border-t border-gray-800">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 text-white flex items-center gap-3 justify-center md:justify-start">
          <span className="text-accent font-mono text-xl">04.</span> Contact
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          
          <div className="space-y-6">
             <h3 className="text-4xl font-bold text-white leading-tight">
               Let's build something <br />
               <span className="text-gray-500">extraordinary.</span>
             </h3>
             <p className="text-gray-400 text-lg leading-relaxed">
               I am currently looking for engineering opportunities where I can contribute to backend systems, blockchain protocols, or AI implementations.
             </p>
             
             <div className="pt-8 space-y-4">
                <a href={`mailto:${DINITH_INFO.socials.email}`} className="flex items-center gap-4 text-gray-300 hover:text-accent transition-colors group">
                   <div className="w-10 h-10 rounded-full bg-secondary border border-gray-700 flex items-center justify-center group-hover:border-accent transition-colors">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                   </div>
                   <span className="font-mono text-sm">{DINITH_INFO.socials.email}</span>
                </a>
                
                <a href={DINITH_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-accent transition-colors group">
                   <div className="w-10 h-10 rounded-full bg-secondary border border-gray-700 flex items-center justify-center group-hover:border-accent transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                   </div>
                   <span className="font-mono text-sm">github.com/dinitheth</span>
                </a>
             </div>
          </div>

          <div className="bg-secondary/30 p-8 rounded-lg border border-gray-800 relative overflow-hidden">
            {isSent ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in space-y-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. I will get back to you as soon as possible.</p>
                <button 
                  onClick={() => setIsSent(false)}
                  className="mt-6 text-accent hover:text-white text-sm font-semibold uppercase tracking-wide transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 text-xs uppercase font-bold mb-2">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-primary border rounded p-3 text-white focus:outline-none transition-colors text-sm ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700 focus:border-accent'}`}
                    placeholder="Jane Doe" 
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-gray-500 text-xs uppercase font-bold mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-primary border rounded p-3 text-white focus:outline-none transition-colors text-sm ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700 focus:border-accent'}`}
                    placeholder="jane@company.com" 
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="block text-gray-500 text-xs uppercase font-bold mb-2">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full bg-primary border rounded p-3 text-white focus:outline-none transition-colors text-sm ${errors.subject ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700 focus:border-accent'}`}
                  placeholder="Project collaboration" 
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label className="block text-gray-500 text-xs uppercase font-bold mb-2">Message</label>
                <textarea 
                  rows={4} 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-primary border rounded p-3 text-white focus:outline-none transition-colors text-sm ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700 focus:border-accent'}`}
                  placeholder="How can we help each other?"
                ></textarea>
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-3 bg-accent text-primary font-bold rounded hover:bg-accent-hover transition-all text-sm uppercase tracking-wider ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;