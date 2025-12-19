"use client";

import Image from "next/image";
import LogoZ from "@/public/images/z-logo.png";

import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ServicesHero() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".sh-anim", { opacity: 0, y: 18 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reset play reset",
          },
        })
        .to(".sh-logo", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
        .to(".sh-title", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.35")
        .to(".sh-text", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.35");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <ParallaxProvider>
      <section ref={sectionRef} className="relative w-full overflow-hidden">
        {/* ===== Creative Background ===== */}
        <div className="absolute inset-0">
          {/* base gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2250bb] via-[#0d2452] to-[#0a1638]" />

          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
              maskImage: "radial-gradient(circle at 20% 30%, black 0%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(circle at 20% 30%, black 0%, transparent 70%)",
            }}
          />

          {/* animated blobs */}
          <div className="pointer-events-none absolute -left-48 top-1/2 h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-blue-200/20 blur-[140px] sh-blob-a" />
          <div className="pointer-events-none absolute -right-56 top-[-180px] h-[680px] w-[680px] rounded-full bg-sky-400/15 blur-[160px] sh-blob-b" />
          <div className="pointer-events-none absolute left-1/3 bottom-[-260px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-400/10 blur-[170px] sh-blob-c" />

          {/* shimmer overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-30 sh-shimmer" />
        </div>

        {/* Glow blobs (parallax) */}
        <Parallax speed={-10}>
          {/* ✅ FIXED: valid Tailwind sizes */}
          <div className="pointer-events-none absolute -left-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-blue-100/20 blur-[120px]" />
        </Parallax>

        <Parallax speed={-8}>
          <div className="pointer-events-none absolute right-[-200px] top-[-140px] h-[520px] w-[520px] rounded-full bg-sky-400/10 blur-[140px]" />
        </Parallax>

        {/* Content */}
        <div className="relative mx-auto flex min-h-[420px] max-w-6xl items-center px-6 py-14 md:min-h-[520px]">
          <div className="grid w-full items-center gap-10 md:grid-cols-2">
            <Parallax speed={-12}>
              <div className="sh-anim sh-logo relative mx-auto w-full max-w-[520px]">
                <div className="py-3" />
                <Image
                  src={LogoZ}
                  alt="Z logo"
                  priority
                  className="relative h-auto w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
                />
              </div>
            </Parallax>

            <div className="text-center md:text-left">
              <h2 className="sh-anim sh-title text-xl font-normal text-white/90 md:text-2xl">
                Our <span className="font-bold text-white">Services &</span>{" "}
                <span className="font-extrabold text-white">Expertise</span>
              </h2>

              <p className="sh-anim sh-text mt-7 max-w-xl text-sm leading-6 text-white/70 md:text-base md:leading-9">
                Creative Software works with the entire product life cycle from MVP
                to product support and maintenance. As one of the pioneers and
                leaders in Sri Lanka&apos;s tech industry, we have a strong brand
                name and attract the best local talent.
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          .sh-blob-a {
            animation: blobA 4s ease-in-out infinite;
          }
          .sh-blob-b {
            animation: blobB 6s ease-in-out infinite;
          }
          .sh-blob-c {
            animation: blobC 4s ease-in-out infinite;
          }
          .sh-shimmer {
            background: linear-gradient(
              120deg,
              transparent 0%,
              rgba(255, 255, 255, 0.08) 35%,
              transparent 70%
            );
            transform: translateX(-40%);
            animation: shimmer 1.5s ease-in-out infinite;
            mix-blend-mode: overlay;
          }

          @keyframes blobA {
            0% {
              transform: translate(0, -50%) scale(1);
            }
            50% {
              transform: translate(40px, -55%) scale(1.08);
            }
            100% {
              transform: translate(0, -50%) scale(1);
            }
          }
          @keyframes blobB {
            0% {
              transform: translate(0, 0) scale(1);
            }
            50% {
              transform: translate(-50px, 30px) scale(1.1);
            }
            100% {
              transform: translate(0, 0) scale(1);
            }
          }
          @keyframes blobC {
            0% {
              transform: translate(-50%, 0) scale(1);
            }
            50% {
              transform: translate(-45%, -30px) scale(1.12);
            }
            100% {
              transform: translate(-50%, 0) scale(1);
            }
          }
          @keyframes shimmer {
            0% {
              transform: translateX(-45%);
            }
            50% {
              transform: translateX(45%);
            }
            100% {
              transform: translateX(-45%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .sh-blob-a,
            .sh-blob-b,
            .sh-blob-c,
            .sh-shimmer {
              animation: none !important;
            }
          }
        `}</style>
      </section>
    </ParallaxProvider>
  );
}
