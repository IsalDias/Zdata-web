"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Landingpage1 from "../public/images/Landingpage1.png";
import { Parallax } from "react-scroll-parallax";

export default function HeroBanner() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      const progress = (windowH - rect.top) / (windowH + rect.height);
      const clamped = Math.min(1, Math.max(0, progress));

      setOffset((clamped - 0.5) * 80);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${Landingpage1.src})`,
        backgroundPosition: `center calc(50% + ${offset}px)`,
      }}
    >
      <div className="absolute inset-0 bg-black/0" />

      {/* ✅ Add Parallax HERE */}
      <Parallax speed={-30}>
        <div className="relative min-h-[650px] max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          <p className="text-white/80">
            Let&apos;s create digital products that have a
          </p>

          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold text-white">
            SIGNIFICANT IMPACT
          </h1>

          <Link
            href="/request-demo"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-white hover:bg-white/10"
          >
            Schedule a call →
          </Link>
        </div>
      </Parallax>
    </section>
  );
}
