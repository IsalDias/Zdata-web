"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FIGURES = [
  { value: 30000, suffix: "K +", label: "Customer Base from island Wide" },
  { value: 30000, suffix: "K +", label: "Customer Base from island Wide" },
  { value: 30000, suffix: "K +", label: "Customer Base from island Wide" },
];

export default function Figures() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray(".figure-value");

      counters.forEach((el) => {
        const target = Number(el.dataset.value);

        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target / 1000, // convert to K
            duration: 1.6,
            ease: "power3.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none none",
            },
            onUpdate: function () {
              el.innerText = `${Math.floor(el.innerText)}K +`;
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#3f4d67] ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-3">
          {FIGURES.map((item, idx) => (
            <div
              key={idx}
              className={[
                "px-2 py-6 sm:px-4 sm:py-10 text-center text-white",
                idx !== FIGURES.length - 1 ? "border-r border-white/35" : "",
              ].join(" ")}
            >
              <div
                className="figure-value whitespace-nowrap text-lg sm:text-3xl font-extrabold tracking-wide"
                data-value={item.value}
              >
                0K +
              </div>

              <div className="mt-2 text-[10px] leading-4 sm:text-sm text-white/80">
                {item.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
