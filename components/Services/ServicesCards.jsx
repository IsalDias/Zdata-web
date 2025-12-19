"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CodeIcon from "@mui/icons-material/Code";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import SecurityIcon from "@mui/icons-material/Security";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_ITEMS = [
  {
    id: "software",
    color: "#0EA5E9",
    Icon: CodeIcon,
    title: "Software Development",
    description:
      "At ZData Innovations, we bring vision, innovation, and expertise to life.",
    more:
      "More details: APIs, dashboards, mobile apps, integrations, security best practices...",
  },
  {
    id: "managed",
    color: "#F59E0B",
    Icon: CloudQueueIcon,
    title: "Managed Services",
    description:
      "We keep your systems stable with monitoring, incident response, maintenance, and continuous improvements.",
    more:
      "More details: uptime monitoring, alerts, SLAs, performance tuning, patching and backups...",
  },
  {
    id: "security",
    color: "#D4264F",
    Icon: SecurityIcon,
    title: "Security & Compliance",
    description:
      "Security-first delivery with best practices for fintech-grade products and platforms.",
    more:
      "More details: access control, secure architecture, audits, OWASP practices, compliance support...",
  },
  ,
  {
    id: "managed1",
    color: "#00A886",
    Icon: CloudQueueIcon,
    title: "Managed Services",
    description:
      "We keep your systems stable with monitoring, incident response, maintenance, and continuous improvements.",
    more:
      "More details: uptime monitoring, alerts, SLAs, performance tuning, patching and backups...",
  },
  {
    id: "security2",
    color: "#807DDF",
    Icon: SecurityIcon,
    title: "Security & Compliance",
    description:
      "Security-first delivery with best practices for fintech-grade products and platforms.",
    more:
      "More details: access control, secure architecture, audits, OWASP practices, compliance support...",
  },
];

export default function ServicesCards({ title = "Services", items }) {
  const data = useMemo(() => (items?.length ? items : DEFAULT_ITEMS), [items]);

  const [openId, setOpenId] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".svc-card");

      gsap.fromTo(
        ".svc-title",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reset play reset",
          },
        }
      );

      gsap.fromTo(
        cards,
        { opacity: 0, y: 26 },
        {
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
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-10 md:py-10">
      <div className="mx-auto max-w-6xl px-4">
        <Parallax speed={-6}>
          <h2 className="svc-title text-center text-xl md:text-2xl lg:text-3xl font-light text-slate-600 py-5">
            Our <span className="font-bold text-slate-800">{title}</span>
          </h2>
        </Parallax>

        <Parallax speed={2}>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {data.map((item) => {
              const isOpen = openId === item.id;
              const Icon = item.Icon;

              return (
                <div
                  key={item.id}
                  className="svc-card rounded-2xl bg-slate-50 p-6 md:p-7 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)]"
                >
                  <div className="flex items-start gap-4">
                    {/* ✅ FIXED CIRCLE */}
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: item.color }}
                    >
                      {/* ✅ NORMALIZED ICON SIZE */}
                      <Icon sx={{ fontSize: 18 }} className="text-white" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm md:text-[15px] font-semibold text-slate-800">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs md:text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "max-h-[260px] opacity-100 mt-4"
                        : "max-h-0 opacity-0 mt-0"
                    }`}
                  >
                    <p className="text-xs md:text-sm leading-6 text-slate-600">
                      {item.more}
                    </p>
                  </div>

                  {item.more && (
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs md:text-sm text-slate-700 hover:bg-slate-100 transition"
                    >
                      {isOpen ? "Show less" : "Read more"}
                      <span aria-hidden className="text-base leading-none">
                        {isOpen ? "↑" : "↓"}
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </Parallax>
      </div>
    </section>
  );
}
