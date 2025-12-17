"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pill from "../public/images/cta-pill.png";

gsap.registerPlugin(ScrollTrigger);

export default function DigitalInnovationCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reset play reset",
        },
      });

      tl.fromTo(
        ".cta-top",
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: "power4.out" }
      )
        .fromTo(
          ".cta-pill",
          { opacity: 0, scale: 0.8, y: 8 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power4.out" },
          "-=0.15"
        )
        .fromTo(
          ".cta-title",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power4.out" },
          "-=0.25"
        )
        .fromTo(
          ".cta-subtitle",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power4.out" },
          "-=0.25"
        )
        .fromTo(
          ".cta-btn",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power4.out" },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#061427]">
      {/* FULL-BLEED top row: text aligned to container, line touches screen edge */}
      <div className="cta-top relative pt-6 md:pt-8">
        <div className="mx-auto max-w-[90rem] px-4">
          <div className="flex items-center justify-end gap-4">
            {/* <p className="text-xs sm:text-sm text-white/70 text-right leading-5 sm:leading-6">
              From idea to execution,
              <br />
              ZData powers your digital growth.
            </p> */}
          </div>
        </div>

        {/* this line is full-bleed to the right edge */}
        <div className="relative pt-6 md:pt-1">
          <div className="flex items-center gap-150 ">

            {/* TEXT (left aligned) */}
            <div className="px-40 m flex items-center gap-4">
              <p className="text-xs sm:text-sm text-white/70 leading-5 sm:leading-6">
                From idea to execution,
                <br />
                ZData powers your digital growth.
              </p>
            </div>

            {/* LINE (connects text → LEFT screen edge) */}
            <div className="h-px flex-1 bg-white/25" />
          </div>
        </div>

      </div>

      <div className="mx-auto max-w-[90rem] px-4">
        <div className="py-16 sm:py-20 md:py-24">
          <div className="flex flex-col items-center text-center">
            {/* ✅ Pill image + DIGITAL INNOVATION on the same row */}
            <div className="flex items-center justify-center gap-6">
              <div className="cta-pill relative h-14 w-56 overflow-hidden rounded-full ring-1 ring-white/15">
                <Image src={pill} alt="ZData team" fill className="object-cover" priority />
              </div>

              <h3 className="cta-title text-xl sm:text-2xl md:text-4xl font-light tracking-wide text-white">
                DIGITAL <span className="font-extrabold">INNOVATION</span>
              </h3>
            </div>

            {/* Big title + button */}
            <div className="mt-10 flex flex-col items-center gap-6 md:flex-row md:justify-center">
              <h2 className="cta-subtitle text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide">
                FOR THE <span className="font-extrabold">FUTURE OF FINANCE.</span>
              </h2>

              <Link
                href="/services"
                className="cta-btn inline-flex items-center gap-3 rounded-full bg-[#0ea5ff] px-6 py-3 text-white font-medium hover:bg-[#0b94e6] transition"
              >
                Services
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0ea5ff] font-bold">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
