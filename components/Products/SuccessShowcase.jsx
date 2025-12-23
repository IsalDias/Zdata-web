"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import success1 from "@/public/images/success1.png";
import success2 from "@/public/images/success2.png";
import company1 from "@/public/images/company2.png";
import company4 from "@/public/images/company4.png";
import importZdata from "@/public/images/importZdata.png";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_ITEMS = [
  {
    id: "lcb",
    heroImage: success1,
    heading: "Empowering Digital Transformation with",
    highlight: "Finverus",
    description:
      "We’re proud to partner with LCB Finance, one of Sri Lanka’s most trusted and rapidly growing financial institutions.",
    logos: [
      { id: "lcb", src: company4, alt: "LCB Finance PLC" },
      { id: "zdata", src: importZdata, alt: "ZData Innovations" },
    ],
  },
  {
    id: "case2",
    heroImage: success2,
    heading: "Empowering Digital Transformation with ",
    highlight: "Finverus",
    description:
      "We’re proud to partner with Mahindra Ideal Finance, one of Sri Lanka’s most trusted and rapidly growing financial institutions.",
    logos: [
      { id: "mahindra", src: company1, alt: "Mahindra Ideal Finance" },
      { id: "zdata2", src: importZdata, alt: "ZData Innovations" },
    ],
  },
];

export default function SuccessShowcase({ items, defaultId }) {
  const data = useMemo(() => (items?.length ? items : DEFAULT_ITEMS), [items]);

  const initial = useMemo(() => {
    if (defaultId) return defaultId;
    return data[0]?.id ?? null;
  }, [defaultId, data]);

  const [activeId, setActiveId] = useState(initial);

  const sectionRef = useRef(null);
  const swapRef = useRef(null);

  // image wrapper ref + animation guard
  const imgWrapRef = useRef(null);
  const isAnimatingRef = useRef(false);

  // auto-play control
  const userPausedRef = useRef(false);

  const active = useMemo(
    () => data.find((x) => x.id === activeId) || data[0],
    [data, activeId]
  );

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".ss-anim", { opacity: 0, y: 18 });
      gsap.set(".ss-img", { opacity: 0, y: 18, scale: 0.99 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reset play reset",
          },
        })
        .to(".ss-img", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(
          ".ss-anim",
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.45"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Text swap animation (right side)
  useEffect(() => {
    if (!swapRef.current) return;

    const tl = gsap.timeline();
    tl.to(swapRef.current, {
      opacity: 0,
      y: 6,
      duration: 0.18,
      ease: "power2.out",
    }).to(swapRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.28,
      ease: "power2.out",
    });

    return () => tl.kill();
  }, [activeId]);

  // animate image transition then swap activeId
  const animateTo = (nextId) => {
    if (nextId === activeId) return;

    if (!imgWrapRef.current) {
      setActiveId(nextId);
      return;
    }

    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    gsap
      .timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      })
      .to(imgWrapRef.current, {
        opacity: 0,
        y: 10,
        scale: 0.99,
        duration: 0.22,
      })
      .add(() => setActiveId(nextId))
      .to(imgWrapRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
      });
  };

  const goPrev = () => {
    const idx = data.findIndex((x) => x.id === activeId);
    const nextIdx = (idx - 1 + data.length) % data.length;
    animateTo(data[nextIdx].id);
  };

  const goNext = () => {
    const idx = data.findIndex((x) => x.id === activeId);
    const nextIdx = (idx + 1) % data.length;
    animateTo(data[nextIdx].id);
  };

  // ✅ AUTO MOVE every 3 seconds
  useEffect(() => {
    if (data.length <= 1) return;

    const id = window.setInterval(() => {
      if (!userPausedRef.current) goNext();
    }, 3000);

    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length, activeId]);

  return (
    <section ref={sectionRef} className="w-full bg-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* LEFT: Image card */}
          <Parallax speed={-6}>
            <div
              ref={imgWrapRef}
              className="ss-img relative overflow-hidden rounded-3xl bg-slate-50 shadow-[0_22px_70px_rgba(15,23,42,0.12)]"
              onMouseEnter={() => (userPausedRef.current = true)}
              onMouseLeave={() => (userPausedRef.current = false)}
              onTouchStart={() => (userPausedRef.current = true)}
              onTouchEnd={() => (userPausedRef.current = false)}
            >
              <Image
                src={active.heroImage}
                alt={`${active.id} success`}
                priority
                className="h-auto w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/0 via-black/0 to-black/5" />
            </div>
          </Parallax>

          {/* RIGHT: Text */}
          <Parallax speed={3}>
            <div
              ref={swapRef}
              className="min-w-0"
              onMouseEnter={() => (userPausedRef.current = true)}
              onMouseLeave={() => (userPausedRef.current = false)}
              onTouchStart={() => (userPausedRef.current = true)}
              onTouchEnd={() => (userPausedRef.current = false)}
            >
              <h3 className="ss-anim text-lg font-medium text-slate-700 md:text-xl">
                {active.heading}{" "}
                <span className="font-extrabold text-slate-900">
                  {active.highlight}
                </span>
              </h3>

              <p className="ss-anim mt-5 text-sm leading-7 text-slate-600 md:text-[15px]">
                {active.description}
              </p>

              {/* ✅ Logos aligned */}
              <div className="ss-anim mt-6 inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
                {active.logos?.map((logo, i) => (
                  <div key={logo.id} className="flex items-center">
                    <div className="flex h-12 w-32 items-center justify-center">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={140}
                        height={48}
                        className="h-10 w-auto object-contain"
                        draggable={false}
                      />
                    </div>

                    {/* ✅ divider between logos */}
                    {i !== active.logos.length - 1 && (
                      <div className="mx-2 h-10 w-px bg-slate-200" />
                    )}
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="ss-anim mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    userPausedRef.current = true;
                    goPrev();
                    window.setTimeout(
                      () => (userPausedRef.current = false),
                      1200
                    );
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                  aria-label="Previous"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => {
                    userPausedRef.current = true;
                    goNext();
                    window.setTimeout(
                      () => (userPausedRef.current = false),
                      1200
                    );
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                  aria-label="Next"
                >
                  →
                </button>
              </div>
            </div>
          </Parallax>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {data.map((it) => (
            <button
              key={it.id}
              type="button"
              onClick={() => {
                userPausedRef.current = true;
                animateTo(it.id);
                window.setTimeout(() => (userPausedRef.current = false), 1200);
              }}
              className={[
                "h-2.5 w-2.5 rounded-full transition",
                it.id === activeId
                  ? "bg-slate-900"
                  : "bg-slate-300 hover:bg-slate-400",
              ].join(" ")}
              aria-label={`Show ${it.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
