import React from 'react';

const HackathonSection: React.FC = () => {
  const profiles = [
    {
      id: "dorahacks",
      name: "DoraHacks",
      url: "https://dorahacks.io/hacker/dinitheth",
      badge: "DoraHacks Profile",
      title: "Decentralized BUIDLs",
      description: "View my complete portfolio of BUIDLs, hackathon submissions, and grant applications directly on the DoraHacks platform.",
      tags: ['Web3', 'Bounties', 'Grants'],
      icon: "🏆",
      // Tailwind classes
      borderHover: "group-hover:border-accent",
      badgeStyle: "bg-accent/10 border-accent/20 text-accent",
      gradient: "from-blue-500/10 to-cyan-500/10",
      btnStyle: "bg-accent hover:bg-accent-hover text-dark shadow-accent/20",
      topGradient: "from-transparent via-accent to-transparent"
    },
    {
      id: "akindo",
      name: "Akindo",
      url: "https://app.akindo.io/users/dxbr",
      badge: "Akindo Profile",
      title: "Wave & Hackathons",
      description: "Explore my contributions to the Akindo ecosystem, participating in diverse Web3 communities, challenges, and collaborative sprints.",
      tags: ['Sprints', 'Collab', 'Challenges'],
      icon: "🌊",
      // Tailwind classes
      borderHover: "group-hover:border-purple-500",
      badgeStyle: "bg-purple-500/10 border-purple-500/20 text-purple-400",
      gradient: "from-purple-500/10 to-pink-500/10",
      btnStyle: "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20",
      topGradient: "from-transparent via-purple-500 to-transparent"
    }
  ];

  return (
    <section id="hackathons" className="py-24 bg-dark relative border-t border-gray-800">
      <div className="container mx-auto px-6">
         <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            <span className="border-b-4 border-accent pb-2">Hackathon Journey</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Explore my participation, submissions, and achievements across global Web3 hackathon platforms.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {profiles.map((profile) => (
            <div 
              key={profile.id}
              className={`relative bg-secondary/30 rounded-2xl overflow-hidden border border-gray-700 transition-all duration-500 group flex flex-col h-full ${profile.borderHover}`}
            >
               {/* Decorative Background */}
               <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${profile.topGradient} opacity-50`}></div>
               <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl transition-colors bg-gradient-to-br ${profile.gradient} opacity-50 group-hover:opacity-80`}></div>
               
               <div className="relative z-10 p-8 flex flex-col h-full">
                  
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                     <div className={`w-16 h-16 rounded-full border-2 border-dashed border-gray-600 ${profile.borderHover} transition-colors flex items-center justify-center bg-primary/50 text-3xl`}>
                        {profile.icon}
                     </div>
                     <div>
                        <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono mb-1 border ${profile.badgeStyle}`}>
                           {profile.badge}
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight">
                           {profile.title}
                        </h3>
                     </div>
                  </div>

                  {/* Body */}
                  <p className="text-gray-400 leading-relaxed mb-6 text-sm flex-grow">
                     {profile.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                     {profile.tags.map(tag => (
                       <span key={tag} className="text-xs font-mono text-gray-500 border border-gray-800 px-2 py-1 rounded bg-black/20">
                         #{tag}
                       </span>
                     ))}
                  </div>

                  {/* CTA */}
                  <a 
                     href={profile.url} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className={`mt-auto w-full py-3 rounded-lg font-bold transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 ${profile.btnStyle}`}
                  >
                     <span>View Profile</span>
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HackathonSection;