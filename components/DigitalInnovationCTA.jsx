import Image from "next/image";
import Link from "next/link";
import team from "../public/images/cta-pill.png"; // ✅ imported image

export default function DigitalInnovationCTA() {
  return (
    <section className="bg-[#061427]">
      <div className="mx-auto max-w-[90rem] px-4">
        <div className="relative py-20 md:py-24">
          {/* Top-right small text + line */}
          <div className="absolute right-0 top-8 hidden md:flex items-center gap-6">
            <p className="text-sm text-white/70 text-right leading-6">
              From idea to execution,
              <br />
              ZData powers your digital growth.
            </p>
            <div className="h-px w-64 bg-white/25" />
          </div>

          {/* Center content */}
          <div className="flex flex-col items-center text-center">
            {/* pill image */}
            
            <div className="relative h-15 w-54 overflow-hidden rounded-full ring-1 ring-white/15">
                <Image
                src={team}            // ✅ use imported image
                alt="ZData team"
                className="h-auto w-full object-cover"
                priority
              />
            </div>

            <h3 className="mt-8 text-xl md:text-4xl font-light tracking-wide text-white">
              DIGITAL <span className="font-extrabold">INNOVATION</span>
            </h3>

            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">
              <h2 className="text-3xl md:text-5xl font-light text-white tracking-wide">
                FOR THE <span className="font-extrabold">FUTURE OF FINANCE.</span>
              </h2>

              <Link
                href="/services"
                className="inline-flex items-center gap-3 rounded-full bg-[#0ea5ff] px-6 py-3 text-white font-medium hover:bg-[#0b94e6] transition"
              >
                Services
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0ea5ff] font-bold">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
