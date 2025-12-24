"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CodeIcon from "@mui/icons-material/Code";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SettingsSuggestIcon from "@mui/icons-material/Groups";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_ITEMS = [
  {
    id: "software-dev",
    label: "Software Development",
    icon: CodeIcon,
    title: "Software Development",
    p1: "At ZData Innovations, we bring vision, innovation, and expertise to life through our specialized software development services, tailored specifically for the fintech sector. With deep industry knowledge and a passion for delivering excellence, we design and build cutting-edge software solutions that align with your business needs and exceed your expectations. Whether you require a robust fintech product, an innovative mobile application, or a custom software platform, our team is equipped to turn your ideas into reality. We focus on creating secure, scalable, and user-centric solutions that empower your business to thrive in the rapidly evolving financial landscape.",
    p2: "Let us help you transform your vision into impactful software solutions that redefine what's possible in fintech.Whether you require a robust fintech product, an innovative mobile application, or a custom software platform, our team is equipped to turn your ideas into reality.",
  },
  {
    id: "it-consulting",
    label: "IT Consultancy Services",
    icon: SupportAgentIcon,
    title: "IT Consultancy Services",
    p1: "At ZData Innovations, we provide tailored IT consultancy services to empower businesses with innovative and scalable technology solutions. With years of expertise in the fintech sector, our consultancy services are designed to align technology with your business goalsWe help you plan and execute technology strategy with clear roadmaps, architecture guidance, and risk-aware decision making.",
    p2: "Ensuring operational efficiency, enhanced security, and competitive advantage.",
  },
  {
    id: "team-augmentation",
    label: "Managed Services",
    icon: SettingsSuggestIcon,
    title: "Managed Services",
    p1: "At ZData Innovations, we enable your business to grow and scale seamlessly while we take care of your IT systems. Operating as an extension of your in-house IT team, we adopt proven processes and cutting-edge technologies to suit your unique operational needs.Our subject matter experts bring deep expertise across a wide range of technologies, from IT operations to cloud computing. By outsourcing your IT services to us, you can focus entirely on your core business functions, confident that your IT infrastructure is in reliable hands. Whether it&#39;s database management, system administration, or cloud solutions, we ensure your operations are always optimized, secure, and aligned with industry best practices.",
    p2: "Let us manage the complexities of IT, so you can drive innovation and achieve your business goals effortlessly.",
  },
  {
    id: "managed-services1",
    label: "Software Quality Assurance and Testing Services",
    icon: FactCheckIcon,
    title: "Software Quality Assurance and Testing Services",
    p1: "At ZData Innovations, we deliver comprehensive Software Quality Assurance (SQA) and testing services to ensure your applications meet the highest standards of functionality, security, and user experience.",
    p2: "We focus on reliability, security, and performance so your team can focus on product growth.",
  },
  {
    id: "managed-services2",
    label: "Data Analysis",
    icon: QueryStatsIcon,
    title: "Data Analysis",
    p1: "At ZData Innovations, we specialize in delivering advanced Data Analysis Services tailored to the unique demands of the fintech industry and aligned with Central Bank of Sri Lanka (CBSL) compliance requirements.",
    p2: "With our expertise, we help businesses unlock the full potential of their data, turning raw information into actionable insights that drive smarter decisions and strategic growth.",
  },
  {
    id: "managed-services",
    label: "User Experience (UX) Design",
    icon: DesignServicesIcon,
    title: "User Experience (UX) Design",
    p1: "At ZData Innovations, we craft intuitive and engaging user experiences that drive customer satisfaction and business success.",
    p2: "our UX design services focus on creating seamless interactions that elevate the functionality and appeal of your digital products.",
  },
];

// helper: render icon whether it is a MUI component or a string
function RenderIcon({ icon, size = "small" }) {
  if (!icon) return null;

  if (typeof icon === "string") {
    return <span className="text-white">{icon}</span>;
  }

  const IconComp = icon;
  return <IconComp fontSize={size} className="text-white" />;
}

export default function WhatWeDo({ items = DEFAULT_ITEMS }) {
  const data = useMemo(() => (items?.length ? items : DEFAULT_ITEMS), [items]);
  const [activeId, setActiveId] = useState(data[0]?.id);
  const active = data.find((x) => x.id === activeId) || data[0];

  // ✅ mobile: expand/collapse description under each item
const [openMobileId, setOpenMobileId] = useState(null);


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

  const onSelect = (id) => {
    setActiveId(id);

    // ✅ on mobile show/hide description under clicked item
    setOpenMobileId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      className="relative text-white overflow-hidden py-12 sm:py-16 md:py-24 lg:py-1"
      style={{
        backgroundColor: "#031322",
        backgroundImage:
          "radial-gradient(ellipse at center, #1F315A 0%, #031322 70%)",
      }}
    >
      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 py-12 sm:py-16 md:py-18">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-14 md:grid-cols-12 md:items-stretch">
          {/* LEFT LIST */}
          <div className="wwd-fade md:col-span-5">
            <h2 className="text-2xl sm:text-3xl font-light tracking-wide text-white">
              What <span className="font-extrabold"> We Do ?</span>
            </h2>

            <div className="mt-6 sm:mt-8 border-t border-white/15 align-t">
              {data.map((item) => {
                const isActive = item.id === activeId;
                const isOpenMobile = openMobileId === item.id;

                return (
                  <div key={item.id} className="border-b border-white/15">
                    <button
                      type="button"
                      onMouseEnter={() => setActiveId(item.id)} // desktop hover
                      onFocus={() => setActiveId(item.id)} // keyboard
                      onClick={() => onSelect(item.id)} // mobile click expands
                      className={`group w-full text-left flex items-center gap-3 sm:gap-4 py-4 sm:py-6 transition
                        ${
                          isActive
                            ? "text-white"
                            : "text-white/80 hover:text-white"
                        }`}
                    >
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition flex-shrink-0
                        ${
                          isActive
                            ? "border-white/40 bg-white/10"
                            : "border-white/20 bg-white/5 group-hover:border-white/35"
                        }`}
                        aria-hidden
                      >
                        <RenderIcon icon={item.icon} size="small" />
                      </span>

                      <span className="text-sm sm:text-base md:text-lg font-medium">
                        {item.label}
                      </span>

                      <span
                        className={`ml-auto h-px w-8 sm:w-10 transition-opacity
                        ${
                          isActive
                            ? "bg-blue-400 opacity-100"
                            : "bg-white opacity-0 group-hover:opacity-100"
                        }`}
                        aria-hidden
                      />
                    </button>

                    {/* ✅ MOBILE DESCRIPTION (shows under clicked item) */}
                    <div
                      className={`md:hidden overflow-hidden transition-all duration-300 ${
                        isOpenMobile ? "max-h-[520px] pb-5" : "max-h-0"
                      }`}
                    >
                      <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                        <div className="flex items-center gap-3">
                          <span >
                            {/* <RenderIcon icon={item.icon} size="small" /> */}
                          </span>
                          <h3 className="text-base font-semibold">
                            {/* {item.title} */}
                          </h3>
                        </div>

                        <p className="mt-3 text-xs leading-6 text-white/80 text-justify">
                          {item.p1}
                        </p>
                        <p className="mt-3 text-xs leading-6 text-white/80 text-justify">
                          {item.p2}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANEL (DESKTOP ONLY) */}
          <div className="wwd-fade md:col-span-7 hidden md:flex items-center justify-center">
            <div
              ref={rightRef}
              className="
                rounded-2xl bg-white/5 border border-white/10 backdrop-blur
                p-8 sm:p-10
                w-full max-w-[640px]
                h-[520px]
                overflow-hidden
              "
            >
              <div className="wwd-right-anim inline-flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-white/5">
                <RenderIcon icon={active.icon} size="medium" />
              </div>

              <h3 className="wwd-right-anim mt-6 text-2xl sm:text-3xl font-semibold">
                {active.title}
              </h3>

              {/* ✅ fixed card height, but text scrolls if long */}
              <div className="mt-6 space-y-6 overflow-auto h-[320px] pr-2 text-white">
                <p className="wwd-right-anim text-xs sm:text-sm leading-7 text-white/80 text-justify">
                  {active.p1}
                </p>

                <p className="wwd-right-anim text-xs sm:text-sm leading-7 text-white/80 text-justify">
                  {active.p2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
