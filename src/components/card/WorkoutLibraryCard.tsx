import Image from "next/image";
import backgroundImage from "@/assets/Background.png";

type Workout = {
  id: number;
  title: string;
  muscles: string[];
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
};

const workouts: Workout[] = [
  { id: 1, title: "Barbell Bench Press", muscles: ["Chest", "Arms"], equipment: "Barbell, Bench", duration: 25, calories: 180, rating: 4.8 },
  { id: 2, title: "Pull-Up", muscles: ["Back", "Arms"], equipment: "Pull-up Bar", duration: 15, calories: 120, rating: 4.7 },
  { id: 3, title: "Back Squat", muscles: ["Legs", "Core"], equipment: "Barbell, Rack", duration: 30, calories: 240, rating: 4.9 },
  { id: 4, title: "Overhead Press", muscles: ["Shoulders", "Arms"], equipment: "Barbell", duration: 20, calories: 150, rating: 4.6 },
  { id: 5, title: "Dumbbell Bicep Curl", muscles: ["Arms"], equipment: "Dumbbells", duration: 12, calories: 80, rating: 4.3 },
  { id: 6, title: "Hammer Curl", muscles: ["Arms", "Forearms"], equipment: "Dumbbells", duration: 14, calories: 90, rating: 4.4 },
  { id: 7, title: "Hollow-Body Plank", muscles: ["Core"], equipment: "Bodyweight", duration: 10, calories: 60, rating: 4.4 },
  { id: 8, title: "Cable Curl", muscles: ["Arms"], equipment: "Cable Machine", duration: 13, calories: 85, rating: 4.5 },
  { id: 9, title: "Conventional Deadlift", muscles: ["Back", "Legs"], equipment: "Barbell", duration: 28, calories: 260, rating: 4.9 },
  { id: 10, title: "Push-Up", muscles: ["Chest", "Arms", "Core"], equipment: "Bodyweight", duration: 10, calories: 90, rating: 4.5 },
  { id: 11, title: "Walking Lunge", muscles: ["Legs"], equipment: "Dumbbells (optional)", duration: 18, calories: 170, rating: 4.4 },
  { id: 12, title: "Russian Twist", muscles: ["Core"], equipment: "Medicine Ball", duration: 8, calories: 70, rating: 4.1 },
];

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
            <article
              key={workout.id}
              className="group overflow-hidden rounded-xl border border-[#292d37] bg-[#15161b] transition duration-300 hover:-translate-y-1 hover:border-[#c6ff00]/60"
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkoutLibraryCard;
