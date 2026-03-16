'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothReveal({
  children,
  direction = 'up',
  duration = 0.8, // Réduit de 1.2 à 0.8
  delay = 0,
  className = ''
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(container, { opacity: 1, x: 0, y: 0 });
      return;
    }

    const directions = {
      up: { y: 60, x: 0 }, // Réduit de 100 à 60
      down: { y: -60, x: 0 },
      left: { x: 60, y: 0 },
      right: { x: -60, y: 0 }
    };

    gsap.set(container, {
      opacity: 0,
      force3D: true, // GPU acceleration
      ...directions[direction]
    });

    ScrollTrigger.create({
      trigger: container,
      start: 'top 90%', // Trigger plus tôt (85% -> 90%)
      once: true,
      onEnter: () => {
        gsap.to(container, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: duration,
          delay: delay,
          ease: 'power2.out', // Ease plus rapide
          force3D: true
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) trigger.kill();
      });
    };
  }, [direction, duration, delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
