'use client';

import Experience from '@/components/canvas/Experience';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Timeline from '@/components/sections/Timeline';
import Cursor from '@/components/ui/Cursor';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#010103] text-white overflow-hidden">
      <Cursor />
      
      {/* Background 3D Layer */}
      <Experience />
      
      {/* Midground Layer */}
      <div className="relative z-10">
        <Hero />
        
        {/* Content with subtle background fade */}
        <div className="relative z-20 bg-gradient-to-b from-transparent via-[#010103]/80 to-[#010103] pt-32">
          <About />
          <Projects />
          <Timeline />
          {/* Contact section removed as per requirements */}
        </div>
      </div>

      {/* Navigation overlay */}
      <nav className="fixed top-8 right-12 z-50 hidden md:flex gap-10 mix-blend-difference interactable">
        {['About', 'Projects', 'Timeline'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>
    </main>
  );
}
