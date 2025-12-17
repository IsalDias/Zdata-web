"use client";

import Image from "next/image";
import { Parallax } from "react-scroll-parallax";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARTNERS = [
  { src: "/images/companies/company1.png", alt: "People’s Leasing" },
  { src: "/images/companies/company2.png", alt: "Mahindra Ideal Finance" },
  { src: "/images/companies/company3.png", alt: "Seylan Bank" },
  { src: "/images/companies/company4.png", alt: "LCB Finance" },
  { src: "/images/companies/company5.png", alt: "Kingslake" },
  { src: "/images/companies/company6.png", alt: "OpenArc" },
  { src: "/images/companies/company7.png", alt: "Muntra" },
  { src: "/images/companies/company8.png", alt: "PMF Finance" },
];

export default function Grid1() {
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cells = gsap.utils.toArray(".partner-cell");

      gsap.fromTo(
        cells,
        {
          opacity: 0,
          y: 40,
        },
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

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section className="relative bg-white py-24 md:py-2 lg:py-7">
      {/* background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
          {/* LEFT CONTENT – parallax */}
          <Parallax speed={0} className="lg:col-span-5">
            <div>
              <h2 className="text-3xl font-light tracking-wide text-slate-900">
                OUR VALUED <span className="font-extrabold">PARTNERS</span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-600">
                ZData Innovations Pvt Ltd, founded in 2023, is a dynamic software
                development and consultancy firm specializing in innovative and
                scalable digital solutions.
              </p>
            </div>
          </Parallax>

          {/* RIGHT LOGO GRID */}
          <Parallax speed={6} className="lg:col-span-7">
            <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4">
              {PARTNERS.map((p, idx) => (
                <div
                  key={idx}
                  className="
                    partner-cell
                    flex items-center justify-center
                    min-h-[160px] md:min-h-[190px]
                    px-3 bg-white
                    border-r border-slate-300
                    md:[&:nth-child(4n)]:border-r-0
                    border-b border-slate-300
                    [&:nth-last-child(-n+2)]:border-b-0
                    md:[&:nth-last-child(-n+4)]:border-b-0
                  "
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={220}
                    height={120}
                    className="max-h-24 md:max-h-28 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
