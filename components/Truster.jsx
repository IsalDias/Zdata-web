"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import company1 from "../public/images/company1.png";
import company2 from "../public/images/company2.png";

gsap.registerPlugin(ScrollTrigger);

export default function Truster({ items = [] }) {
  const data = useMemo(
    () =>
      items.length
        ? items
        : [
            {
              name: "SEYLAN",
              logo: company1,
              title: "Trusted by ",
              p1: "For People’s Leasing (PLC), ZData Innovations provides reliable and secure Database Management Solutions designed to support high-performance financial operations.",
              p2: "Our solutions focus on database optimization, monitoring, security, and data integrity - ensuring smooth system performance, high availability, and compliance with industry best practices. By strengthening PLC’s data infrastructure, we help improve operational stability, scalability, and informed decision-making.",
            },
            {
              name: "PEOPLE’S LEASING",
              logo: company2,
              title: "Trusted by ",
              p1: "For Mahindra Ideal Finance, ZData Innovations delivers a robust Customer Onboarding Module and a comprehensive Loan Origination System (LOS) designed to meet regulatory and operational excellence.",
              p2: "Our solution streamlines the end-to-end loan lifecycle from customer onboarding and KYC validation to credit assessment and loan approval while ensuring full compliance with Central Bank of Sri Lanka (CBSL) guidelines.",
            },
          ],
    [items]
  );

  const [index, setIndex] = useState(0);
  const current = data[index];

  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const nextBtnRef = useRef(null);

  // Disable parallax on mobile to prevent overlap
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ✅ Auto-advance (pause while user is interacting)
  const userPausedRef = useRef(false);

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

  // Auto slide change every 4s (only if more than 1 item)
  useEffect(() => {
    if (data.length <= 1) return;

    const id = window.setInterval(() => {
      if (!userPausedRef.current) next();
    }, 4000);

    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length]);

  // Scroll-in animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tc-in",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none play none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Slide change animation
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

  return (
    <section ref={sectionRef} className="bg-white py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
        <div
          ref={cardRef}
          className="
            tc-in relative rounded-2xl sm:rounded-3xl bg-[#f7f7f7]
            px-5 sm:px-8 py-8 sm:py-14 md:px-14 md:py-16

            /* ✅ FIXED/CONSISTENT HEIGHT ON MOBILE */
            min-h-[520px] sm:min-h-0
          "
          // ✅ pause auto-advance while user hovers / touches
          onMouseEnter={() => (userPausedRef.current = true)}
          onMouseLeave={() => (userPausedRef.current = false)}
          onTouchStart={() => (userPausedRef.current = true)}
          onTouchEnd={() => (userPausedRef.current = false)}
        >
          <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-10 md:grid-cols-12 md:items-center">
            {/* LEFT: Logo */}
            <div className="md:col-span-5 flex items-center justify-center">
              <Parallax speed={isMobile ? 0 : -8}>
                <div className="tc-swap relative h-20 w-[240px] sm:h-28 sm:w-[320px] md:h-24 md:w-[520px]">
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

            {/* RIGHT: Text */}
            <div className="md:col-span-6">
              <Parallax speed={isMobile ? 0 : 6}>
                {/* ✅ fixed area on mobile so content changes don't change card height */}
                <div className="max-h-[260px] overflow-auto pr-1 sm:max-h-none sm:overflow-visible">
                  <h3 className="tc-swap text-xl sm:text-3xl font-light tracking-wide text-slate-800">
                    {current.title}
                    <span className="font-extrabold text-slate-700">
                      Leading Companies
                    </span>
                  </h3>

                  <p className="tc-swap mt-4 sm:mt-6 text-xs sm:text-sm md:text-[15px] leading-6 sm:leading-7 text-slate-600 text-justify">
                    {current.p1}
                  </p>

                  <p className="tc-swap mt-4 sm:mt-6 text-xs sm:text-sm md:text-[15px] leading-6 sm:leading-7 text-slate-600 text-justify">
                    {current.p2}
                  </p>
                </div>
              </Parallax>
            </div>
          </div>

          {/* Controls */}
          {data.length > 1 && (
            <button
              ref={nextBtnRef}
              onClick={() => {
                userPausedRef.current = true; // pause briefly on manual click
                next();
                window.setTimeout(() => (userPausedRef.current = false), 1500);
              }}
              aria-label="Next company"
              className="
                absolute right-4 sm:right-6 bottom-1 sm:bottom-1
                grid place-items-center
                text-slate-700
              "
              // ✅ FORCE perfect circle (fixes oval on mobile)
              style={{
                width: isMobile ? 44 : 52,
                height: isMobile ? 44 : 52,
                lineHeight: 1,
              }}
            >
              →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
