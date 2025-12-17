"use client";

import Image from "next/image";
import team from "../public/images/people-behind-build.png";

export default function PeopleBehindBuild({
  title = "People Behind the Build",
  description = `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
}) {
  return (
    <section className="bg-[#F4F5F7] py-16 md:py-3">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          {/* LEFT IMAGE */}
          <div className="md:col-span-7">
            <div className="relative w-full overflow-hidden rounded-2xl">
              {/* ✅ control height here */}
              <div className="relative h-[320px] sm:h-[420px] md:h-[520px]">
                <Image
                  src={team}
                  alt={title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="md:col-span-5">
            <h3 className="text-lg md:text-xl font-medium text-slate-700">
              {title.split("Build")[0]}
              <span className="font-extrabold text-slate-800">Build</span>
            </h3>

            <p className="mt-4 text-sm md:text-[15px] leading-7 text-slate-500">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
