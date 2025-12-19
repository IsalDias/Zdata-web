"use client";

import { useEffect, useMemo, useRef } from "react";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Usage:
 * <OurApproach
 *   title="Our Approach"
 *   subtitle="How we deliver outcomes"
 *   items={[
 *     { heading: "Customized Strategy Development", content: "..." },
 *     { heading: "Operational Efficiency Optimization", content: "..." },
 *     { heading: "Market Analysis and Insights", content: "..." },
 *     { heading: "Leadership and Team Building", content: "..." },
 *   ]}
 * />
 */

const DEFAULT_ITEMS = [
  {
    heading: "Customized Strategy Development",
    content:
      "We align product and engineering priorities to your business goals, and define a delivery roadmap that fits your timeline and budget.",
  },
  {
    heading: "Operational Efficiency Optimization",
    content:
      "We improve reliability, performance, and developer velocity with pragmatic process + tooling upgrades and measurable KPIs.",
  },
  {
    heading: "Market Analysis and Insights",
    content:
      "We validate assumptions with data, competitive research, and user feedback—so we build what matters most.",
  },
  {
    heading: "Leadership and Team Building",
    content:
      "We support execution with strong leadership, clear ownership, and a healthy engineering culture that scales.",
  },
];

export default function OurApproach({
  title = "Our Approach",
  subtitle = "How we work from strategy to delivery",
  items,
}) {
  const data = useMemo(() => (items?.length ? items : DEFAULT_ITEMS), [items]);

  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".oa-anim", { opacity: 0, y: 16 });

      // Title entrance
      gsap.to(".oa-title", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reset play reset",
        },
      });

      // Card entrance
      gsap.to(".oa-card", {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play reset play reset",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-gradient-to-b from-slate-950 to-slate-900 py-12 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <Parallax speed={-1}>
          <div className="oa-anim oa-title text-center">
            <h2 className="text-xl font-light text-white md:text-2xl lg:text-3xl ">
              Our{" "}
              <span className="font-extrabold text-white ">
                {title.replace(/^Our\s+/i, "")}
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white md:text-base py-2">
              {subtitle}
            </p>
          </div>
        </Parallax>

        {/* Card */}
        <Parallax speed={2}>
          <div className="mt-15 overflow-hidden rounded-2xl]">
            {/* subtle shine */}
            <div className="pointer-events-none absolute inset-0 opacity-30" />

            <div className="grid md:grid-cols-1">
              {data.map((item, idx) => (
                <div
                  key={`${item.heading}-${idx}`}
                  className={[
                    "oa-anim oa-card p-6 md:p-7",
                    "border-slate-800/70",
                    idx % 2 === 0 ? "md:border-r" : "",
                    idx < data.length - 2 ? "border-b" : "md:border-b-0 border-b",
                  ].join(" ")}
                >
                  <div className="flex gap-4">
                    {/* left accent dot */}
                    <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-sky-700 shadow-[0_0_0_6px_rgba(56,189,248,0.12)]" />

                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white md:text-[15px]">
                        {item.heading}
                      </h3>
                      <p className="mt-2 text-xs leading-6 text-white/70 md:text-sm">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
