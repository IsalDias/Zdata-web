"use client";

import { useEffect, useMemo, useRef } from "react";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InsightsIcon from "@mui/icons-material/Insights";
import ShieldIcon from "@mui/icons-material/Shield";
import SpeedIcon from "@mui/icons-material/Speed";

gsap.registerPlugin(ScrollTrigger);



const DEFAULT_ITEMS = [
  {
    id: "ui",
    Icon: AutoAwesomeIcon,
    heading: "Intelligent, Modern Interface",
    description:
      "A clean, intuitive UI designed for speed and simplicity. Finverus gives your teams a streamlined, real-time view of customer data, workflows, and operations.",
  },
  {
    id: "insights",
    Icon: InsightsIcon,
    heading: "Real-Time Insights",
    description:
      "Make faster decisions with live dashboards, actionable metrics, and visibility across channels, users, and processes—right when it matters.",
  },
  {
    id: "security",
    Icon: ShieldIcon,
    heading: "Bank-Grade Security",
    description:
      "Security-first architecture with strong access controls, audit readiness, and best practices aligned with modern fintech compliance requirements.",
  },
  {
    id: "performance",
    Icon: SpeedIcon,
    heading: "Performance & Reliability",
    description:
      "Built for operational excellence with resilient services, optimized workflows, and a platform that scales smoothly as your institution grows.",
  },
];

export default function FinverusFeatures({ items }) {
  const data = useMemo(() => (items?.length ? items : DEFAULT_ITEMS), [items]);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // initial state
      gsap.set(".ff-anim", { opacity: 0, y: 18 });
      gsap.set(".ff-card", { opacity: 0, y: 22, scale: 0.985 });

      // header
      gsap.to(".ff-head", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reset play reset",
        },
      });

      // cards
      gsap.to(".ff-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          end: "bottom 20%",
          toggleActions: "play reset play reset",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#032646] via-[#08325a] to-[#062542] py-16 md:py-20"
    >
      {/* ✅ Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft glow */}
        <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-sky-300/10 blur-[70px]" />
        <div className="absolute -right-52 top-[-140px] h-[620px] w-[620px] rounded-full bg-sky-300/10 blur-[70px]" />
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(circle at 50% 25%, black 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 25%, black 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 ">
        {/* Header */}
        <Parallax speed={-6}>
          <div className="ff-anim ff-head text-center py-3">
            <h2 className="text-xl font-light text-white/90 md:text-3xl">
              Built to Empower{" "}
              <span className="font-extrabold text-white">
                Modern Financial Institutions
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-xs leading-6 text-white/70 md:text-sm md:leading-7">
              Finverus is engineered to elevate everyday banking operations and
              deliver exceptional digital experiences.
            </p>
          </div>
        </Parallax>

        {/* Cards */}
        <Parallax speed={2}>
          <div className="mt-10 space-y-5 md:mt-12 py-4">
            {data.map((item) => {
              const Icon = item.Icon;
              return (
                <div
                  key={item.id}
                  className="ff-card group rounded-2xl border border-white/15 bg-white/5 p-5] backdrop-blur-md transition hover:border-white/25 hover:bg-white/7 md:p-6"
                >
                  <div className="flex items-start gap-4 md:gap-5">
                    {/* Icon tile */}
                    <div className="relative shrink-0">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-b from-sky-400/30 to-blue-500/10 )] ring-1 ring-white/10 transition group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {Icon ? (
                          <Icon sx={{ fontSize: 20 }} className="text-white/90" />
                        ) : null}
                      </div>
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white md:text-[15px]">
                        {item.heading}
                      </h3>
                      <p className="mt-2 text-xs leading-6 text-white/70 md:text-sm">
                        {item.description}
                      </p>

                      {/* subtle underline accent */}
                      {/* <div className="mt-4 h-px w-full bg-gradient-to-r from-sky-400/40 via-white/10 to-transparent" /> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Parallax>
      </div>
    </section>
  );
}
