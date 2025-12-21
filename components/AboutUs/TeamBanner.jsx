"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import teamBg from "@/public/images/teambg.png";

gsap.registerPlugin(ScrollTrigger);

export default function TeamBanner({
  image = teamBg,
  title = "Pioneering the Future of Finance with Cutting-Edge Technology",
  subtitle = "At Finverus, our team of visionary leaders and skilled professionals is dedicated to transforming the financial landscape through innovative digital solutions. Together, we are shaping the future of finance.",
  heightClass = "h-[420px] md:h-[560px] lg:h-[640px]",
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".tb-bg", { opacity: 0, scale: 1.05 });
      gsap.set(".tb-overlay", { opacity: 0 });
      gsap.set(".tb-text", { opacity: 0, y: 14, filter: "blur(6px)" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })
        .to(".tb-bg", { opacity: 1, scale: 1, duration: 1.0, ease: "power3.out" })
        .to(".tb-overlay", { opacity: 1, duration: 0.7, ease: "power2.out" }, 0)
        .to(".tb-text", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }, 0.25);

      // ✅ Parallax (safe now because image is taller)
      gsap.to(".tb-img", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden ${heightClass} bg-black`}
    >
      {/* Background */}
      <div className="tb-bg absolute inset-0">
        {/* ✅ Make the moving image layer taller than the section */}
        <div className="tb-img absolute -inset-x-0 -inset-y-12">
          <Image
            src={image}
            alt="Team banner"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Overlay */}
      <div className="tb-overlay pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.70)_92%)]" />
        <div className="absolute inset-y-0 left-0 w-24 md:w-56 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-56 bg-gradient-to-l from-black/60 to-transparent" />
      </div>

      {/* Text */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
        <div className="tb-text max-w-2xl">
          <h2 className="text-2xl font-semibold leading-tight text-white md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/80 md:text-base md:leading-7">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
