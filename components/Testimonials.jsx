"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import t1 from "../public/images/t1.png";
import t2 from "../public/images/t2.png";
import company1 from "@/public/images/company1.png";
import company2 from "@/public/images/company7.png";


gsap.registerPlugin(ScrollTrigger);

const DEFAULT_ITEMS = [
  {
    id: "lcb1",
    image: t1,
    companyimage: company1,
    headingLight: "WHAT THEY",
    headingBold: "SAY ABOUT US",
    p1: "ZData Innovations has been a trusted partner in managing and optimizing the core banking database and application platform at People’s Leasing & Finance PLC.",
    p2: "Their expertise in handling our database, application servers, and underlying operating systems as part of their managed IT services has been instrumental in ensuring the stability, performance, and scalability of our mission-critical systems.",
    name: "Prabath Gunasena",
    designation: "Senior Deputy General Manager – ICT\nPeople’s Leasing & Finance PLC (PLC)",
  },
  {
    id: "lcb2",
    image: t2,
    companyimage: company2,
    headingLight: "WHAT THEY",
    headingBold: "SAY ABOUT US",
    p1: "ZData Innovations, led by Nuwan and his team, exemplifies a structured, analytical, and driven approach. Their problem-solving and people skills make them highly capable.",
    p2: "Nuwan quickly builds strong relationships with clients and stakeholders, creating a collaborative and productive working environment. Anyone partnering with ZData Innovations will be delighted and grateful for their expertise and dedication.",
    name: "Niels Rask",
    designation: "Co-Founder & CTO – Muntra AB\n",
  },
];

export default function Testimonials({ items = DEFAULT_ITEMS }) {
  const data = useMemo(() => (items?.length ? items : DEFAULT_ITEMS), [items]);
  const [index, setIndex] = useState(0);
  const current = data[index];

  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const next = () => setIndex((i) => (i + 1) % data.length);
  const prev = () => setIndex((i) => (i - 1 + data.length) % data.length);

  // ✅ Scroll-in animation for whole section
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ts-enter",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ✅ Animate when switching items (next/prev)
  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ts-swap",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.06 }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <section ref={sectionRef} className="bg-white py-3 md:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 md:grid-cols-12 md:items-start">
          {/* LEFT IMAGE (Parallax) */}
          <div className="ts-enter md:col-span-4">
            <Parallax speed={-3}>
              <div className="relative overflow-hidden rounded-2xl bg-slate-200">
                <div className="relative h-[300px] sm:h-[360px] md:h-[520px]">
                  <Image
                    src={current.image}
                    alt={current.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </Parallax>
          </div>

          {/* RIGHT CONTENT */}
          <div ref={contentRef} className="ts-enter md:col-span-8 md:pl-10">
            <h3 className="ts-swap text-lg sm:text-xl md:text-2xl font-light tracking-wide text-slate-600 py-2">
              {current.headingLight}{" "}
              <span className="font-extrabold text-slate-700">
                {current.headingBold}
              </span>
            </h3>

            <p className="ts-swap mt-4 sm:mt-6 text-xs sm:text-sm md:text-[15px] leading-6 sm:leading-7 text-slate-600">
              {current.p1}
            </p>

            <p className="ts-swap mt-4 sm:mt-6 text-xs sm:text-sm md:text-[15px] leading-6 sm:leading-7 text-slate-600">
              {current.p2}
            </p>

            <div className="ts-swap mt-8 sm:mt-10">
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                {current.name}
              </p>
              <p className="mt-1 text-xs text-slate-500 py-1">{current.designation}</p>
              <Image className="w-35 h-atuo" src={current.companyimage} alt="Company Logo" />
            </div>
            <div >

              {data.length > 1 && (
                <div className="ts-enter col-span-full flex justify-start gap-3 mt-8 sm:mt-10 ">
                  {/* <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="
        h-10 w-10 rounded-full
        border border-slate-300 bg-white
        hover:bg-slate-50 transition
      "
                  >
                    ←
                  </button> */}

                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className="
        h-10 w-10 rounded-full
        border border-slate-300 bg-white
        hover:bg-slate-50 transition
      "
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}

        </div>
      </div>
    </section>
  );
}
