"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CodeIcon from "@mui/icons-material/Code";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import GroupsIcon from "@mui/icons-material/Groups";
import SecurityIcon from "@mui/icons-material/Security";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_ITEMS = [
  {
    id: "software-dev",
    label: "Software Development",
    icon: CodeIcon,
    title: "Software Development",
    p1: "At ZData Innovations, we bring vision, innovation, and expertise to life through our specialized software development services, tailored specifically for the fintech sector.",
    p2: "Whether you require a robust fintech product, an innovative mobile application, or a custom software platform, our team is equipped to turn your ideas into reality.",
  },
  {
    id: "it-consulting",
    label: "IT Consultancy Services",
    icon: SupportAgentIcon,
    title: "IT Consultancy Services",
    p1: "We help you plan and execute technology strategy with clear roadmaps, architecture guidance, and risk-aware decision making.",
    p2: "From audits to modernization, we align IT with business goals and drive measurable results.",
  },
  {
    id: "team-augmentation",
    label: "Team Augmentation",
    icon: GroupsIcon,
    title: "Team Augmentation",
    p1: "Scale delivery fast with experienced engineers, designers, and QA specialists who integrate seamlessly with your team.",
    p2: "Flexible engagement, predictable delivery, and strong ownership—without long hiring cycles.",
  },
  {
    id: "managed-services",
    label: "Managed Services",
    icon: SecurityIcon,
    title: "Managed Services",
    p1: "Keep systems stable with monitoring, incident response, maintenance, and continuous improvements.",
    p2: "We focus on reliability, security, and performance so your team can focus on product growth.",
  },
   {
    id: "managed-services",
    label: "Managed Services",
    icon: SecurityIcon,
    title: "Managed Services",
    p1: "Keep systems stable with monitoring, incident response, maintenance, and continuous improvements.",
    p2: "We focus on reliability, security, and performance so your team can focus on product growth.",
  },
   {
    id: "managed-services",
    label: "Managed Services",
    icon: SecurityIcon,
    title: "Managed Services",
    p1: "Keep systems stable with monitoring, incident response, maintenance, and continuous improvements.",
    p2: "We focus on reliability, security, and performance so your team can focus on product growth.",
  },
];

// helper: render icon whether it is a MUI component or a string
function RenderIcon({ icon, size = "small" }) {
  if (!icon) return null;

  // if icon is a string (emoji), render as text
  if (typeof icon === "string") {
    return <span className="text-white">{icon}</span>;
  }

  // if icon is a component (MUI), render as element
  const IconComp = icon;
  return <IconComp fontSize={size} className="text-white" />;
}

export default function WhatWeDo({ items = DEFAULT_ITEMS }) {
  const data = useMemo(() => (items?.length ? items : DEFAULT_ITEMS), [items]);
  const [activeId, setActiveId] = useState(data[0]?.id);
  const active = data.find((x) => x.id === activeId) || data[0];

  const sectionRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wwd-fade",
        { opacity: 0, y: 24 },
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

  useEffect(() => {
    if (!rightRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wwd-right-anim",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.06 }
      );
    }, rightRef);

    return () => ctx.revert();
  }, [activeId]);

  return (
    <section ref={sectionRef} className="relative bg-[#061427] text-white">
      <div className="relative mx-auto max-w-[90rem] px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start">
          {/* LEFT LIST */}
          <div className="wwd-fade md:col-span-5">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide">
              <span className="font-extrabold">WHAT</span> WE DO ?
            </h2>

            <div className="mt-8 border-t border-white/15 align-t">
              {data.map((item) => {
                const isActive = item.id === activeId;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setActiveId(item.id)}
                    onFocus={() => setActiveId(item.id)}
                    onClick={() => setActiveId(item.id)}
                    className={`group w-full text-left flex items-center gap-4 py-6 border-b border-white/15 transition
                      ${isActive ? "text-white" : "text-white/80 hover:text-white"}`}
                  >
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition
                      ${
                        isActive
                          ? "border-white/40 bg-white/10"
                          : "border-white/20 bg-white/5 group-hover:border-white/35"
                      }`}
                      aria-hidden
                    >
                      <RenderIcon icon={item.icon} size="small" />
                    </span>

                    <span className="text-base md:text-lg font-medium">
                      {item.label}
                    </span>

                    <span
                      className={`ml-auto h-px w-10 transition-opacity
                      ${
                        isActive
                          ? "bg-blue-400 opacity-100"
                          : "bg-white/30 opacity-0 group-hover:opacity-100"
                      }`}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-xs text-white/100 md:hidden">
              Tap a service to view details (details panel is hidden on mobile).
            </p>
          </div>

          {/* RIGHT PANEL (HIDDEN ON MOBILE) */}
         <div className="wwd-fade md:col-span-7 hidden md:flex items-center justify-center">

            <div
              ref={rightRef}
              className="rounded-2xl bg-white/5 border border-white/10 p-10 backdrop-blur"
            >
              <div className="wwd-right-anim inline-flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-white/5">
                <RenderIcon icon={active.icon} size="medium" />
              </div>

              <h3 className="wwd-right-anim mt-6 text-3xl font-semibold">
                {active.title}
              </h3>

              <p className="wwd-right-anim mt-6 text-sm leading-7 text-white/80 max-w-2xl">
                {active.p1}
              </p>

              <p className="wwd-right-anim mt-6 text-sm leading-7 text-white/80 max-w-2xl">
                {active.p2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
