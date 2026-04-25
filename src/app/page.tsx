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
        <div className="relative z-20 bg-gradient-to-b from-[#010103]/80 via-[#010103]/95 to-[#010103] md:from-transparent md:via-[#010103]/80 md:to-[#010103] pt-32">
          <About />
          <Projects />
          <Timeline />
          {/* Contact section removed as per requirements */}
        </div>
      </div>

      {/* Navigation overlay */}
      <nav className="fixed top-8 right-12 z-50 hidden md:flex gap-10 mix-blend-difference interactable bg-white/5 px-8 py-4 rounded-full border border-white/10 backdrop-blur-md">
        {['About', 'Projects', 'Timeline'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-blue-400 transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            {item}
          </a>
        ))}
      </nav>
    </main>
  );
}
