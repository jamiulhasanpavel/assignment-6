import Link from "next/link";

const DumbbellIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 9h3v6H4zm13 0h3v6h-3zM7 12h10" />
    <path d="M9 7V5m6 2V5M9 17v2m6-2v2" />
  </svg>
);

const Navbar = ({ planCount = 0, savedCount = 0 }: { planCount?: number; savedCount?: number }) => {
  return (
    <nav className="relative w-full border-b border-[#202124] bg-[#0b0c0e]">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <DumbbellIcon className="h-[27px] w-[27px] text-[#c6ff00]" />
          <span className="text-xl font-extrabold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-[#19220d] px-4 py-2 text-xs font-semibold text-[#c6ff00]"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full px-4 py-2 text-xs text-[#a1a1aa] transition hover:text-white"
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[#d4d4d8] transition hover:text-white"
          >
            <span>Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c6ff00] px-1 font-bold text-black">
              {planCount}
            </span>
          </Link>

          <Link
            href="/saved"
            className="flex items-center gap-2 text-[#a1a1aa] transition hover:text-white"
          >
            <span>Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#36383c] px-1 text-[#d4d4d8]">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;