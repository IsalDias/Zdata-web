"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CodeIcon from "@mui/icons-material/Code";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_ITEMS = [
  {
    id: "software",
    color: "#0EA5E9",
    Icon: CodeIcon,
    title: "Software Development",
    description:
      "Secure, scalable fintech software built to turn your ideas into powerful products.",
    more:
      "At ZData Innovations, we bring vision, innovation, and expertise to life through our specialized software development services, tailored specifically for the fintech sector. With deep industry knowledge and a passion for delivering excellence, we design and build cutting-edge software solutions that align with your business needs and exceed your expectations.",
  },
  {
    id: "consulting",
    color: "#F59E0B",
    Icon: SupportAgentIcon,
    title: "IT Consultancy Services",
    description:
      "Strategic fintech IT guidance to align technology with your business goals.",
    more:
      "We provide tailored IT consultancy services to empower businesses with innovative and scalable technology solutions.",
  },
  {
    id: "managed",
    color: "#10B981",
    Icon: CloudQueueIcon,
    title: "Managed Services",
    description:
      "Reliable managed IT support so you can scale faster while we run your systems.",
    more:
      "Operating as an extension of your in-house IT team, we adopt proven processes and cutting-edge technologies.",
  },
  {
    id: "qa",
    color: "#EF4444",
    Icon: FactCheckIcon,
    title: "Software Quality Assurance & Testing",
    description:
      "End-to-end QA and testing to ensure your software is production-ready.",
    more:
      "Our expert QA team ensures your applications meet the highest standards of quality, security, and performance.",
  },
  {
    id: "data",
    color: "#807DDF",
    Icon: QueryStatsIcon,
    title: "Data Analysis & Insights",
    description:
      "Compliance-aligned fintech analytics that turn data into insights.",
    more:
      "We help businesses unlock the full potential of their data and make smarter decisions.",
  },
  {
    id: "ux",
    color: "#EC4899",
    Icon: DesignServicesIcon,
    title: "User Experience (UX) Design",
    description:
      "User-centered UX design for intuitive digital products.",
    more:
      "We craft engaging user experiences that drive customer satisfaction and business success.",
  },
];

export default function ServicesCards({ title = "Services", items }) {
  const data = useMemo(() => (items?.length ? items : DEFAULT_ITEMS), [items]);
  const [openId, setOpenId] = useState(null);
  const sectionRef = useRef(null);

  // Split into two real columns
  const leftCol = data.filter((_, i) => i % 2 === 0);
  const rightCol = data.filter((_, i) => i % 2 === 1);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
          },
        }
      );

      gsap.fromTo(
        ".svc-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-4">
        <Parallax speed={-4}>
          <h2 className="svc-title text-center text-xl md:text-2xl lg:text-3xl font-light text-slate-600">
            Our <span className="font-bold text-slate-800">{title}</span>
          </h2>
        </Parallax>

        <Parallax speed={2}>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-6">
              {leftCol.map((item) => (
                <ServiceCard
                  key={item.id}
                  item={item}
                  openId={openId}
                  setOpenId={setOpenId}
                />
              ))}
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-6">
              {rightCol.map((item) => (
                <ServiceCard
                  key={item.id}
                  item={item}
                  openId={openId}
                  setOpenId={setOpenId}
                />
              ))}
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* CARD COMPONENT */
/* -------------------------------------------------- */
function ServiceCard({ item, openId, setOpenId }) {
  const isOpen = openId === item.id;
  const Icon = item.Icon;

  return (
    <div className="svc-card self-start h-fit rounded-2xl bg-slate-50 p-6 md:p-7 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
      <div className="flex items-start gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: item.color }}
        >
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
        className={`overflow-hidden transition-all duration-300 text-justify ${
          isOpen ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
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
}
