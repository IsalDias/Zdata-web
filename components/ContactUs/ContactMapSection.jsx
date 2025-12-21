"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactMapSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const left = section.querySelector("[data-left]");
    const mapWrap = section.querySelector("[data-map-wrap]");
    const rows = section.querySelectorAll("[data-row]");

    const ctx = gsap.context(() => {
      // reveal left + map
      gsap.fromTo(
        [left, mapWrap],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      // stagger rows a bit
      gsap.fromTo(
        rows,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      // parallax: float map slightly
      gsap.to(mapWrap, {
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // ✅ Google Maps embed query (no API key needed)
  const mapSrc =
    "https://www.google.com/maps?q=ZData%20Innovations%20160%2F5%2FA%20Methsiri%20Mawatha%2C%20Malabe%2010640%2C%20Sri%20Lanka&output=embed";

  return (
    <section ref={sectionRef} className="w-full bg-[#f6f7f9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* LEFT INFO */}
          <div data-left className="space-y-8">
            <InfoRow
              title="Phone"
              value="+94 112 986 526"
              href="tel:+94112986526"
            />
            <InfoRow
              title="E-mail"
              value="info@zdatai.com"
              href="mailto:info@zdatai.com"
            />
            <InfoRow
              title="Address"
              value="160/5/A, Methsiri Mawatha, Malabe, Sri Lanka"
            />
            {/* If you want the 2nd email row like screenshot */}
            <InfoRow
              title="E-mail"
              value="info@zdatai.com"
              href="mailto:info@zdatai.com"
            />
          </div>

          {/* RIGHT MAP */}
          <div data-map-wrap className="w-full">
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <div className="aspect-[16/9] w-full">
                <iframe
                  title="ZData Innovations Location"
                  src={mapSrc}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-4 text-xs text-black/50">
              Tip: You can zoom and drag the map.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ title, value, href }) {
  return (
    <div data-row className="border-b border-black/10 pb-6">
      <div className="text-sm text-black/45">{title}</div>

      {href ? (
        <a
          href={href}
          className="mt-2 inline-block text-base sm:text-[15px] text-black/70 hover:text-black"
        >
          {value}
        </a>
      ) : (
        <div className="mt-2 text-base sm:text-[15px] text-black/70">
          {value}
        </div>
      )}
    </div>
  );
}
