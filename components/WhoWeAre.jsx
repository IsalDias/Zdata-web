"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import team from "../public/images/team1.png";

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeAre() {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-12 sm:py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* LEFT CONTENT */}
          <div className="relative lg:col-span-6">
            <div className="absolute left-0 top-0 h-full w-[1px] bg-slate-300 hidden lg:block" />

            <div className="lg:pl-8">
              <h2 className="text-2xl sm:text-3xl font-light tracking-wide text-slate-800">
                Who <span className="font-extrabold"> We Are ?</span>
              </h2>

              <p className="mt-4 sm:mt-6 max-w-sd text-xs sm:text-sm leading-6 sm:leading-7 text-slate-600 text-justify "> ZData Innovations Pvt Ltd, founded in 2023, is a dynamic software development and consultancy firm specializing in innovative and cost-effective technology solutions. Based in Malabe, Sri Lanka, we help businesses accelerate growth, enhance efficiency, and drive digital transformation. </p> <p className="mt-4 sm:mt-6 max-w-sd text-xs sm:text-sm leading-6 sm:leading-7 text-slate-600 text-justify "> Our expertise spans custom software development, managed IT services, consultancy, and team augmentation, tailored to meet the evolving needs of diverse industries. We take a client-centric approach, delivering scalable solutions that align with strategic goals and create long-term value. </p> <p className="mt-4 sm:mt-6 max-w-sd text-xs sm:text-sm leading-6 sm:leading-7 text-slate-600 text-justify "> At ZData Innovations, we are committed to excellence, innovation, and collaboration. Our team of seasoned professionals blends technical expertise with creativity to build robust, future-ready solutions. </p>

              <Link
                href="/aboutus"
                className="mt-6 sm:mt-8 inline-flex items-center gap-2 rounded-full border border-slate-400 px-4 sm:px-6 py-2 text-xs sm:text-sm text-slate-700 hover:bg-slate-100 transition"
              >
                Explore More <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE (Parallax + GSAP) */}
          <div className="lg:col-span-6">
            <Parallax speed={-6}>
              <div
                ref={imageRef}
                className="overflow-hidden rounded-md shadow-sm will-change-transform"
              >
                <Image
                  src={team}
                  alt="ZData team"
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            </Parallax>
          </div>

        </div>
      </div>
    </section>
  );
}
