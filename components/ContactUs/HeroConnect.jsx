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
    const gradient = section.querySelector("[data-gradient]");

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

      // ✅ Grid drift (small movement, infinite, smooth)
      if (grid) {
        gsap.fromTo(
          grid,
          { y: -18 },
          {
            y: 18,
            duration: 10,
            ease: "sine.inOut",
            repeat: -1, // <-- infinite
            yoyo: true,
          }
        );
      }

      // ✅ Moving gradient overlay
      if (gradient) {
        gsap.fromTo(
          gradient,
          { xPercent: -20 },
          {
            xPercent: 20,
            duration: 8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }
        );

        // optional slow “breathing” opacity for nicer feel
        gsap.fromTo(
          gradient,
          { opacity: 0.35 },
          {
            opacity: 0.55,
            duration: 6,
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
      scrollTo: { y: target, offsetY: 290 },
      ease: "power3.inOut",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden py-32 sm:py-40 lg:py-42"
    >
      {/* ✅ Moving gradient overlay (separate layer) */}
      <div
        data-gradient
        className={[
          "pointer-events-none absolute inset-0",
          "bg-gradient-to-r from-blue-500/0 via-blue-900 to-purple-500/0",
          "blur-3xl",
        ].join(" ")}
      />

      {/* ✅ Grid background (make it bigger than section so drift never shows gaps) */}
      <div
        data-grid
        className="pointer-events-none absolute -inset-10 opacity-[0.4]"
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
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
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 text-white">
        <div className="text-center">
          <h1
            data-title
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-white"
          >
            Let’s Connect{" "}
            <span className="font-extrabold text-white">Through Innovation</span>
          </h1>

          <div
            data-subtitle
            className="mt-6 flex items-center justify-center gap-3 text-white text-sm sm:text-base"
          >
            <span>Send Message</span>
            <button
              data-btn
              onClick={handleScrollToContact}
              aria-label="Scroll to contact"
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full bg-white hover:bg-white transition"
            >
              <span className="text-lg group-hover:translate-y-1 transition-transform text-black">
                ↓
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
