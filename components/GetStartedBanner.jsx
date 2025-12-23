"use client";

import Image from "next/image";
import { useState } from "react";

// ✅ add your 3 sample cards
import samplecard1 from "../public/images/samplecard1.png";
import samplecard2 from "../public/images/samplecard2.png";
import samplecard3 from "../public/images/samplecard3.png";

export default function GetStartedBanner() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-white py-8 sm:py-10 md:py-12 lg:py-14 relative overflow-hidden">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[2rem] px-4 sm:px-8 py-8 sm:py-10 md:px-14 lg:px-20 md:py-14">
          <div className="absolute inset-0 animated-gradient" />
          <div className="absolute inset-0 bg-[#061427]/15" />

          <div className="relative grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 md:grid-cols-12 md:items-center">
            {/* LEFT */}
            <div className="md:col-span-6 text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                Get Started
              </h2>

              <p className="mt-3 sm:mt-4 max-w-md text-xs sm:text-sm md:text-[15px] leading-5 sm:leading-6 text-white/80">
                Discover how Finverus powers digital banking with secure
                onboarding, intelligent loan origination, and seamless approvals.
                <br />
                <br />
                Enter your email to receive the brochure instantly.
              </p>

              {/* Email input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
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
                  className="w-44 sm:w-52 md:w-64 px-3 py-2 text-xs sm:text-sm text-slate-800 outline-none"
                />
                <button
                  type="submit"
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold bg-slate-200 text-slate-800 hover:bg-slate-300 transition"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* RIGHT: 3 floating cards (responsive) */}
            <div className="md:col-span-6 relative min-h-[260px] sm:min-h-[300px] md:min-h-[380px]">
              {/* Card 1 (top right) */}
              <div className="absolute right-100 top-0 z-1 w-[40px] sm:w-[100px] md:w-[260px]">
                <Image
                  src={samplecard1} // LOS
                  alt="Loan Origination System"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Card 2 (middle left) */}
              <div className="absolute right-2 sm:right-28 md:right-80 sm:top-28 md:top-62 z-20 w-[200px] sm:w-[240px] md:w-[280px]">
                <Image
                  src={samplecard2} // Sync
                  alt="Core Banking Sync"
                  className="w-full h-auto object-contain drop-shadow-xl"
                />
              </div>

              {/* Card 3 (bottom right) */}
              <div className="absolute right-0 sm:right-4 md:right-20 bottom-20 z-30 w-[180px] sm:w-[220px] md:w-[260px]">
                <Image
                  src={samplecard3} // Screening
                  alt="Customer Screening"
                  className="w-full h-auto object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* gradient shine */}
          <div className="pointer-events-none absolute -left-16 sm:-left-20 top-1/2 h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
        </div>
      </div>

      <style jsx>{`
        .animated-gradient {
          background: linear-gradient(
            105deg,
            #05213c 0%,
            #3a6ca6 45%,
            #0066cc 100%
          );
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
