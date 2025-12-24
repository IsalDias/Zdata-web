"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ✅ Import your image here (change path to your real file)
import loanImg from "@/public/images/featurebg.png";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const modules = [
    {
      badge: "New",
      heading: "Loan Origination System",
      content:
        "Our Loan Origination System is designed to streamline and automate the entire loan lifecycle—from application intake to approval and disbursement. Built with scalability and security in mind, it enables financial institutions to reduce processing time, improve decision accuracy, and enhance customer experience. The system supports configurable workflows, real-time validation, compliance management, and seamless integration with third-party services.",
      image: loanImg,
    },
    {
      badge: "New 2",
      heading: "Credit Evaluation & Risk Management",
      content:
        "This module empowers organizations with intelligent credit assessment and risk analysis capabilities. By leveraging data-driven insights and customizable scoring models, it helps institutions make informed lending decisions while minimizing exposure to risk. The solution ensures regulatory compliance, supports multi-source data aggregation, and provides detailed reporting for ongoing risk monitoring.",
      image: loanImg,
    },
  ];

  return (
    <main className="bg-white">
      <ProductModules title="Product Modules" modules={modules} />
    </main>
  );
}

function ProductModules({ title = "Product Modules", modules = [] }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll("[data-module]");
    const sectionTitle = root.querySelector("[data-section-title]");

    const ctx = gsap.context(() => {
      // Section heading reveal
      if (sectionTitle) {
        gsap.fromTo(
          sectionTitle,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 80%" },
          }
        );
      }

      // Each module reveal + parallax on image
      items.forEach((item) => {
        const img = item.querySelector("[data-img]");
        const text = item.querySelector("[data-text]");

        gsap.fromTo(
          [img, text],
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: { trigger: item, start: "top 85%" },
          }
        );

        if (img) {
          gsap.to(img, {
            y: -18,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, root);

    return () => ctx.revert();
  }, [modules]);

  return (
    <section ref={rootRef} className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-19 sm:py-14">
        {/* Section Heading */}
        <div className="mb-8">
          <h2 data-section-title className="text-2xl sm:text-3xl font-semibold">
            <span className="text-black/80">Product </span>
            <span className="text-black">Modules</span>
          </h2>
          <div className="mt-4 h-px bg-black/10" />
        </div>

        {/* Modules */}
        <div className="space-y-12 sm:space-y-16">
          {modules.map((m, i) => (
            <div key={i} data-module>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-12 items-start">
                {/* Image */}
                <div
                  data-img
                  className="relative h-[220px] sm:h-[320px] lg:h-[340px]
                             rounded-2xl bg-black/5 overflow-hidden"
                >
                  <Image
                    src={m.image}
                    alt={m.heading}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div data-text>
                  {m.badge ? (
                    <div className="text-sm font-medium text-[#0B66FF]">
                      {m.badge}
                    </div>
                  ) : null}

                  <h3 className="mt-2 text-lg sm:text-xl font-semibold text-black">
                    {m.heading}
                  </h3>

                  <p className="mt-4 text-sm sm:text-base text-black/60 leading-relaxed max-w-2xl">
                    {m.content}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="mt-12 h-px bg-black/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
