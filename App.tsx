import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import FadeInSection from './components/FadeInSection';
import DoraHacksSection from './components/DoraHacksSection';

const App: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <FadeInSection>
        <About />
      </FadeInSection>
      <FadeInSection>
        <Projects />
      </FadeInSection>
      <FadeInSection>
        <DoraHacksSection />
      </FadeInSection>
      <FadeInSection>
        <Blog />
      </FadeInSection>
      <FadeInSection>
        <Contact />
      </FadeInSection>
    </Layout>
  );
};

export default App;