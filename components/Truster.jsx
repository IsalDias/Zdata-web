"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import company1 from "../public/images/company1.png";
import company2 from "../public/images/company2.png";

gsap.registerPlugin(ScrollTrigger);

export default function TrustedCompanies({ items = [] }) {
  // ✅ Use PUBLIC path strings (no imports from /public)
  const data = useMemo(
    () =>
      items.length
        ? items
        : [
          {
            name: "SEYLAN",
            logo: company1,
            title: "TRUSTED BY LEADING COMPANIES",
            p1: "Our expertise spans custom software development, managed IT services, consultancy, and team augmentation, tailored to meet the evolving needs of diverse industries. We take a client-centric approach, delivering scalable solutions that align with strategic goals and create long-term value.",
            p2: "At ZData Innovations, we are committed to excellence, innovation, and collaboration. Our team of seasoned professionals blends technical expertise with creativity to build robust.",
          },
          {
            name: "PEOPLE’S LEASING",
            logo: company2,
            title: "TRUSTED BY LEADING COMPANIES",
            p1: "Our expertise spans custom software development, managed IT services, consultancy, and team augmentation, tailored to meet the evolving needs of diverse industries. We take a client-centric approach, delivering scalable solutions that align with strategic goals and create long-term value.",
            p2: "More details here. Replace with your real content.",
          },
        ],
    [items]
  );

  const [index, setIndex] = useState(0);
  const current = data[index];

  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const nextBtnRef = useRef(null);
  const prevBtnRef = useRef(null);

  // ✅ Scroll-in animation (replays when entering again)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tc-in",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
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

  // ✅ When slide changes: animate logo + text in
  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tc-swap",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.06 }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const animateButtonTap = (btnRef) => {
    if (!btnRef.current) return;
    gsap.fromTo(
      btnRef.current,
      { scale: 1 },
      { scale: 0.92, duration: 0.08, yoyo: true, repeat: 1, ease: "power1.out" }
    );
  };

  const next = () => {
    animateButtonTap(nextBtnRef);
    setIndex((i) => (i + 1) % data.length);
  };

  const prev = () => {
    animateButtonTap(prevBtnRef);
    setIndex((i) => (i - 1 + data.length) % data.length);
  };

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[100rem] px-4">
        <div
          ref={cardRef}
          className="
    tc-in relative rounded-3xl bg-[#f7f7f7]
    px-8 py-14 md:px-14 md:py-16
    min-h-[520px] md:min-h-[420px]
  "
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
            {/* LEFT: Logo (parallax) */}
            <div className="md:col-span-5 flex items-center justify-center">
              <Parallax speed={-8}>
                <div className="tc-swap relative h-28 w-[320px] md:h-24 md:w-[520px]">
                  <Image
                    src={current.logo}
                    alt={`${current.name} logo`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Parallax>
            </div>

            {/* Divider */}
            <div className="hidden md:col-span-1 md:flex md:justify-center">
              <div className="tc-swap h-56 w-px bg-slate-300" />
            </div>

            {/* RIGHT: Text (parallax opposite) */}
            <div className="md:col-span-6">
              <Parallax speed={6}>
                <h3 className="tc-swap text-2xl md:text-3xl font-light text-slate-700 tracking-wide">
                  {current.title.split("LEADING COMPANIES")[0]}
                  <span className="font-extrabold text-slate-700">
                    LEADING COMPANIES
                  </span>
                </h3>

                <p className="tc-swap mt-6 text-sm md:text-[15px] leading-7 text-slate-600">
                  {current.p1}
                </p>

                <p className="tc-swap mt-6 text-sm md:text-[15px] leading-7 text-slate-600">
                  {current.p2}
                </p>
              </Parallax>
            </div>
          </div>

          {/* Controls */}
          {data.length > 1 && (
            <>
              <button
                ref={prevBtnRef}
                onClick={prev}
                aria-label="Previous company"
                className="absolute left-6 bottom-6 rounded-full border border-slate-300 bg-white/70 px-4 py-3 text-slate-700 hover:bg-white"
              >
                ←
              </button>

              <button
                ref={nextBtnRef}
                onClick={next}
                aria-label="Next company"
                className="absolute right-6 bottom-6 rounded-full border border-slate-300 bg-white/70 px-4 py-3 text-slate-700 hover:bg-white"
              >
                →
              </button>

              {/* Dots */}
              <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-2">
                {data.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full ${i === index ? "bg-slate-700" : "bg-slate-300"
                      }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
