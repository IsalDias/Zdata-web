"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Example MUI icons (you can pass any MUI icon component via items)
import InsightsIcon from "@mui/icons-material/Insights";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ShieldIcon from "@mui/icons-material/Shield";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

gsap.registerPlugin(ScrollTrigger);

/**
 * Usage:
 * <ExpertiseList
 *   title="Our Expertise"
 *   items={[
 *     { id: "bi", Icon: InsightsIcon, heading: "Business Intelligence & Reporting", description: "" },
 *     { id: "pa", Icon: QueryStatsIcon, heading: "Predictive Analytics", description: "" },
 *     { id: "cr", Icon: VerifiedUserIcon, heading: "Compliance Reporting", description: "Ensuring your data analysis..." },
 *     { id: "dis", Icon: ShieldIcon, heading: "Data Integrity & Security", description: "Adopting robust data governance..." },
 *   ]}
 * />
 */

const DEFAULT_ITEMS = [
  {
    id: "bi",
    Icon: InsightsIcon,
    heading: "Business Intelligence & Reporting",
    description: "Security-first delivery with best practices for fintech-grade products and platforms",
  },
  {
    id: "pa",
    Icon: QueryStatsIcon,
    heading: "Predictive Analytics",
    description: "Security-first delivery with best practices for fintech-grade products and platforms",
  },
  {
    id: "cr",
    Icon: VerifiedUserIcon,
    heading: "Compliance Reporting",
    description:
      "Ensuring your data analysis processes and reports meet the rigorous standards set by CBSL and other regulatory authorities.",
  },
  {
    id: "dis",
    Icon: ShieldIcon,
    heading: "Data Integrity & Security",
    description:
      "Adopting robust data governance frameworks to maintain data accuracy, consistency, and confidentiality.",
  },
  {
    id: "da",
    Icon: QueryStatsIcon,
    heading: "Data analysis",
    description:
      "Our data analysis solutions are designed to enhance operational efficiency, optimize customer experiences, and provide a competitive edge in the fintech sector.",
  },
];

export default function ExpertiseList({
  title = "Our Expertise",
  items,
  defaultOpenId = null,
}) {
  const data = useMemo(() => (items?.length ? items : DEFAULT_ITEMS), [items]);
  const [openId, setOpenId] = useState(defaultOpenId);

  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".ex-anim", { opacity: 0, y: 16 });

      gsap.to(".ex-title", {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reset play reset",
        },
      });

      gsap.to(".ex-row", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
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
    <section ref={sectionRef} className="relative w-full bg-white py-14 md:py-8">
      <div className="mx-auto max-w-4xl px-4">
        <Parallax speed={-2}>
          <h2 className="ex-anim ex-title text-center text-xl font-light text-slate-600 md:text-2xl lg:text-3xl">
            Our <span className="font-extrabold text-slate-900">{title.replace(/^Our\s+/i, "")}</span>
          </h2>
        </Parallax>

        <Parallax speed={2}>
          <div className="mt-10">
            {data.map((item, idx) => {
              const Icon = item.Icon;
              const isOpen = openId === item.id;
              const hasDesc = Boolean(item.description && item.description.trim().length);

              return (
                <div key={item.id} className="ex-anim ex-row">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="group w-full text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3 py-4">
                      {/* Icon */}
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white">
                        {Icon ? (
                          <Icon sx={{ fontSize: 18 }} className="text-slate-600 group-hover:text-slate-900" />
                        ) : null}
                      </div>

                      {/* Heading */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-sm font-semibold text-slate-800 md:text-[15px]">
                            {item.heading}
                          </h3>

                          {/* caret */}
                          <span
                            className={[
                              "ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition",
                              isOpen ? "rotate-180" : "rotate-0",
                            ].join(" ")}
                            aria-hidden
                          >
                            ↓
                          </span>
                        </div>

                        {/* Description (accordion) */}
                        <div
                          className={[
                            "overflow-hidden transition-all duration-300",
                            isOpen && hasDesc ? "max-h-[220px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0",
                          ].join(" ")}
                        >
                          <p className="text-xs leading-6 text-slate-600 md:text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Divider line */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />
                </div>
              );
            })}
          </div>
        </Parallax>
      </div>
    </section>
  );
}
