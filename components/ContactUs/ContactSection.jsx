"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const left = section.querySelector("[data-left]");
    const card = section.querySelector("[data-card]");
    const gradPanel = section.querySelector("[data-grad-panel]");
    const gradMobile = section.querySelector("[data-grad-mobile]");

    const ctx = gsap.context(() => {
      // reveal left + card
      gsap.fromTo(
        [left, card],
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      // parallax: float the form card slightly
      if (card) {
        gsap.to(card, {
          y: -16,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // parallax: move gradient panel slightly (subtle)
      if (gradPanel) {
        gsap.to(gradPanel, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // ✅ Smooth color transition (no wipe)
        gsap.fromTo(
          gradPanel,
          { filter: "hue-rotate(0deg) saturate(1) brightness(1)" },
          {
            filter: "hue-rotate(18deg) saturate(1.15) brightness(7.02)",
            duration: 2.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }
        );
      }

      // ✅ Mobile gradient also smoothly transitions
      if (gradMobile) {
        gsap.fromTo(
          gradMobile,
          { filter: "hue-rotate(0deg) saturate(1) brightness(1)" },
          {
            filter: "hue-rotate(18deg) saturate(1.15) brightness(7.02)",
            duration: 2.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    // ✅ ID needed for other component button scroll
    <section
      id="contact-section"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0b0f14]"
    >
      {/* Base background */}
      <div className="absolute inset-0 bg-[#0b0f14]" />

      {/* RIGHT gradient panel (desktop) */}
      <div
        data-grad-panel
        className="absolute inset-y-0 right-0 w-[52%] hidden lg:block"
        style={{
          backgroundImage: "linear-gradient(180deg, #121317 0%, #7AA9EF 100%)",
          opacity: 0.95,
          willChange: "transform, filter",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT CONTENT */}
          <div
            data-left
            className="relative z-10 rounded-[28px] p-8 sm:p-10 lg:p-12"
          >
            <h2 className="text-white text-3xl sm:text-4xl font-light tracking-wide">
              HOW CAN WE
            </h2>
            <h3 className="text-white text-3xl sm:text-4xl font-extrabold mt-2">
              HELP YOU <span className="font-light">?</span>
            </h3>

            <p className="mt-8 text-white/80 text-sm sm:text-base leading-relaxed max-w-md">
              Contact us for a consultation on your requirement & to see how we
              provide you with a tailor-made solution.
            </p>
          </div>

          {/* FORM CARD */}
          <div className="flex lg:justify-end">
            <div
              data-card
              className="w-full lg:w-[560px] rounded-[28px] bg-white
                         shadow-[0_25px_80px_rgba(0,0,0,0.35)]
                         p-7 sm:p-10"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-black/60">
                Send Us a Message
              </h3>
              <p className="mt-2 text-sm text-black/45">
                Fill in the form & we will get back to you!
              </p>

              <form
                className="mt-8 space-y-7"
                onSubmit={(e) => e.preventDefault()}
              >
                <Field label="Your Name" type="text" />
                <Field label="E-Mail Address" type="email" />
                <Field label="Phone Number" type="tel" />
                <Field label="Your Message" type="text" />

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center gap-4 rounded-full
                             bg-[#008CFF] text-white px-7 py-3 text-sm font-medium
                             shadow-[0_14px_35px_rgba(0,140,255,0.35)]"
                >
                  Send Now
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#008CFF]">
                    →
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* MOBILE gradient strip (animated too) */}
        <div className="lg:hidden mt-10 -mx-4 sm:-mx-6">
          <div
            data-grad-mobile
            className="h-28 w-full"
            style={{
              backgroundImage: "linear-gradient(180deg, #121317 0%, #7AA9EF 100%)",
              opacity: 0.95,
              willChange: "filter",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function Field({ label, type }) {
  return (
    <label className="block">
      <span className="text-sm text-black/45">{label}</span>
      <input
        type={type}
        className="mt-3 w-full border-b border-black/20 pb-2 outline-none
                   placeholder:text-black/30 focus:border-[#008CFF]"
      />
    </label>
  );
}
