'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-element", 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 1.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%"
          }
        }
      );
      
      const inputs = document.querySelectorAll('.contact-input');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          gsap.to(input, { borderColor: 'rgba(59,130,246,0.8)', backgroundColor: 'rgba(59,130,246,0.05)', duration: 0.3 });
        });
        input.addEventListener('blur', () => {
          gsap.to(input, { borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)', duration: 0.3 });
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="contact" className="py-40 px-6 max-w-6xl mx-auto w-full z-10 relative">
      <div className="text-center mb-32 contact-element">
        <h2 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-6">Let's Build</h2>
        <p className="text-white/50 text-2xl font-light tracking-widest uppercase">Initiate sequence.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-20">
        <div className="space-y-16 contact-element">
          <div>
            <h3 className="text-sm tracking-[0.2em] uppercase text-white/40 mb-6 font-bold">Comms Link</h3>
            <a href="mailto:hello@jaivan.dev" className="flex items-center gap-6 text-white/60 hover:text-blue-400 transition-colors interactable w-fit group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                <Mail className="text-white group-hover:text-blue-400 transition-colors" size={20} />
              </div>
              <span className="text-2xl font-light">hello@jaivan.dev</span>
            </a>
          </div>
          
          <div>
            <h3 className="text-sm tracking-[0.2em] uppercase text-white/40 mb-6 font-bold">Network</h3>
            <div className="flex gap-6">
              {[FaGithub, FaLinkedin, FaTwitter].map((Icon, i) => (
                <a key={i} href="#" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all interactable hover:scale-110">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <form className="space-y-6 contact-element">
          <input type="text" placeholder="Name" className="contact-input w-full p-6 bg-white/[0.02] border border-white/10 rounded-2xl text-white outline-none interactable text-lg font-light transition-colors" />
          <input type="email" placeholder="Email" className="contact-input w-full p-6 bg-white/[0.02] border border-white/10 rounded-2xl text-white outline-none interactable text-lg font-light transition-colors" />
          <textarea placeholder="Message" rows={5} className="contact-input w-full p-6 bg-white/[0.02] border border-white/10 rounded-2xl text-white outline-none interactable text-lg font-light transition-colors resize-none" />
          <button type="button" className="w-full py-6 bg-white text-black font-bold rounded-2xl hover:bg-blue-500 hover:text-white transition-all interactable text-lg tracking-widest uppercase mt-4 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Transmit Data
          </button>
        </form>
      </div>
    </section>
  );
}
