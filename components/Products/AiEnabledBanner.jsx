"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AIImage from "@/public/images/AIImage.png";

gsap.registerPlugin(ScrollTrigger);

export default function AiEnabledBanner() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const card = root.querySelector("[data-card]");
    const imgLayer = root.querySelector("[data-bgimg]");
    const glow = root.querySelector("[data-glow]");
    const gradLayer = root.querySelector("[data-grad-layer]");
    const pill = root.querySelector("[data-pill]");
    const pillGrad = root.querySelector("[data-pill-grad]");

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Reveal
      gsap.fromTo(
        card,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 80%" },
        }
      );

      // Parallax (image)
      if (imgLayer) {
        gsap.to(imgLayer, {
          y: -14,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ✅ NO WIPE: Remove background-position animation entirely.
      // Instead, do a smooth color shift only.
      if (gradLayer && !prefersReduced) {
        gsap.fromTo(
          gradLayer,
          { filter: "hue-rotate(0deg) saturate(1.05) brightness(1)" },
          {
            filter: "hue-rotate(20deg) saturate(1.2) brightness(1.06)",
            duration: 4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }
        );
      }

      // ✅ Interactive glow follows cursor (desktop only)
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          if (!card || !glow) return;

          const qx = gsap.quickTo(card, "rotationY", {
            duration: 0.35,
            ease: "power3.out",
          });
          const qy = gsap.quickTo(card, "rotationX", {
            duration: 0.35,
            ease: "power3.out",
          });

          const gx = gsap.quickTo(glow, "left", {
            duration: 0.25,
            ease: "power3.out",
          });
          const gy = gsap.quickTo(glow, "top", {
            duration: 0.25,
            ease: "power3.out",
          });
          const go = gsap.quickTo(glow, "opacity", {
            duration: 0.25,
            ease: "power3.out",
          });

          const onMove = (e) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;

            qx((px - 0.5) * 6);
            qy(-(py - 0.5) * 6);

            gx(`${px * 100}%`);
            gy(`${py * 100}%`);
            go(0.9);
          };

          const onLeave = () => {
            qx(0);
            qy(0);
            go(0);
          };

          card.addEventListener("mousemove", onMove);
          card.addEventListener("mouseleave", onLeave);

          return () => {
            card.removeEventListener("mousemove", onMove);
            card.removeEventListener("mouseleave", onLeave);
          };
        },
      });

      // ✅ Button stroke gradient movement (real stroke)
      // We animate the gradient rotation inside the SVG.
      if (pillGrad && !prefersReduced) {
        gsap.to(pillGrad, {
          attr: { gradientTransform: "rotate(360)" },
          duration: 2.8,
          ease: "none",
          repeat: -1,
        });
      }

      // pill pop
      if (pill) {
        gsap.fromTo(
          pill,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 80%" },
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-10">
        <div
          data-card
          className="relative overflow-hidden rounded-[28px]
                     min-h-[220px] sm:min-h-[260px] lg:min-h-[280px]
                     flex items-center justify-center
                     [transform-style:preserve-3d]"
        >
          {/* ✅ Banner Gradient (no wipe) */}
          <div
            data-grad-layer
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(900px 450px at 30% 25%, rgba(45,120,255,0.55), transparent 55%), radial-gradient(850px 480px at 85% 70%, rgba(0, 10, 40, 0.95), transparent 60%), linear-gradient(180deg, #00051B 0%, #0A2B7A 55%, #00051B 100%)",
              opacity: 0.98,
              willChange: "filter",
            }}
          />

          {/* Interactive glow */}
          <div
            data-glow
            className="pointer-events-none absolute h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              opacity: 0,
              background:
                "radial-gradient(circle, rgba(122,169,239,0.48) 0%, rgba(122,169,239,0.12) 35%, transparent 70%)",
              filter: "blur(2px)",
              willChange: "left, top, opacity",
            }}
          />

          {/* AI background image */}
          <div data-bgimg className="absolute inset-0 opacity-[0.22]">
            <Image
              src={AIImage}
              alt="AI background"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
          </div>

          {/* dots overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-5 sm:px-10">
            {/* ✅ Pill with REAL animated stroke */}
            <div data-pill className="inline-flex items-center justify-center relative">
              {/* SVG stroke sits behind pill */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 420 64"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  {/* animated gradient for stroke */}
                  <linearGradient
                    id="strokeGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                    data-pill-grad
                  >
                    <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="45%" stopColor="rgba(255,255,255,0.95)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>

                <rect
                  x="2"
                  y="2"
                  width="416"
                  height="60"
                  rx="30"
                  ry="30"
                  fill="none"
                  stroke="url(#strokeGrad)"
                  strokeWidth="2.2"
                  opacity="0.95"
                />
              </svg>

              {/* pill content */}
              <div className="relative rounded-full bg-[#1E5BFF]/95 text-white px-6 sm:px-7 py-3 sm:py-3.5">
                <span className="font-extrabold">AI-Enabled</span>{" "}
                <span className="font-light opacity-95">Fintech Platform</span>
              </div>
            </div>

            <p className="mt-6 text-white/85 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              FinVerus integrates artificial intelligence to enhance operational efficiency,
              improve credit accuracy, and strengthen compliance across every financial workflow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
