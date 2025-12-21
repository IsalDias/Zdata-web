"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CodeIcon from "@mui/icons-material/Code";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
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
      "At ZData Innovations, we bring vision, innovation, and expertise to life through our specialized software development services, tailored specifically for the fintech sector. With deep industry knowledge and a passion for delivering excellence, we design and build cutting-edge software solutions that align with your business needs and exceed your expectations. Whether you require a robust fintech product, an innovative mobile application, or a custom software platform, our team is equipped to turn your ideas into reality. We focus on creating secure, scalable, and user-centric solutions that empower your business to thrive in the rapidly evolving financial landscape. Let us help you transform your vision into impactful software solutions that redefine what's possible in fintech.",
  },
  {
    id: "managed",
    color: "#F59E0B",
    Icon: SupportAgentIcon,
    title: "IT Consultancy Services",
    description:
      "Strategic fintech IT guidance to align technology with your business goals and security needs.",
    more:
      "At ZData Innovations, we provide tailored IT consultancy services to empower businesses with innovative and scalable technology solutions. With years of expertise in the fintech sector, our consultancy services are designed to align technology with your business goals, ensuring operational efficiency, enhanced security, and competitive advantage.",
  },
  ,
  {
    id: "managed1",
    color: "#10B981",
    Icon: CloudQueueIcon,
    title: "Managed Services",
    description:
      "Reliable managed IT support so you can scale faster while we run and optimize your systems.",
    more:
      "At ZData Innovations, we enable your business to grow and scale seamlessly while we take care of your IT systems. Operating as an extension of your in-house IT team, we adopt proven processes and cutting-edge technologies to suit your unique operational needs.Our subject matter experts bring deep expertise across a wide range of technologies, from IT operations to cloud computing. By outsourcing your IT services to us, you can focus entirely on your core business functions, confident that your IT infrastructure is in reliable hands. Whether it&#39;s database management, system administration, or cloud solutions, we ensure your operations are always optimized, secure, and aligned with industry best practices. Let us manage the complexities of IT, so you can drive innovation and achieve your business goals effortlessly.",
  },
  {
    id: "security2",
    color: "#EF4444",
    Icon: FactCheckIcon,
    title: "Software Quality Assurance and Testing Services",
    description:
      "End-to-end QA and testing to ensure your software is stable, secure, and production-ready.",
    more:
      "At ZData Innovations, we deliver comprehensive Software Quality Assurance (SQA) and testing services to ensure your applications meet the highest standards of functionality, security, and user experience. Our expert team leverages industry-leading methodologies and advanced tools to provide end-to-end quality assurance for your software, leaving no aspect unchecked.",
  },
  {
    id: "DataAnalysis",
    color: "#807DDF",
    Icon: QueryStatsIcon,
    title: "Data Analysis & Insights",
    description:
      "Compliance-aligned fintech analytics that turn data into clear insights for smarter decisions.",
    more:
      "At ZData Innovations, we specialize in delivering advanced Data Analysis Services tailored to the unique demands of the fintech industry and aligned with Central Bank of Sri Lanka (CBSL) compliance requirements. With our expertise, we help businesses unlock the full potential of their data, turning raw information into actionable insights that drive smarter decisions and strategic growth.At ZData Innovations, we deliver comprehensive Software Quality Assurance (SQA) and testing services to ensure yourapplications meet the highest standards of functionality, security, and user experience. Our expert team leverages industry-leading methodologies and advanced tools to provide end-to-end quality assurance for your software, leaving no aspect unchecked.",
  },
  {
    id: "UXDesign",
    color: "#EC4899",
    Icon: DesignServicesIcon,
    title: "User Experience (UX) Design",
    description:
      "User-centered UX design that makes your digital products intuitive, engaging, and effective.",
    more:
      "At ZData Innovations, we craft intuitive and engaging user experiences that drive customer satisfaction and business success. With a deep understanding of industry standards and user- centered design principles, our UX design services focus on creating seamless interactions that elevate the functionality and appeal of your digital products.",
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
                    className={`overflow-hidden transition-all duration-300 text-justify ${
                      isOpen
                        ? "max-h-[660px] opacity-100 mt-4"
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
