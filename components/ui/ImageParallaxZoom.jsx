'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function ImageParallaxZoom({
  src,
  alt = '',
  height = '100vh',
  zoomIntensity = 1.6,
  mobileZoomIntensity = null,
  className = ''
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    // Use mobile zoom intensity if provided and on mobile, otherwise use default
    const effectiveZoom = isMobile && mobileZoomIntensity !== null ? mobileZoomIntensity : zoomIntensity;

    // Calculate initial scale to ensure proper dezoom on mobile
    const initialScale = effectiveZoom < 1 ? effectiveZoom : 1;
    const targetScale = effectiveZoom < 1 ? 1 : effectiveZoom;

    // Zoom in pendant le scroll
    gsap.fromTo(
      image,
      {
        scale: initialScale
      },
      {
        scale: targetScale,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) trigger.kill();
      });
    };
  }, [zoomIntensity, mobileZoomIntensity, isMobile]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      <div ref={imageRef} className="w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          quality={100}
          priority
          placeholder="empty"
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 100vw"
        />
      </div>
    </div>
  );
}
