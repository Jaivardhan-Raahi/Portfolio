'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([textRef.current, subRef.current], 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.5, stagger: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="hero" className="h-screen w-full flex flex-col justify-center items-center relative z-10 pointer-events-none px-6 text-center">
      <h1 ref={textRef} className="text-4xl md:text-[6rem] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 select-none uppercase">
        Jaivardhan Raahi
      </h1>
      <p ref={subRef} className="mt-8 text-white/50 tracking-[0.2em] uppercase text-xs md:text-sm font-light max-w-2xl leading-relaxed">
        Building systems at the intersection of AI, web, and emerging tech.
      </p>
    </section>
  );
}
