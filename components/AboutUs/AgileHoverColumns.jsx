"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { title: "Agile Work", subtitle: "Process", desc: "It is a long established fact that a reader will be distracted by the readable content of " },
  { title: "Agile Work", subtitle: "Process", desc: "Readable content..." },
  { title: "Agile Work", subtitle: "Process", desc: "Readable content..." },
  { title: "Agile Work", subtitle: "Process", desc: "Readable content..." },
];

export default function AgileHoverColumns() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    // If you don't see this log, component is not mounted
    console.log("AgileHoverColumns mounted ✅");

    const root = rootRef.current;
    if (!root) return;

    // Parallax background only (doesn't affect visibility)
    const bg = root.querySelector("[data-bg]");
    const ctx = gsap.context(() => {
      if (bg) {
        gsap.to(bg, {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden items-center py-10 bg-[#061427]"
      style={{
        minHeight: 420, // force height so you can't miss it
        // border: "2px solid red", // debug border
      }}
    >
      {/* BG */}
      <div
        data-bg
        className="absolute inset-0"
        style={{
        //   background:
        //     "linear-gradient(180deg, #0A162B 0%, #071a2e 55%, #06172b 100%)",
        }}
      />
      <div
        aria-hidden="true"
        // className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* CONTENT (forced on top) */}
      <div
        className="relative z-[999] mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-10"
        // style={{ border: "2px solid lime" }} // debug border
      >
        {/* <h2 className="text-white text-xl font-semibold mb-6">
          DEBUG: You should see 4 cards below
        </h2> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden">
          {ITEMS.map((item, idx) => {
            const isActive = idx === active;

            return (
              <div
                key={idx}
                onMouseEnter={() => setActive(idx)}
                onClick={() => setActive(idx)}
                className="relative min-h-[260px] border border-white/25 px-6 py-8 text-white"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div className="text-lg font-semibold">{item.title}</div>
                <div className="text-white/80">{item.subtitle}</div>

                {isActive && (
                  <p className="mt-8 text-sm text-white/70 max-w-[26ch]">
                    {item.desc}
                  </p>
                )}

                {isActive && (
                  <div className="absolute left-6 bottom-7 h-10 w-10 rounded-full bg-[#00A3FF] grid place-items-center">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
