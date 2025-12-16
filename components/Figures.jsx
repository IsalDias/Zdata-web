const FIGURES = [
  { value: "30K +", label: "Customer Base from island Wide" },
  { value: "30K +", label: "Customer Base from island Wide" },
  { value: "30K +", label: "Customer Base from island Wide" },
];

export default function Figures() {
  return (
    <section className="bg-[#3f4d67]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          {FIGURES.map((item, idx) => (
            <div
              key={idx}
              className={`py-10 text-center text-white ${
                idx !== FIGURES.length - 1 ? "md:border-r md:border-white/35 " : ""
              }`}
            >
              <div className="text-3xl font-extrabold tracking-wide">
                {item.value}
              </div>
              <div className="mt-2 text-xs text-white/80">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
