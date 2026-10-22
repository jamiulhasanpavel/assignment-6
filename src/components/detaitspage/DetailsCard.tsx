
"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { ToastContainer, toast } from "react-toastify";
import bannerImage from "@/assets/banner.png";
import type { Workout } from "@/data/workouts";
import {
  addWorkoutId,
  isWorkoutInList,
  subscribeToWorkoutStorage,
} from "@/data/workoutStorage";

type IconName = "calendar" | "bookmark" | "check" | "clock" | "flame" | "star";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, string> = {
    calendar: "M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z",
    bookmark: "M6 4h12v17l-6-4-6 4V4Z",
    check: "m5 12 4 4L19 6",
    clock: "M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    flame: "M12 22a7 7 0 0 0 7-7c0-3-2-5-4-7 0 3-2 4-2 4 0-5-4-9-6-10 1 5-4 8-4 13a7 7 0 0 0 9 7Z",
    star: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z",
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}

export default function WorkoutDetails({ workout }: { workout: Workout }) {
  const addedToPlan = useSyncExternalStore(
    subscribeToWorkoutStorage,
    () => isWorkoutInList("plan", workout.id),
    () => false,
  );
  const saved = useSyncExternalStore(
    subscribeToWorkoutStorage,
    () => isWorkoutInList("saved", workout.id),
    () => false,
  );

  const togglePlan = () => {
    if (addedToPlan) {
      toast.info(`${workout.title} is already in today's plan.`);
      return;
    }

    const result = addWorkoutId("plan", workout.id);
    if (result === "added") {
      toast.success(`${workout.title} added successfully to today's plan.`);
    } else {
      toast.info(`${workout.title} is already in today's plan.`);
    }
  };

  const toggleSaved = () => {
    if (saved) {
      toast.info(`${workout.title} is already saved.`);
      return;
    }

    const result = addWorkoutId("saved", workout.id);
    if (result === "added") {
      toast.success(`${workout.title} saved successfully for later.`);
    } else {
      toast.info(`${workout.title} is already saved.`);
    }
  };

  const details = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min`, icon: "clock" as const },
    { label: "Calories", value: `${workout.calories} kcal`, icon: "flame" as const },
    { label: "Rating", value: workout.rating.toFixed(1), icon: "star" as const },
  ];

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-10 lg:py-12">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        theme="dark"
        toastStyle={{
          backgroundColor: "#171d0c",
          color: "#fff",
          border: "1px solid rgba(198, 255, 0, 0.4)",
        }}
      />
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Workout Image */}
        <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-[#292d37] bg-[#15161b] shadow-2xl sm:min-h-[420px]">
          <Image
            src={bannerImage}
            alt="Illustration of a strength-training machine"
            className="h-full w-full object-contain"
            priority
          />
        </div>

        {/* Workout Information */}
        <section className="min-w-0">
          <h1 className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl">
            {workout.title}
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-400 sm:text-base">
            {workout.description}
          </p>

          {/* Muscle Groups */}
          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscles.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#c6ff00] px-4 py-1.5 text-xs font-semibold text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Details Table */}
          <div className="mt-7 overflow-hidden rounded-2xl border border-[#292d37] bg-[#161920]">
            {details.map(({ label, value, icon }, index) => (
              <div
                key={label}
                className={`flex min-h-[49px] items-center justify-between gap-4 px-4 py-3 sm:px-6 ${
                  index !== details.length - 1
                    ? "border-b border-[#292d37]"
                    : ""
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  {label}
                </span>

                <span className="flex items-center gap-2 text-right text-sm text-gray-200">
                  {icon && <Icon name={icon} size={16} />}
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-base font-extrabold uppercase">
              Instructions
            </h2>

            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-5 text-gray-300 marker:text-gray-400">
              {workout.instructions.map((instruction, index) => (
                <li key={index} className="pl-1">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={togglePlan}
              aria-pressed={addedToPlan}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c6ff00] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#d8ff57]"
            >
              {addedToPlan ? <Icon name="check" /> : <Icon name="calendar" />}
              {addedToPlan
                ? "Added to today's plan"
                : "Add to today's plan"}
            </button>

            <button
              type="button"
              onClick={toggleSaved}
              aria-pressed={saved}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                saved
                  ? "border-[#c6ff00] text-[#c6ff00]"
                  : "border-[#414754] text-white hover:border-[#c6ff00]"
              }`}
            >
              {saved ? <Icon name="check" /> : <Icon name="bookmark" />}
              {saved ? "Saved for later" : "Save for later"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
