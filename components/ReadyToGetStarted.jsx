"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ReadyToGetStarted() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".rgs-line", { opacity: 0, y: 18 });
      gsap.set(".rgs-btn", { opacity: 0, y: 14, scale: 0.98 });
      gsap.set(".rgs-top", { opacity: 0, y: -8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reset play reset",
        },
      });

      tl.to(".rgs-top", {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power4.out",
      })
        .to(".rgs-line", {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power4.out",
          stagger: 0.12,
        })
        .to(
          ".rgs-btn",
          {
            opacity: 1,
            y: 0,
            // scale: 1,
            duration: 0.1,
            ease: "power4.out",
          },
          "-=0.15"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f3f3f3] py-16 md:py-24 ">
      <div className="mx-auto max-w-7xl px-4">
        {/* top mini text + right line */}
        <div className="relative mb-10 md:mb-14">
          <div className="rgs-top flex items-start justify-end gap-4">
            <p className="text-[10px] sm:text-xs text-slate-500 text-right leading-4">
              From idea to execution,
              <br />
              ZData powers your digital growth.
            </p>
            <div className="h-px w-[32vw] max-w-[360px] bg-slate-300" />
          </div>
        </div>

        {/* main center text */}
        <div className="text-center">
          <h2 className="rgs-line text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-slate-700">
            LET&apos;S TRANSFORM <span className="font-extrabold">YOUR FINTECH JOURNEY</span>
          </h2>

          <h3 className="rgs-line mt-2 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide text-slate-700">
            TOGETHER. READY TO <span className="font-light">GET STARTED?</span>
          </h3>

          {/* button */}
          <div className="mt-10 md:mt-12 flex justify-center">
            <Link
              href="/contactus"
              className="rgs-btn inline-flex items-center gap-3 rounded-full bg-[#0ea5ff] px-6 py-3 text-white text-sm font-medium hover:bg-[#0b94e6] transition"
            >
              Contact Us
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0ea5ff] font-bold">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
