'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    title: "Core Interests",
    skills: ["AI", "Systems", "Cybersecurity", "XR"]
  },
  {
    title: "Technologies",
    skills: ["C", "C++", "Python", "Web Development"]
  },
  {
    title: "Focus Areas",
    skills: ["AI + Security", "System Design", "Networking"]
  }
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-reveal", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-40 px-6 max-w-6xl mx-auto w-full z-10 relative">
      <div className="grid md:grid-cols-12 gap-12 md:gap-24">
        <div className="md:col-span-7 text-center md:text-left">
          <h2 className="text-xs tracking-[0.3em] uppercase text-blue-500 font-bold mb-8 about-reveal">Discovery</h2>
          <p className="text-white/80 text-2xl md:text-3xl font-light leading-relaxed about-reveal">
            I explore complex systems through experimentation. My work is driven by a deep curiosity for how things work—from low-level software architecture to the high-level intelligence of AI.
          </p>
          <p className="text-white/50 text-lg mt-8 leading-relaxed about-reveal font-light">
            Currently studying at NIMS University, I focus on building intentional prototypes that bridge the gap between security, intelligence, and immersive experiences.
          </p>
        </div>
        
        <div className="md:col-span-5 space-y-12">
          {skillGroups.map((group, i) => (
            <div key={i} className="about-reveal text-center md:text-left">
              <h3 className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4 font-bold">{group.title}</h3>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {group.skills.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-white/70 text-xs font-mono lowercase">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
