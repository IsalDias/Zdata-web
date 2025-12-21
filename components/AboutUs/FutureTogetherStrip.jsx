"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FutureTogetherStrip() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const text = el.querySelector("[data-text]");
    const shine = el.querySelector("[data-shine]");

    const ctx = gsap.context(() => {
      // Smooth reveal on scroll
      gsap.fromTo(
        el,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );

      // Text pop a bit (smooth)
      gsap.fromTo(
        text,
        { letterSpacing: "0.02em", opacity: 0, y: 8 },
        {
          letterSpacing: "0.08em",
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );

      // Subtle shimmer sweep (runs once when visible)
      if (shine) {
        gsap.fromTo(
          shine,
          { xPercent: -120, opacity: 0 },
          {
            xPercent: 120,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="w-full">
      <div className="relative overflow-hidden bg-[#00305D] border-y border-white/15">
        {/* shimmer overlay */}
        <div
          data-shine
          className="pointer-events-none absolute inset-y-0 left-0 w-[45%] opacity-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
            filter: "blur(1px)",
          }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-4 sm:py-5">
          <p
            data-text
            className="text-center text-white font-regular uppercase tracking-[0.08em]
                       text-[12px] sm:text-[14px] md:text-[18px] leading-snug"
          >
            LET’S SHAPE THE <span className="font-bold">FUTURE TOGETHER.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
