"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ✅ Image from /public (as requested)
import finverushand from "@/public/images/finverushand.png";

gsap.registerPlugin(ScrollTrigger);

/**
 * Usage:
 * <FintechIntro
 *   eyebrow="INTRODUCING THE"
 *   title="UNIVERSE OF"
 *   highlight="FINTECH"
 *   titleTail="INNOVATION"
 *   paragraphs={[
 *     "ZData Innovations Pvt Ltd, founded in 2023, is a dynamic software development and consultancy firm specializing in innovative and cost-effective technology solutions. Based in Malabe, Sri Lanka, we help businesses accelerate growth, enhance efficiency, and drive digital transformation.",
 *     "Our expertise spans custom software development, managed IT services, consultancy, and team augmentation, tailored to meet the evolving needs of diverse industries. We take a client-centric approach, delivering scalable solutions that align with strategic goals and create long-term value.",
 *   ]}
 * />
 */

export default function FintechIntro({
  eyebrow = "Introducing the",
highlight1 = "FINTECH",
  title = "Universe of",
  highlight = "FINTECH",
  titleTail = "Innovation",
  paragraphs = [
    "ZData Innovations Pvt Ltd, founded in 2023, is a dynamic software development and consultancy firm specializing in innovative and cost-effective technology solutions. Based in Malabe, Sri Lanka, we help businesses accelerate growth, enhance efficiency, and drive digital transformation.",
    "Our expertise spans custom software development, managed IT services, consultancy, and team augmentation, tailored to meet the evolving needs of diverse industries. We take a client-centric approach, delivering scalable solutions that align with strategic goals and create long-term value.",
  ],
}) {
  const sectionRef = useRef(null);

  const content = useMemo(() => paragraphs.filter(Boolean), [paragraphs]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".fi-anim", { opacity: 0, y: 16 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        })
        .to(".fi-title", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
        .to(".fi-text", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 }, "-=0.35")
        .to(".fi-img", { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }, "-=0.55");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white py-14 md:py-32">
      {/* ✅ Grid background with center white fade */}
      <div className="pointer-events-none absolute inset-0">
        {/* base white */}
        <div className="absolute inset-0 bg-white" />

        {/* grid lines (more visible at edges, fades at center) */}
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(15,23,42,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.07) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            // Center becomes white (grid hidden), edges show grid
            maskImage: "radial-gradient(circle at center, transparent 0%, black 68%)",
            WebkitMaskImage: "radial-gradient(circle at center, transparent 0%, black 68%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* LEFT: text */}
          <Parallax speed={-3}>
            <div className="max-w-xl">
              <div className="fi-anim fi-title">
                <p className="text-3xs font-semibold tracking-[0.20em] text-slate-500">
                  {eyebrow}
                </p>

                <h2 className="mt-3 text-2xl font-light leading-snug text-slate-900 md:text-4xl">
                  <span className="block">{title} </span>
                  <span className="block">
                    <span className="font-extrabold text-sky-600">{highlight}</span>{" "}
                    <span className="font-light text-justify">{titleTail}</span>
                  </span>
                </h2>
              </div>

              <div className="mt-6 space-y-5">
                {content.map((p, idx) => (
                  <p
                    key={idx}
                    className="fi-anim fi-text text-sm leading-7 text-slate-600 md:text-[15px]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Parallax>

          {/* RIGHT: image card */}
          <Parallax speed={2}>
            <div className="fi-anim fi-img mx-auto w-full max-w-[380px] md:max-w-[460px]">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0B3A9A] to-[#041B53] shadow-[0_22px_70px_rgba(2,6,23,0.25)]">
                {/* subtle sheen */}
                <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />

                {/* image */}
                <Image
                  src={finverushand}
                  alt="Finverus hand"
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
