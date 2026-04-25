'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([cursorRef.current, followerRef.current], { xPercent: -50, yPercent: -50 });
      
      const xToCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
      const yToCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
      
      const xToFollower = gsap.quickTo(followerRef.current, "x", { duration: 0.6, ease: "power3" });
      const yToFollower = gsap.quickTo(followerRef.current, "y", { duration: 0.6, ease: "power3" });

      const onMouseMove = (e: MouseEvent) => {
        xToCursor(e.clientX);
        yToCursor(e.clientY);
        xToFollower(e.clientX);
        yToFollower(e.clientY);
      };

      window.addEventListener("mousemove", onMouseMove);
      
      const handleInteractEnter = () => {
        gsap.to(followerRef.current, { scale: 1.5, backgroundColor: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 0.8)', duration: 0.3 });
      };
      
      const handleInteractLeave = () => {
        gsap.to(followerRef.current, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(255, 255, 255, 0.5)', duration: 0.3 });
      };

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, input, textarea, .interactable')) {
          handleInteractEnter();
        }
      };

      const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, input, textarea, .interactable')) {
          handleInteractLeave();
        }
      };

      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseout', handleMouseOut);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="hidden md:block pointer-events-none">
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full z-[100] mix-blend-difference" />
      <div ref={followerRef} className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full z-[99] transition-colors" />
    </div>
  );
}
