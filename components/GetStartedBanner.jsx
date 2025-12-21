"use client";

import Image from "next/image";
import { useState } from "react";

// ✅ Replace these with your real images later (put in /public/images/...)
const DEFAULT_INTEGRATIONS = [
  // "/images/integrations/int1.png",
  // "/images/integrations/int2.png",
];

export default function GetStartedBanner({ integrations = DEFAULT_INTEGRATIONS }) {
  const [email, setEmail] = useState("");

  return (
<section className="bg-white py-8 sm:py-10 md:py-12 lg:py-14 relative overflow-hidden">
  <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[2rem] px-4 sm:px-8 py-8 sm:py-10 md:px-14 lg:px-20 md:py-14">
      <div className="absolute inset-0 animated-gradient" />

          {/* soft overlay for readability */}
          <div className="absolute inset-0 bg-[#061427]/15" />

          <div className="relative grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 md:grid-cols-12 md:items-center">
            {/* LEFT */}
            <div className="md:col-span-6 text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">Get Started</h2>

              <p className="mt-3 sm:mt-4 max-w-md text-xs sm:text-sm md:text-[15px] leading-5 sm:leading-6 text-white/80">
                our pathway to digital excellence in the modern banking era. Rapidly
                accelerate digital transformation and seamlessly integrate
              </p>

              {/* Email input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // ✅ later integrate submit action
                  console.log("Email:", email);
                }}
                className="mt-4 sm:mt-6 inline-flex overflow-hidden rounded-md bg-white"
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Enter Your email"
                  className="w-40 sm:w-48 md:w-60 px-3 py-2 text-xs sm:text-sm text-slate-800 outline-none"
                />
                <button
                  type="submit"
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold bg-slate-200 text-slate-800 hover:bg-slate-300 transition"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* RIGHT */}
            <div className="md:col-span-6 relative min-h-[140px] sm:min-h-[160px] md:min-h-[220px]">
              {/* top rectangle */}
              <div className="absolute right-12 sm:right-20 md:right-24 top-0 h-20 w-40 sm:h-24 sm:w-44 md:h-28 md:w-52 rounded-lg sm:rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur">
                <div className="p-2 sm:p-3 grid grid-cols-3 gap-1 sm:gap-2">
                  {integrations.slice(0, 6).map((src, idx) => (
                    <div key={idx} className="relative h-6 w-6 sm:h-8 sm:w-8 rounded-md bg-white/10 overflow-hidden">
                      <Image src={src} alt="" fill className="object-contain p-1" />
                    </div>
                  ))}
                </div>
              </div>

              {/* bottom rectangle */}
              <div className="absolute right-0 top-12 sm:top-14 md:top-16 h-24 w-52 sm:h-28 sm:w-56 md:h-32 md:w-64 rounded-lg sm:rounded-2xl bg-[#ffeceb] ring-1 ring-black/5 shadow-sm">
                <div className="p-3 sm:p-4 grid grid-cols-4 gap-2 sm:gap-3">
                  {integrations.slice(0, 8).map((src, idx) => (
                    <div key={idx} className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-md bg-white overflow-hidden ring-1 ring-black/5">
                      <Image src={src} alt="" fill className="object-contain p-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* gradient shine */}
          <div className="pointer-events-none absolute -left-16 sm:-left-20 top-1/2 h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
        </div>
      </div>

      {/* ✅ CSS for animated gradient */}
      <style jsx>{`
        .animated-gradient {
          background: linear-gradient(105deg, #05213c 0%, #3a6ca6 45%, #0066cc 100%);
          background-size: 200% 200%;
          animation: gradientMove 5s ease-in-out infinite;
        }

        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}
