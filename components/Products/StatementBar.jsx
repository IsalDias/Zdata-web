"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function StatementBar({
  text = "Legacy systems slow you down. Finverus pushes you ahead.",
}) {
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!wrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".sb-line", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".sb-text", { opacity: 0, y: 10, filter: "blur(6px)" });
      gsap.set(".sb-shimmer", { xPercent: -120, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      tl.to(wrapRef.current, { opacity: 1, duration: 0.2 })
        .to(".sb-line", { scaleX: 1, duration: 0.6, ease: "power3.out" }, 0)
        .to(
          ".sb-text",
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
          0.15
        )
        .to(
          ".sb-shimmer",
          { xPercent: 120, opacity: 0.35, duration: 1.2, ease: "power2.out" },
          0.2
        );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full bg-[#083B66] py-4 opacity-0 overflow-hidden">
      {/* subtle top/bottom line */}
      <div className="sb-line absolute left-0 top-0 h-px w-full bg-white/20" />
      <div className="sb-line absolute left-0 bottom-0 h-px w-full bg-white/15" />

      {/* shimmer sweep */}
      <div className="sb-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-[1px]" />

      <p className="sb-text relative text-center text-sm font-light text-white/90 md:text-base">
        {text.split("Finverus").length > 1 ? (
          <>
            {text.split("Finverus")[0]}
            <span className="font-semibold text-white">Finverus</span>
            {text.split("Finverus")[1]}
          </>
        ) : (
          text
        )}
      </p>
    </div>
  );
}
