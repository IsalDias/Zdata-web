"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";

import company1 from "@/public/images/company1.png";
import company2 from "@/public/images/company2.png";
import company3 from "@/public/images/company3.png";
import company4 from "@/public/images/company4.png";
import company5 from "@/public/images/company5.png";
import company6 from "@/public/images/company6.png";
import company7 from "@/public/images/company7.png";
import company8 from "@/public/images/company8.png";

export default function PartnersMarquee({
  speed = 80, // px/sec
  direction = "left", // "left" | "right"
  // ✅ FIX: use valid Tailwind heights
  heightClass = "h-20 sm:h-24 md:h-24",
  logoHeight = 34, // kept (not required now, but left as prop)
}) {
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const lastTsRef = useRef(0);

  // drag
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);

  const dir = direction === "right" ? -1 : 1;

  const base = useMemo(
    () => [
      { alt: "HDFC Bank", src: company1 },
      { alt: "Mahindra Ideal Finance", src: company2 },
      { alt: "Seylan Bank", src: company3 },
      { alt: "LCB Finance", src: company4 },
      { alt: "Kingslake", src: company5 },
      { alt: "OpenArc", src: company6 },
      { alt: "Muntra", src: company7 },
      { alt: "Partner", src: company8 },
    ],
    []
  );

  // ✅ Lighter repeat for mobile performance (still seamless because we render two copies below)
  const items = useMemo(() => {
    const repeats = 8; // was 18 (too heavy). increase to 10 if needed on ultra-wide screens
    const out = [];
    for (let i = 0; i < repeats; i++) out.push(...base);
    return out;
  }, [base]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // start mid-way
    el.scrollLeft = el.scrollWidth / 4;

    const tick = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (!isDownRef.current) {
        el.scrollLeft += dir * speed * dt;

        // wrap
        const half = el.scrollWidth / 2;
        if (half > 0) {
          if (el.scrollLeft >= half) el.scrollLeft -= half;
          if (el.scrollLeft < 0) el.scrollLeft += half;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = 0;
    };
  }, [speed, dir]);

  // Pointer handlers
  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;

    isDownRef.current = true;
    el.classList.add("cursor-grabbing");
    el.classList.remove("cursor-grab");

    const x = e.touches ? e.touches[0].pageX : e.pageX;
    startXRef.current = x;
    startScrollRef.current = el.scrollLeft;
  };

  const onPointerMove = (e) => {
    const el = trackRef.current;
    if (!el || !isDownRef.current) return;

    const x = e.touches ? e.touches[0].pageX : e.pageX;
    const walk = (startXRef.current - x) * 1.2;
    el.scrollLeft = startScrollRef.current + walk;
  };

  const endDrag = () => {
    const el = trackRef.current;
    if (!el) return;

    isDownRef.current = false;
    el.classList.remove("cursor-grabbing");
    el.classList.add("cursor-grab");
  };

  return (
    // ✅ Fix mobile spacing: keep vertical padding small on mobile
    <section className="w-full bg-white py-4 md:py-6">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-lg md:text-sm lg:text-2xl">
          <span className="font-normal">Our </span>
          <span className="font-bold">Valued Partners</span>
        </h2>

        <div className="mt-4 rounded-xl bg-white">
          <div
            ref={trackRef}
            className={[
              "relative w-full overflow-x-auto overflow-y-hidden",
              "scrollbar-hide",
              "cursor-grab select-none",
              heightClass,
              "will-change-scroll",
            ].join(" ")}
            // ✅ helps mobile scrolling + smoother dragging
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y",
              transform: "translateZ(0)",
            }}
            onMouseDown={onPointerDown}
            onMouseMove={onPointerMove}
            onMouseLeave={endDrag}
            onMouseUp={endDrag}
            onTouchStart={onPointerDown}
            onTouchMove={onPointerMove}
            onTouchEnd={endDrag}
          >
            {/* fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />

            {/* ✅ reduce vertical padding on mobile for no big gap */}
            <div className="flex w-max items-center gap-10 px-8 py-3 md:py-5">
              {[...items, ...items].map((logo, idx) => (
                <LogoItem key={`${logo.alt}-${idx}`} src={logo.src} alt={logo.alt} />
              ))}
            </div>
          </div>
        </div>

        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </section>
  );
}

function LogoItem({ src, alt }) {
  return (
    // ✅ IMPORTANT: parent must be relative when Image uses fill
    <div
      className="
        relative
        flex items-center justify-center
        w-[120px] h-[40px]
        sm:w-[140px] sm:h-[44px]
        md:w-[160px] md:h-[52px]
        lg:w-[180px] lg:h-[56px]
        opacity-85 grayscale transition
        hover:opacity-100 hover:grayscale-0
      "
    >
      <Image
        src={src}
        alt={alt}
        fill
        draggable={false}
        className="object-contain"
        sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, (max-width: 1024px) 160px, 180px"
      />
    </div>
  );
}
