"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 👉 import image directly
import companyZdata from "@/public/images/featurebg.png";

gsap.registerPlugin(ScrollTrigger);

export default function AboutZData() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const imgWrap = section.querySelector("[data-img-wrap]");
    const lines = section.querySelectorAll("[data-reveal]");

    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to(imgWrap, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text reveal animation
      gsap.fromTo(
        lines,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
      aria-label="About ZData"
    >
      {/* subtle grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LEFT IMAGE */}
          <div className="lg:sticky lg:top-24">
            <div
              data-img-wrap
              className="relative w-full overflow-hidden bg-black/10
                         rounded-tl-[56px] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl
                         h-[320px] sm:h-[420px] lg:h-[520px]"
            >
              <Image
                src={companyZdata}
                alt="ZData Innovations"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="pt-1 sm:pt-2 lg:pt-10">
            <div className="max-w-2xl text-[15px] sm:text-base leading-relaxed text-black/70 space-y-8">
              <p data-reveal>
                ZData Innovations Pvt Ltd, founded in 2023, is a dynamic software
                development and consultancy firm specializing in innovative and
                cost-effective technology solutions. Based in Malabe, Sri Lanka,
                we help businesses accelerate growth, enhance efficiency, and
                drive digital transformation.
              </p>

              <p data-reveal>
                Our expertise spans custom software development, managed IT
                services, consultancy, and team augmentation, tailored to meet
                the evolving needs of diverse industries. We take a client-centric
                approach, delivering scalable solutions that align with strategic
                goals and create long-term value.
              </p>

              <p data-reveal>
                At ZData Innovations, we are committed to excellence, innovation,
                and collaboration. Our team of seasoned professionals blends
                technical expertise with creativity to build robust, future-ready
                solutions. As technology reshapes industries, we stay ahead of
                the curve, empowering businesses with cutting-edge tools to
                thrive in the digital era.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
