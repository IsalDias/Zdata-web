"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Backgroundproudct from "@/public/images/Backgroundproudct.png";
import Backgroundproductmobile2 from "@/public/images/Backgroundproudct.png";

gsap.registerPlugin(ScrollTrigger);

export default function ProductHero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".ph-anim", { opacity: 0, y: 14 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        })
        .to(".ph-img", { opacity: 1, duration: 0.7, ease: "power2.out" })
        .to(".ph-overlay", { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.45");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-black">
      {/* ✅ DESKTOP IMAGE (keeps original height) */}
      <div className="relative hidden w-full md:block ph-img opacity-0">
        <Image
          src={Backgroundproudct}
          alt="Product hero background"
          priority
          className="w-full h-auto object-cover"
        />
        {/* optional overlay */}
        <div className="ph-overlay pointer-events-none absolute inset-0 bg-black/10 opacity-0" />
      </div>

      {/* ✅ MOBILE IMAGE (keeps original height) */}
      <div className="relative block w-full md:hidden ph-img opacity-0">
        <Image
          src={Backgroundproductmobile2}
          alt="Product hero mobile background"
          priority
          className="w-full h-auto"
        />
        <div className="ph-overlay pointer-events-none absolute inset-0 bg-black/10 opacity-0" />
      </div>
    </section>
  );
}
