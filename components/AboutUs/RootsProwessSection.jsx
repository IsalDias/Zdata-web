"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Parallax } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import team2 from "@/public/images/team2.png";

gsap.registerPlugin(ScrollTrigger);


export default function RootsProwessSection({
    kicker = "SCANDINAVIAN ROOTS",
    title = "SRI LANKAN TECH PROWESS",
    paragraphs = [
        "ZData Innovations Pvt Ltd, founded in 2023, is a dynamic software development and consultancy firm specializing in innovative and cost-effective technology solutions. Based in Malabe, Sri Lanka, we help businesses accelerate growth, enhance efficiency, and drive digital transformation.",
        "Our expertise spans custom software development, managed IT services, consultancy, and team augmentation, tailored to meet the evolving needs of diverse industries. We take a client-centric approach, delivering scalable solutions that align with strategic goals and create long-term value.",
        "At ZData Innovations, we are committed to excellence, innovation, and collaboration. Our team of seasoned professionals blends technical expertise with creativity to build robust, future-ready solutions. As technology reshapes industries, we stay ahead of the curve, empowering businesses with cutting-edge tools to thrive in the digital era.",
    ],
}) {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set(".rp-anim", { opacity: 0, y: 18 });
            gsap.set(".rp-img", { opacity: 0, y: 14, scale: 0.99 });

            gsap
                .timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play reset play reset",
                    },
                })
                .to(".rp-img", {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.08,
                })
                .to(
                    ".rp-anim",
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power3.out",
                        stagger: 0.08,
                    },
                    "-=0.55"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full overflow-hidden bg-white py-14 md:py-20">
            {/* ===== Right-side grid with center fade ===== */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute inset-0 opacity-[0.22]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, rgba(15,23,42,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.14) 1px, transparent 1px)",
                        backgroundSize: "44px 44px",
                        // show grid mostly on right; fade to 0 in the center
                        // maskImage:
                        //   "radial-gradient(circle at 55% 45%, transparent 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,1) 100%)",
                        // WebkitMaskImage:
                        //   "radial-gradient(circle at 55% 45%, transparent 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,1) 100%)",
                    }}
                />
                {/* extra right wash to feel like screenshot */}
                <div className="absolute inset-y-0 right-0 w-[55%] bg-gradient-to-l from-slate-100/100 via-white/100 to-transparent" />
            </div>

            <div className="relative mx-auto max-w-6xl px-6">
                <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
                    {/* LEFT: image collage */}
                    <div className="relative">
                        {/* big rounded left image */}
                        <Parallax speed={-6}>
                            <div className="rp-img relative h-[360px] w-full overflow-hidden rounded-[64px] md:h-[520px]">
                                <Image
                                    src={team2}
                                    alt="Team"
                                    fill
                                    priority
                                    className="object-contain  object-center"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </Parallax>


                    </div>

                    {/* RIGHT: text */}
                    <div className="md:pt-2">
                        <Parallax speed={2}>
                            <p className="rp-anim text-sm font-medium tracking-wide text-slate-500">
                                {kicker}
                            </p>
                        </Parallax>

                        <Parallax speed={3}>
                            <h2 className="rp-anim mt-2 text-2xl font-extrabold leading-tight text-slate-800 md:text-3xl">
                                {title}
                            </h2>
                        </Parallax>

                        <div className="mt-8 space-y-6">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="rp-anim text-sm leading-7 text-slate-600 md:text-[15px]"
                                >
                                    {p}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
