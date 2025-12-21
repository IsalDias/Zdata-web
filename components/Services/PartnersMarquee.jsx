"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";

import company1 from "@/public/images/company1.png";
import company2 from "@/public/images/company2.png";
import company3 from "@/public/images/company3.png";
import company4 from "@/public/images/company4.png";
import company5 from "@/public/images/company5.png";
import company6 from "@/public/images/company6.png";
import company7 from "@/public/images/company7.png";
import company8 from "@/public/images/company8.png";

export default function PartnersMarquee({

    speed = 80, // px/sec (bigger = faster)
    direction = "left", // "left" | "right"
    heightClass = "h-442 md:h-24", // taller bar
    logoHeight = 34, // bigger logos
}) {
    const trackRef = useRef(null);
    const rafRef = useRef(null);
    const lastTsRef = useRef(0);

    // drag
    const isDownRef = useRef(false);
    const startXRef = useRef(0);
    const startScrollRef = useRef(0);

    const dir = direction === "right" ? -1 : 1;

    const base = useMemo(
        () => [
            { alt: "HDFC Bank", src: company1 },
            { alt: "Mahindra Ideal Finance", src: company2 },
            { alt: "Seylan Bank", src: company3 },
            { alt: "Seylan Bank", src: company4 },
            { alt: "Seylan Bank", src: company5 },
            { alt: "Seylan Bank", src: company6 },
            { alt: "Seylan Bank", src: company7 },
            { alt: "Seylan Bank", src: company8 },
        ],
        []
    );

    // ✅ Hard-repeat to guarantee overflow even with 3 logos
    const items = useMemo(() => {
        const repeats = 18; // increase if you have very wide screens
        const out = [];
        for (let i = 0; i < repeats; i++) out.push(...base);
        return out;
    }, [base]);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;

        // ✅ start somewhere not at 0
        el.scrollLeft = el.scrollWidth / 4;

        const tick = (ts) => {
            if (!lastTsRef.current) lastTsRef.current = ts;
            const dt = (ts - lastTsRef.current) / 1000;
            lastTsRef.current = ts;

            if (!isDownRef.current) {
                // move
                el.scrollLeft += dir * speed * dt;

                // wrap
                const half = el.scrollWidth / 2;
                if (half > 0) {
                    if (el.scrollLeft >= half) el.scrollLeft -= half;
                    if (el.scrollLeft < 0) el.scrollLeft += half;
                }
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            lastTsRef.current = 0;
        };
    }, [speed, dir, items.length]);

    // Drag handlers
    const onPointerDown = (e) => {
        const el = trackRef.current;
        if (!el) return;

        isDownRef.current = true;
        el.classList.add("cursor-grabbing");
        el.classList.remove("cursor-grab");

        startXRef.current = "touches" in e ? e.touches[0].pageX : e.pageX;
        startScrollRef.current = el.scrollLeft;
    };

    const onPointerMove = (e) => {
        const el = trackRef.current;
        if (!el || !isDownRef.current) return;

        const x = "touches" in e ? e.touches[0].pageX : e.pageX;
        const walk = (startXRef.current - x) * 1.3;
        el.scrollLeft = startScrollRef.current + walk;
    };

    const endDrag = () => {
        const el = trackRef.current;
        if (!el) return;

        isDownRef.current = false;
        el.classList.remove("cursor-grabbing");
        el.classList.add("cursor-grab");
    };

    return (
        <section className="w-full bg-white py-17">
            <div className="mx-auto max-w-8xl px-6">
                <h2 className="text-center text-lg md:text-sm lg:text-2xl">
                    <span className="font-regular">Our </span>
                    <span className="font-bold">Valued Partners</span>
                </h2>




                <div className="mt-6 rounded-xl  bg-white " >
                    <div
                        ref={trackRef}
                        className={[
                            "relative w-full overflow-x-auto overflow-y-hidden",
                            "scrollbar-hide",
                            "cursor-grab select-none",
                            heightClass,
                        ].join(" ")}
                        onMouseDown={onPointerDown}
                        onMouseMove={onPointerMove}
                        onMouseLeave={endDrag}
                        onMouseUp={endDrag}
                        onTouchStart={onPointerDown}
                        onTouchMove={onPointerMove}
                        onTouchEnd={endDrag}
                    >
                        {/* fade edges */}
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-white to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-white to-transparent" />

                        {/* ✅ Two copies makes wrap seamless */}
                        <div className="flex w-max items-center gap-20 px-12 py-6" >
                            {[...items, ...items].map((logo, idx) => (
                                <LogoItem
                                    key={`${logo.alt}-${idx}`}
                                    src={logo.src}
                                    alt={logo.alt}
                                    logoHeight={logoHeight}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
            </div>
        </section>
    );
}

function LogoItem({ src, alt, logoHeight }) {
    // ✅ Guarantee width so the row becomes scrollable
    const ratio = src.width / src.height;
    const w = Math.round(ratio * logoHeight);

    return (
        <div className="min-w-max opacity-85 grayscale transition hover:opacity-100 hover:grayscale-0">
            <Image
                src={src}
                alt={alt}
                width={w}
                height={logoHeight}
                draggable={false}
                className="h-auto w-auto"
            />
        </div>
    );
}
