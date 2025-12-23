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
          toggleActions: "play none play none",
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
      {/* TOP STRIP: short line on left + text starts right after line */}
      <div className="cta-top pt-4 sm:pt-6 md:pt-8">
        <div className="flex items-start gap-4">
          {/* TEXT */}
          {/* <p className="ml-auto text-xs sm:text-sm text-white/70 leading-4 sm:leading-5 text-right">
            From idea to execution,
            <br />
            ZData powers your digital growth.
          </p> */}

          {/* LINE — touches right screen edge */}
          {/* <div className="h-px w-24 sm:w-32 md:w-70 bg-white/25 mt-2.5 sm:mt-3" /> */}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
        <div className="py-12 sm:py-16 md:py-20 lg:py-16">
          <div className="flex flex-col items-center text-center">
            {/* Pill + DIGITAL INNOVATION */}
            {/* CENTER STACK — equal spacing everywhere */}
            <div className="mt-4 sm:mt-6 flex flex-col items-center gap-4 sm:gap-6">
              {/* DIGITAL INNOVATION */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <div className="cta-pill relative h-12 sm:h-14 w-44 sm:w-56 overflow-hidden rounded-full ring-1 ring-white/15">
                  <Image
                    src={pill}
                    alt="ZData team"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <h3 className="cta-title text-sm sm:text-xl md:text-2xl lg:text-3xl font-light tracking-wide text-white">
                  DIGITAL <span className="font-extrabold">INNOVATION</span>
                </h3>
              </div>

              {/* FUTURE OF FINANCE */}
              <h2 className="cta-subtitle text-lg sm:text-3xl md:text-4xl lg:text-4xl font-light text-white tracking-wide text-center">
                FOR THE <span className="font-extrabold">FUTURE OF FINANCE.</span>
              </h2>

              {/* SERVICES BUTTON */}
              <Link
                href="/services"
                className="cta-btn inline-flex items-center gap-3 rounded-full bg-[#0ea5ff] px-5 py-3 text-sm text-white font-medium hover:bg-[#0b94e6] transition"
              >
                Services
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0ea5ff] font-bold text-sm">
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
