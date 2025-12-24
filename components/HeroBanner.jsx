"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Landingpage1 from "../public/images/Landingpage1.png";
import LandingpageMob from "../public/images/LandingpageMob.png"; // (kept import even if unused)
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ✅ MUI
import Skeleton from "@mui/material/Skeleton";

gsap.registerPlugin(ScrollTrigger);

export default function HeroBanner() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const [offset, setOffset] = useState(0);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ✅ preload the background image we actually use (desktop image for both)
  useEffect(() => {
    setBgLoaded(false); // show skeleton while loading / switching
    const src = Landingpage1.src; // ✅ always desktop bg

    const img = new window.Image();
    img.src = src;

    const done = () => setBgLoaded(true);
    img.onload = done;
    img.onerror = done; // fail-safe: don't block UI forever

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isMobile]);

  /* background parallax (disable on mobile) */
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      const progress = (windowH - rect.top) / (windowH + rect.height);
      const clamped = Math.min(1, Math.max(0, progress));

      setOffset(isMobile ? 0 : (clamped - 0.5) * 80);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  /* GSAP text animation */
  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-animate",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 50,
          duration: 0.8,
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
      className="hero-bg relative w-full bg-cover bg-center overflow-hidden"
      style={{
        // ✅ always desktop image background
        ["--hero-bg"]: `url(${Landingpage1.src})`,
        backgroundImage: "var(--hero-bg)",

        // ✅ desktop keeps your parallax position, mobile uses fixed nice crop
        backgroundPosition: isMobile
          ? "center 45%"
          : `center calc(60% + ${offset}px)`,

        // ✅ scale up only on mobile, keep cover on desktop
        backgroundSize: isMobile ? "260%" : "cover",

        // ✅ mobile not full screen (50% viewport height), desktop full screen
        height: isMobile ? "10vh" : "100vh",
        minHeight: isMobile ? "50vh" : "100vh",
      }}
    >
      {/* ✅ Skeleton overlay while loading */}
      {!bgLoaded && (
        <div className="absolute inset-0 z-50">
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            sx={{
              bgcolor: "rgba(255,255,255,0.06)",
            }}
          />
          {/* optional tint so it matches your hero tone */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      <div className="absolute inset-0 bg-black/10 py-10" />

      <Parallax speed={-10}>
        <div
          ref={contentRef}
          className="relative h-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center py-18 sm:py-12 md:py-61"
        >
          <p className="hero-animate text-xs sm:text-sm md:text-base text-white/80 tracking-wide">
            Let&apos;s create digital products that have a
          </p>

          <h1 className="hero-animate mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            SIGNIFICANT IMPACT
          </h1>

          <Link
            href="https://calendly.com/zdatai"
            className="hero-animate mt-8 sm:mt-10 inline-flex items-center gap-2 rounded-full border border-white/40 px-5 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-white hover:bg-white/10 transition"
          >
            Schedule a call →
          </Link>
        </div>
      </Parallax>

      <style jsx>{`
        @media (max-width: 940px) {
          .hero-bg {
            /* optional extra safety: keep it centered on mobile */
            background-repeat: no-repeat;
          }
        }
      `}</style>
    </section>
  );
}
