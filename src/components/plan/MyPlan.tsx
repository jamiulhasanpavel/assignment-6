"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import WorkoutPlanCard from "@/components/detaitspage/ViewDetails";
import { workouts, type Workout } from "@/data/workouts";
import {
  readWorkoutIds,
  subscribeToWorkoutStorage,
  writeWorkoutIds,
} from "@/data/workoutStorage";

type Tab = "plan" | "saved";
type SortBy = "duration" | "calories" | "name";

function Icon({ name, className = "" }: { name: "clock" | "flame" | "dumbbell" | "chevron"; className?: string }) {
  const paths = {
    clock: "M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    flame: "M12 22a7 7 0 0 0 7-7c0-3-2-5-4-7 0 3-2 4-2 4 0-5-4-9-6-10 1 5-4 8-4 13a7 7 0 0 0 9 7Z",
    dumbbell: "M4 9h3v6H4zm13 0h3v6h-3zM7 12h10M9 7V5m6 2V5M9 17v2m6-2v2",
    chevron: "m6 9 6 6 6-6",
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 ${className}`}
    >
      <path d={paths[name]} />
    </svg>
  );
}

export default function MyPlan({ initialTab = "plan" }: { initialTab?: Tab }) {
  const activeTab = initialTab;
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>("duration");

  useEffect(() => {
    const syncWorkouts = () => {
      setPlanIds(readWorkoutIds("plan"));
      setSavedIds(readWorkoutIds("saved"));
    };

    syncWorkouts();
    return subscribeToWorkoutStorage(syncWorkouts);
  }, []);

  const currentItems = useMemo(() => {
    const ids = activeTab === "plan" ? planIds : savedIds;
    return ids
      .map((id) => workouts.find((workout) => workout.id === id))
      .filter((workout): workout is Workout => workout !== undefined);
  }, [activeTab, planIds, savedIds]);

  const sortedItems = useMemo(
    () =>
      [...currentItems].sort((a, b) => {
        if (sortBy === "duration") return a.duration - b.duration;
        if (sortBy === "calories") return b.calories - a.calories;
        return a.title.localeCompare(b.title);
      }),
    [currentItems, sortBy],
  );

  const totalMinutes = currentItems.reduce(
    (total, workout) => total + workout.duration,
    0,
  );
  const totalCalories = currentItems.reduce(
    (total, workout) => total + workout.calories,
    0,
  );

  const removeWorkout = (id: number) => {
    const nextIds =
      activeTab === "plan"
        ? planIds.filter((workoutId) => workoutId !== id)
        : savedIds.filter((workoutId) => workoutId !== id);

    if (activeTab === "plan") {
      writeWorkoutIds("plan", nextIds);
      setPlanIds(nextIds);
    } else {
      writeWorkoutIds("saved", nextIds);
      setSavedIds(nextIds);
    }
  };

  const addToPlan = (id: number) => {
    if (planIds.includes(id)) return;
    const nextIds = [...planIds, id];
    writeWorkoutIds("plan", nextIds);
    setPlanIds(nextIds);
  };

  return (
    <main className="min-h-screen bg-black px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <header>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            My Plan
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Add workouts to today&apos;s plan or keep them saved for later.
          </p>
        </header>

        <section
          aria-label="Workout summary"
          className="mt-6 grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-[#292d37] bg-[#15161b] sm:grid-cols-3"
        >
          <Summary label="Exercises" value={currentItems.length} accent />
          <Summary label="Minutes" value={totalMinutes} />
          <Summary label="Calories" value={totalCalories} />
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Workout lists" className="flex gap-2">
            <Link
              href="/my-plan"
              aria-current={activeTab === "plan" ? "page" : undefined}
              className={`rounded-xl border border-[#292d37] px-4 py-2 text-xs transition ${
                activeTab === "plan"
                  ? "bg-[#222630] font-bold text-white"
                  : "bg-[#15161b] text-gray-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan ({planIds.length})
            </Link>
            <Link
              href="/saved"
              aria-current={activeTab === "saved" ? "page" : undefined}
              className={`rounded-xl border border-[#292d37] px-5 py-2 text-xs transition ${
                activeTab === "saved"
                  ? "bg-[#222630] font-bold text-white"
                  : "bg-[#15161b] text-gray-400 hover:text-white"
              }`}
            >
              Saved ({savedIds.length})
            </Link>
          </nav>

          <label className="flex items-center gap-3 text-xs text-gray-400">
            Sort by
            <span className="relative">
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortBy)}
                className="appearance-none rounded-xl border border-[#292d37] bg-[#15161b] py-2.5 pl-3 pr-9 text-xs text-white outline-none focus:border-[#c6ff00]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="name">Name</option>
              </select>
              <Icon
                name="chevron"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
              />
            </span>
          </label>
        </div>

        {sortedItems.length === 0 ? (
          <section className="mt-6 flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#383b42] bg-[#101114] px-5 text-center">
            <h2 className="text-xl font-black uppercase">Nothing here yet</h2>
            <p className="mt-1 text-sm text-gray-400">
              {activeTab === "plan"
                ? "Browse the library and add workouts to today's plan."
                : "Save a workout from its details page to find it here later."}
            </p>
            <Link
              href="/#workouts"
              className="mt-6 rounded-full bg-[#c6ff00] px-6 py-3 text-xs font-bold text-black shadow-[0_8px_24px_rgba(198,255,0,0.12)] transition hover:bg-[#d8ff57]"
            >
              Browse workouts
            </Link>
          </section>
        ) : (
          <section
            aria-label={activeTab === "plan" ? "Today's workouts" : "Saved workouts"}
            className="mt-6 flex flex-col gap-4"
          >
            {sortedItems.map((workout) => (
              <WorkoutPlanCard
                key={workout.id}
                workoutId={workout.id}
                title={workout.title}
                equipment={workout.equipment}
                duration={workout.duration}
                calories={workout.calories}
                rating={workout.rating}
                onAddToPlan={
                  activeTab === "saved" ? () => addToPlan(workout.id) : undefined
                }
                isInPlan={planIds.includes(workout.id)}
                onRemove={() => removeWorkout(workout.id)}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

type SummaryProps = {
  label: string;
  value: number;
  accent?: boolean;
};

function Summary({ label, value, accent = false }: SummaryProps) {
  return (
    <div className="border-b border-[#292d37] px-6 py-6 last:border-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <p className="text-xs text-gray-400">{label}</p>
      <p
        className={`mt-1 text-4xl font-black ${
          accent ? "text-[#c6ff00]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
