"use client";

import Image from "next/image";
import latest1 from "../public/images/latest1.png";
import latest3 from "../public/images/latest3.png";
import team from "../public/images/latest2.png";



const DEFAULT_ITEMS = [
  {
    id: "1",
    title: "Real-Time Analytics",
    description: "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s",
    image: latest1,
  },
  {
    id: "2",
    title: "Credit Scoring Insights",
    description: "Short description about the feature / update goes here.",
    image:latest3,
  },
  {
    id: "3",
    title: "Coming Soon",
    description: "New content will be available shortly.",
    image: team,
  },
];

function LatestCard({ item }) {
  return (
    <div
      className="
        group relative overflow-hidden rounded-lg sm:rounded-2xl
        h-[250px] w-[280px] sm:h-[200px] sm:w-[340px] md:h-[310px] md:w-[380px]
        bg-slate-200 flex-shrink-0
      "
    >
      {/* Image */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="
          object-cover
          transition-transform duration-500 ease-out
          md:group-hover:scale-[1.06]
        "
      />

      {/* Overlay
          - Desktop: show on hover only
          - Mobile: always show (md:hidden = visible, md:opacity-0 md:group-hover:opacity-100)
      */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t from-black/80 via-black/25 to-transparent
          opacity-100 md:opacity-0 md:group-hover:opacity-100
          transition-opacity duration-300
        "
      />

      {/* Text
          - Desktop: appear on hover
          - Mobile: always visible
      */}
      <div
        className="
          absolute bottom-0 left-0 right-0 p-3 sm:p-4
          translate-y-0 md:translate-y-3 md:group-hover:translate-y-0
          opacity-100 md:opacity-0 md:group-hover:opacity-100
          transition-all duration-300
        "
      >
        <h3 className="text-white text-xs sm:text-sm md:text-base font-semibold">
          {item.title}
        </h3>
        <p className="mt-1 text-white/80 text-[10px] sm:text-xs md:text-xs leading-4 sm:leading-5">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function LatestFromFinverus({
  title = "The Latest from Finverus",
  items = DEFAULT_ITEMS,
}) {
  const data = items?.length ? items : DEFAULT_ITEMS;

  return (
    <section className="bg-white py-1 lg:py-17">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
         <h2 className="text-2xl sm:text-3xl font-light tracking-wide text-slate-700 flex items-center justify-center">
  Latest From&nbsp;
  <span className="font-extrabold">Finverus</span>
</h2>


        {/* Desktop row */}
        <div className="mt-6 sm:mt-8 md:mt-10 hidden md:flex items-center justify-center gap-6 md:gap-8 lg:gap-10 py-5">
          {data.map((item) => (
            <LatestCard key={item.id} item={item} />
          ))}
        </div>

        {/* Mobile swipe */}
        <div className="mt-6 sm:mt-8 md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 w-max pb-4">
            {data.map((item) => (
              <LatestCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
