import Image from "next/image";
import Link from "next/link";
import backgroundImage from "@/assets/Background.png";
import { workouts } from "@/data/workouts";

export function WorkoutLibraryCard() {
  return (
    <section id="workouts" className="min-h-screen bg-black px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-6">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">
            The Library
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <Link
              key={workout.id}
              href={`/workouts/${workout.id}`}
              aria-label={`View details for ${workout.title}`}
              className="group block overflow-hidden rounded-xl border border-[#292d37] bg-[#15161b] transition duration-300 hover:-translate-y-1 hover:border-[#c6ff00]/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6ff00]"
            >
              <div className="relative aspect-[2.15/1] overflow-hidden bg-[#202127]">
                <Image
                  src={backgroundImage}
                  alt={workout.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  {workout.muscles.map((muscle) => (
                    <span
                      key={`${workout.id}-${muscle}`}
                      className="rounded-full bg-[#c6ff00] px-2.5 py-1 text-[10px] font-extrabold uppercase leading-none text-black"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                <h3 className="truncate text-sm font-extrabold uppercase text-white">
                  {workout.title}
                </h3>

                <p className="mt-1 truncate text-xs text-gray-400">
                  {workout.equipment}
                </p>

                <div className="my-3 border-t border-[#292d37]" />

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <span aria-hidden="true">◷</span>
                    {workout.duration} min
                  </span>

                  <span className="flex items-center gap-1">
                    <span aria-hidden="true">♨</span>
                    {workout.calories} kcal
                  </span>

                  <span className="flex items-center gap-1">
                    <span className="text-gray-400" aria-hidden="true">☆</span>
                    {workout.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkoutLibraryCard;
