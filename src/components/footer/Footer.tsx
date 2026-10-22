
import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function MainFooter() {
  return (
    <footer className="w-full border-t border-[#252830] bg-[#101114]">
      <div className="mx-auto flex min-h-[76px] max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-white"
          aria-label="FitLog home"
        >
          <Dumbbell
            size={20}
            strokeWidth={2.5}
            className="text-[#c6ff00]"
          />
          <span className="text-sm font-black uppercase tracking-wide">
            FitLog
          </span>
        </Link>

        <p className="text-center text-xs leading-5 text-[#9298a6]">
          © 2026 FitLog. Workout Library — Train hard, log honestly.
        </p>
      </div>
    </footer>
  );
}
