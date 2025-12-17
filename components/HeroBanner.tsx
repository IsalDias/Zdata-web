"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Landingpage1 from "../public/images/Landingpage1.png";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroBanner() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  /* background parallax */
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

  /* GSAP text animation */
  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-animate",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 50,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play reset play reset",
          },
        }
      );
    }, contentRef);

    return () => ctx.revert();
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

      {/* text parallax (keep subtle) */}
      <Parallax speed={-10}>
        <div
          ref={contentRef}
          className="relative min-h-[650px] max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center"
        >
          <p className="hero-animate text-white/80">
            Let&apos;s create digital products that have a
          </p>

          <h1 className="hero-animate mt-3 text-4xl md:text-6xl font-extrabold text-white">
            SIGNIFICANT IMPACT
          </h1>

          <Link
            href="/request-demo"
            className="hero-animate mt-10 inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-white hover:bg-white/10"
          >
            Schedule a call →
          </Link>
        </div>
      </Parallax>
    </section>
  );
}
