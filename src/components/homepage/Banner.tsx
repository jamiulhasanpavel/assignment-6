import Image from "next/image";
import bannerImage from "@/assets/banner.png";

const ArrowUpRightIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

const Banner = () => {
  return (
    <section className="relative flex min-h-[448px] w-full items-center overflow-hidden rounded-2xl border border-[#292d37] bg-[#15161b] px-6 py-12 sm:px-10 lg:px-14">
      <div className="relative z-10 max-w-2xl">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.12em] text-[#c6ff00]">
          Workout Library
        </p>

        <h1 className="max-w-xl text-4xl font-black uppercase leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Train with intent. Log every set.
        </h1>

        <p className="mt-5 max-w-lg text-base leading-6 text-[#a0a4b1] sm:text-lg">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
          today&apos;s plan, and watch the week&apos;s work add up.
        </p>

        <a
          href="#workouts"
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#c6ff00] px-6 py-3.5 text-xs font-bold uppercase text-black transition hover:bg-[#d8ff57]"
        >
          Browse Workouts
          <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      </div>

      <div className="pointer-events-none absolute right-2 top-1/2 hidden h-[90%] w-[43%] -translate-y-1/2 items-center justify-center sm:flex lg:right-8">
        <Image
          src={bannerImage}
          alt="Fitness banner illustration"
          className="h-full w-full object-contain"
          priority
        />
      </div>
    </section>
  );
};

export default Banner;