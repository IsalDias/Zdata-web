"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import finverusLogo from "../public/images/finverus-logo.png";
import finverusBg from "../public/images/finverus-bg.png";

gsap.registerPlugin(ScrollTrigger);

export default function FinverusIntro() {
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
        ".finv-left",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          ".finv-right",
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
          "-=0.45"
        )
        .fromTo(
          ".finv-btn",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.35"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-8 sm:py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[2.25rem]">
          {/* background */}
          <Image
            src={finverusBg}
            alt="Finverus background"
            fill
            priority
            className="object-cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-[#061427]/70 align-middle" />

          {/* content */}
          <div className="relative grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 px-4 sm:px-8 py-10 sm:py-12 md:grid-cols-12 md:px-14 md:py-16">
            {/* LEFT: centered "Introducing" + logo */}
<div className="finv-left md:col-span-5 flex items-center">
  <div className="w-full flex flex-col items-center justify-center text-center">
    {/* Introducing */}
    <p className="text-base sm:text-xl md:text-2xl font-light text-white">
      Introducing
    </p>

    {/* Logo */}
    <div className="mt-4 sm:mt-5 w-[180px] sm:w-[260px] md:w-[320px] lg:w-[360px]">
      <Image
        src={finverusLogo}
        alt="Finverus logo"
        className="h-auto w-full object-contain"
        priority
      />
    </div>
  </div>
</div>


            {/* RIGHT */}
            <div className="finv-right md:col-span-7 flex flex-col justify-center">
              <p className="text-white/85 text-xs sm:text-sm md:text-[15px] leading-6 sm:leading-7 max-w-3xl text-justify">
                Finverus is a unified fintech and core banking ecosystem designed to power modern financial institutions. It brings together critical banking and lending capabilities into a single, scalable platform enabling faster innovation, 
                stronger compliance, and seamless customer experiences.
              </p>

              <p className="mt-4 sm:mt-6 text-white/85 text-xs sm:text-sm md:text-[15px] leading-6 sm:leading-7 max-w-3xl">
                From digital customer onboarding and AML customer screening to Loan Origination Systems (LOS) and core banking integrations, Finverus supports the complete financial services lifecycle. Built with security, regulatory compliance, and flexibility at its core, Finverus helps banks and financial
                institutions adapt confidently to an evolving digital landscape.
              </p>

              <div className="finv-btn mt-8 sm:mt-10 flex justify-center md:justify-start">
                <Link
                  href="https://calendly.com/zdatai"
                  className="inline-flex items-center gap-3 sm:gap-4 rounded-full bg-[#0ea5ff] px-5 sm:px-7 py-2 sm:py-3 text-xs sm:text-sm text-white font-medium hover:bg-[#0b94e6] transition"
                >
                  Schedule a call
                  <span className="inline-flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white text-[#0ea5ff] font-bold text-xs sm:text-sm">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* soft vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18)_0%,transparent_55%)]" />
        </div>
      </div>
    </section>
  );
}
