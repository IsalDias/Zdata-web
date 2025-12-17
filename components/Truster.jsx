"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import company1 from "../public/images/company1.png";
import company2 from "../public/images/company2.png";

export default function TrustedCompanies({ items = [] }) {
  const data = useMemo(
    () =>
      items.length
        ? items
        : [
            {
              name: "SEYLAN",
              logo: company1,
              title: "TRUSTED BY LEADING COMPANIES",
              p1: "Our expertise spans custom software development, managed IT services, consultancy, and team augmentation, tailored to meet the evolving needs of diverse industries. We take a client-centric approach, delivering scalable solutions that align with strategic goals and create long-term value.",
              p2: "At ZData Innovations, we are committed to excellence, innovation, and collaboration. Our team of seasoned professionals blends technical expertise with creativity to build robust, future-ready solutions. As technology reshapes industries, we stay ahead of the curve, empowering businesses with cutting-edge tools to thrive in the digital era.",
            },
            {
              name: "SEYLAN",
              logo: company2,
              title: "Tasd LEADING COMPANIES",
              p1: "Our expertise spans custom software development, managed IT services, consultancy, and team augmentation, tailored to meet the evolving needs of diverse industries. We take a client-centric approach, delivering scalable solutions that align with strategic goals and create long-term value.",
              p2: "At ZData Innovations, we are committed to excellence, innovation, and collaboration. Our team of seasoned professionals blends technical expertise with creativity to build robust, future-ready solutions. As technology reshapes industries, we stay ahead of the curve, empowering businesses with cutting-edge tools to thrive in the digital era.",
            },
          ],
    [items]
  );

  const [index, setIndex] = useState(0);
  const current = data[index];

  const next = () => setIndex((i) => (i + 1) % data.length);
  const prev = () => setIndex((i) => (i - 1 + data.length) % data.length);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[100rem] px-4">
        <div className="relative rounded-3xl bg-[#f7f7f7] px-8 py-16 md:px-14 md:py-34">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
            {/* LEFT: Logo */}
            <div className="md:col-span-5 flex items-center justify-center">
              <div className="relative h-28 w-[320px] md:h-22 md:w-[500px]">
                <Image
                  src={current.logo}
                  alt={`${current.name} logo`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:col-span-1 md:flex md:justify-center">
              <div className="h-52 w-px bg-slate-300" />
            </div>

            {/* RIGHT: Text */}
            <div className="md:col-span-6">
              <h3 className="text-2xl md:text-3xl font-light text-slate-700 tracking-wide">
                {current.title.split("LEADING COMPANIES")[0]}
                <span className="font-extrabold text-slate-700">
                  LEADING COMPANIES
                </span>
              </h3>

              <p className="mt-6 text-sm md:text-[15px] leading-7 text-slate-600">
                {current.p1}
              </p>

              <p className="mt-6 text-sm md:text-[15px] leading-7 text-slate-600">
                {current.p2}
              </p>
            </div>
          </div>

          {/* Controls */}
          {data.length > 1 && (
            <>


              <button
                onClick={next}
                aria-label="Next company"
                className="absolute right-6 bottom-6 rounded-full border border-slate-300  px-4 py-3 text-slate-700 hover:bg-white"
              >
                →
              </button>

              {/* Dots */}
              <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-2">
                {data.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full ${
                      i === index ? "bg-slate-700" : "bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

