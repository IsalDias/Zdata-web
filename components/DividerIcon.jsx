"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import finverusIcon from "../public/images/finverusIcon.png";


gsap.registerPlugin(ScrollTrigger);

export default function DividerIcon() {
    const wrapRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // initial states
            gsap.set(".div-line-l", { scaleX: 0, transformOrigin: "100% 50%" }); // grow from center to left
            gsap.set(".div-line-r", { scaleX: 0, transformOrigin: "0% 50%" });   // grow from center to right
            gsap.set(".div-icon", { y: 18, opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapRef.current,
                    start: "top 85%",
                    end: "bottom 20%",
                    toggleActions: "play reset play", // replay when scroll up/down again
                },
            });

            tl.to(".div-icon", {
                y: 0,
                opacity: 1,
                duration: 0.45,
                ease: "power2.out",
            }).to(
                [".div-line-l", ".div-line-r"],
                {
                    scaleX: 1,
                    duration: 0.45,
                    ease: "power3.out",
                    stagger: 0.05,
                },
                "-=0.1"
            );
        }, wrapRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={wrapRef} className="bg-white  md:py-1">
            <div className="mx-auto max-w-5.5xl px-4">
               <div className="flex items-center justify-center gap-4">
  {/* left line */}
  <div
    className="div-line-l h-px w-full max-w-[520px]"
    style={{
      background: "linear-gradient(to left, #398CDC 0%, #FFFFFF 100%)",
    }}
  />

  {/* icon */}
  <div className="div-icon relative flex items-center justify-center
                h-28 w-28
                sm:h-24 sm:w-24
                md:h-24 md:w-24
                rounded-md">
  <Image
    src={finverusIcon}
    alt="Icon"
    className="object-contain
               w-16 h-16
               sm:w-14 sm:h-14
               md:w-14 md:h-14"
  />
</div>


  {/* right line */}
  <div
    className="div-line-r h-px w-full max-w-[520px]"
    style={{
      background: "linear-gradient(to right, #398CDC 0%, #FFFFFF 100%)",
    }}
  />
</div> 

            </div>
        </section>
    );
}
