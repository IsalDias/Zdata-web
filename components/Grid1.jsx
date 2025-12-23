"use client";

import Image from "next/image";
import { Parallax } from "react-scroll-parallax";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import company1 from "../public/images/company1.png";
import company2 from "../public/images/company2.png";
import company3 from "../public/images/company3.png";
import company4 from "../public/images/company4.png";
import company5 from "../public/images/company5.png";
import company6 from "../public/images/company6.png";
import company7 from "../public/images/company7.png";
import company8 from "../public/images/company8.png";

gsap.registerPlugin(ScrollTrigger);

const PARTNERS = [
  { src: company1, alt: "HDFC Bank" },
  { src: company2, alt: "Mahindra Ideal Finance" },
  { src: company3, alt: "Seylan Bank" },
  { src: company4, alt: "LCB Finance" },
  { src: company5, alt: "Kingslake" },
  { src: company6, alt: "OpenArc" },
  { src: company7, alt: "Muntra" },
  { src: company8, alt: "Muntra" },
];

export default function Grid1() {
  const gridRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ detect mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ✅ GSAP only on desktop (prevents "white" flash on mobile)
  useEffect(() => {
    if (isMobile) return; // ✅ disable on mobile

    const ctx = gsap.context(() => {
      const cells = gsap.utils.toArray(".partner-cell");

      gsap.fromTo(
        cells,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reset play reset",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      {/* background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:gap-14 lg:grid-cols-12 lg:items-center">
          {/* LEFT CONTENT – parallax */}
          <Parallax speed={0} className="lg:col-span-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-wide text-slate-700">
                Our Valued <span className="font-extrabold">Partners</span>
              </h2>

              <p className="mt-4 sm:mt-6 max-w-md text-xs sm:text-sm leading-6 sm:leading-7 text-slate-600">
                We collaborate with trusted organizations to create innovative,
                scalable, and reliable digital solutions. Our partnerships are
                built on shared values, technical excellence, and a commitment
                to delivering measurable impact.
              </p>
            </div>
          </Parallax>

          {/* RIGHT LOGO GRID */}
          <Parallax speed={6} className="lg:col-span-7">
            <div
              ref={gridRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-0"
            >
              {PARTNERS.map((p, idx) => (
                <div
                  key={idx}
                  className={`
  partner-cell
  flex items-center justify-center
  min-h-[100px] sm:min-h-[130px] md:min-h-[190px]
  px-3 bg-white

  border-r border-slate-300
  max-md:[&:nth-child(2n)]:border-r-0
  md:[&:nth-child(4n)]:border-r-0

  border-b border-slate-300
  [&:nth-last-child(-n+2)]:border-b-0
  md:[&:nth-last-child(-n+4)]:border-b-0
`}


                  // ✅ if GSAP is off (mobile), ensure always visible (no flash)
                  style={isMobile ? { opacity: 1, transform: "none" } : undefined}
                >
                  <Image src={p.src} alt={p.alt} width={120} height={80} />
                </div>
              ))}
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
