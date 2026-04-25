'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FaGithub, FaLinkedin } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const events = [
  { 
    title: 'Initial Exposure to Technology', 
    desc: 'Early curiosity about systems and software. A fundamental interest in deconstructing processes to understand how things work deeply.' 
  },
  { 
    title: 'Building Core Foundations', 
    desc: 'Technical immersion in C, C++, and Python. First exposure to cloud and AI fundamentals through AZ-900 and AI-900 frameworks.' 
  },
  { 
    title: 'Exploring Ideas Through Projects', 
    desc: 'Applying AI to real-world scenarios. Developed QueueMind and VoteWise to explore predictive analytics and recommendation systems.' 
  },
  { 
    title: 'Defining Direction & Expanding Scope', 
    desc: 'Currently studying at NIMS University. Expanding focus into cybersecurity, networking, and the potential of extended reality (XR).' 
  },
  { 
    title: 'Moving Towards Advanced Systems', 
    desc: 'Refining the intersection of AI and security. Exploring system-level thinking and the implementation of immersive technical environments.' 
  }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress line animation
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        { 
          scaleY: 1, 
          ease: "none", 
          scrollTrigger: { 
            trigger: containerRef.current, 
            start: "top 25%", 
            end: "bottom 75%", 
            scrub: true 
          } 
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="timeline" className="min-h-screen py-40 relative z-10 w-full max-w-4xl mx-auto px-6">
      <h2 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-32 text-center font-bold">The Journey</h2>
      
      <div className="relative w-full">
        {/* Background base line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
        
        {/* Active progress line */}
        <div ref={lineRef} className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-blue-500 -translate-x-1/2 origin-top" />

        <div className="flex flex-col gap-32">
          {events.map((event, i) => (
            <div key={i} className={`relative flex flex-col md:flex-row items-start ${i % 2 === 0 ? 'md:flex-row-reverse text-left md:text-right' : 'text-left'}`}>
              {/* Dynamic Dot: Stays attached to its content automatically */}
              <div className="absolute left-6 md:left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 mt-2 md:mt-1.5 z-10 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              
              <div className="w-full md:w-5/12 pl-12 md:pl-0">
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">{event.title}</h3>
                <p className="text-white/40 font-light leading-relaxed text-base">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-48 text-center">
        <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-light">The journey continues.</p>
        
        <div className="mt-12 flex justify-center gap-8">
          <a href="https://github.com/Jaivardhan-Raahi" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-14 h-14 bg-white/[0.03] border border-white/10 rounded-full text-white/60 hover:text-white hover:bg-blue-500/10 hover:border-blue-400/50 transition-all interactable hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com/in/jaivardhan-raahi" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-14 h-14 bg-white/[0.03] border border-white/10 rounded-full text-white/60 hover:text-white hover:bg-blue-500/10 hover:border-blue-400/50 transition-all interactable hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <FaLinkedin size={24} />
          </a>
        </div>
        
        <footer className="mt-32 text-[10px] tracking-widest text-white/10 uppercase">
          © 2026 Jaivardhan Raahi
        </footer>
      </div>
    </section>
  );
}
