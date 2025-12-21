"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function HeroConnect() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const title = section.querySelector("[data-title]");
    const subtitle = section.querySelector("[data-subtitle]");
    const button = section.querySelector("[data-btn]");
    const grid = section.querySelector("[data-grid]");

    const ctx = gsap.context(() => {
      // Text reveal
      gsap.fromTo(
        [title, subtitle, button],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
        }
      );

      // Subtle grid drift animation
      if (grid) {
        gsap.fromTo(
          grid,
          { y: 0 },
          {
            y: -30,
            duration: 12,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleScrollToContact = () => {
    const target = document.getElementById("contact-section");
    if (!target) return;

    gsap.to(window, {
      duration: 1.1,
      scrollTo: { y: target, offsetY: 80 },
      ease: "power3.inOut",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden
                 py-32 sm:py-40 lg:py-42"
    >
      {/* 🔹 Animated grid background */}
      <div
        data-grid
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
      >
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 🔹 Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="text-center">
          <h1
            data-title
            className="text-3xl sm:text-4xl lg:text-5xl
                       font-light text-black/60"
          >
            Let’s Connect{" "}
            <span className="font-extrabold text-black">
              Through Innovation
            </span>
          </h1>

          <div
            data-subtitle
            className="mt-6 flex items-center justify-center gap-3
                       text-black/50 text-sm sm:text-base"
          >
            <span>Send Message</span>
            <button
              data-btn
              onClick={handleScrollToContact}
              aria-label="Scroll to contact"
              className="group inline-flex h-9 w-9 items-center justify-center
                         rounded-full bg-black/10 hover:bg-black/20 transition"
            >
              <span className="text-lg group-hover:translate-y-1 transition-transform">
                ↓
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
