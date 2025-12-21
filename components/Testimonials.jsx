"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import t1 from "../public/images/t1.png";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_ITEMS = [
  {
    id: "lcb",
    image: t1,
    headingLight: "WHAT THEY",
    headingBold: "SAY ABOUT US",
    p1: "Our expertise spans custom software development, managed IT services, consultancy, and team augmentation, tailored to meet the evolving needs of diverse industries. We take a client-centric approach, delivering scalable solutions that align with strategic goals and create long-term value.",
    p2: "At ZData Innovations, we are committed to excellence, innovation, and collaboration. Our team of seasoned professionals blends technical expertise with creativity to build robust, future-ready solutions. As technology reshapes industries, we stay ahead of the curve, empowering businesses with cutting-edge tools to thrive in the digital era.",
    name: "Mr. Shiran Maduwantha",
    designation: "CEO - LCB",
  },
  {
    id: "lcb",
    image: t1,
    headingLight: "WHAT THEY",
    headingBold: "SAY ABOUT US",
    p1: "Our expertise spans custom software development, managed IT services, consultancy, and team augmentation, tailored to meet the evolving needs of diverse industries. We take a client-centric approach, delivering scalable solutions that align with strategic goals and create long-term value.",
    p2: "At ZData Innovations, we are committed to excellence, innovation, and collaboration. Our team of seasoned professionals blends technical expertise with creativity to build robust, future-ready solutions. As technology reshapes industries, we stay ahead of the curve, empowering businesses with cutting-edge tools to thrive in the digital era.",
    name: "Mr. Shiran Maduwantha",
    designation: "CEO - LCB",
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
            toggleActions: "play reset play reset",
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
    <section ref={sectionRef} className="bg-white py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 md:grid-cols-12 md:items-start">
          {/* LEFT IMAGE (Parallax) */}
          <div className="ts-enter md:col-span-4">
            <Parallax speed={-6}>
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
            <h3 className="ts-swap text-lg sm:text-xl md:text-2xl font-light tracking-wide text-slate-600">
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
              <p className="mt-1 text-xs text-slate-500">{current.designation}</p>

              {data.length > 1 && (
                <div className="ts-enter col-span-full flex justify-start gap-3 mt-8 sm:mt-10 py-12 sm:py-16 md:py-20">
                  <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="
        h-10 w-10 rounded-full
        border border-slate-300 bg-white
        hover:bg-slate-50 transition
      "
                  >
                    ←
                  </button>

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
