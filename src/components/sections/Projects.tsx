'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    title: 'QueueMind', 
    desc: 'An AI-driven exploration into predictive crowd analytics. This system analyzes historical data patterns to forecast wait times and crowd density, optimizing human decision-making in real-time environments.', 
    tags: ['AI', 'Data Analysis', 'Concept'],
    link: 'https://github.com/Jaivardhan-Raahi/QueueMind'
  },
  { 
    title: 'VoteWise', 
    desc: 'An intelligent recommendation framework that aligns voter preferences with political platforms. It provides transparent reasoning for its suggestions, focusing on bridging the gap between data and democratic choice.', 
    tags: ['AI', 'Recommendation System', 'UX'],
    link: 'https://github.com/Jaivardhan-Raahi/VoteWise'
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isCarousel = projects.length > 4;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".project-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 75%" } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="projects" className="py-40 px-6 max-w-7xl mx-auto w-full z-10 relative">
      <h2 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-20 text-center font-bold">Concept Explorations</h2>
      
      <div className={`
        ${isCarousel 
          ? 'flex overflow-x-auto gap-8 pb-10 scrollbar-hide snap-x snap-mandatory' 
          : 'grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto'}
      `}>
        {projects.map((p, i) => (
          <a 
            key={i} 
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              project-card p-10 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md interactable group transition-all hover:bg-white/[0.05] hover:border-white/10 block
              ${isCarousel ? 'min-w-[300px] md:min-w-[450px] snap-center' : 'w-full'}
            `}
          >
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{p.title}</h3>
            <p className="text-white/50 mb-8 font-light leading-relaxed text-lg">{p.desc}</p>
            <div className="flex gap-3 mt-auto">
              {p.tags.map(t => <span key={t} className="text-[10px] font-mono uppercase tracking-widest text-white/30 border border-white/10 px-3 py-1 rounded-full">{t}</span>)}
            </div>
          </a>
        ))}
      </div>
      
      {isCarousel && (
        <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] text-center mt-8 animate-pulse">
          Scroll to explore
        </p>
      )}
    </section>
  );
}
