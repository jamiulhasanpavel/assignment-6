
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import backgroundImage from "@/assets/Background.png";
import { workouts } from "@/data/workouts";

type WorkoutPlanCardProps = {
  workoutId?: number;
  title?: string;
  equipment?: string;
  duration?: number;
  calories?: number;
  rating?: number;
  image?: string | StaticImageData;
  onViewDetails?: () => void;
  onAddToPlan?: () => void;
  isInPlan?: boolean;
  onRemove?: () => void;
  onMarkDone?: () => void;
};

export default function WorkoutPlanCard({
  workoutId,
  title = "Russian Twist",
  equipment = "Medicine Ball",
  duration = 8,
  calories = 70,
  rating = 4.1,
  image = backgroundImage,
  onViewDetails,
  onAddToPlan,
  isInPlan = false,
  onRemove,
  onMarkDone,
}: WorkoutPlanCardProps) {
  const [isDone, setIsDone] = useState(false);
  const linkedWorkout =
    (workoutId && workouts.find((workout) => workout.id === workoutId)) ??
    workouts.find((workout) => workout.title === title);

  const handleMarkDone = () => {
    setIsDone((previous) => !previous);
    onMarkDone?.();
  };

  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border p-4 transition sm:flex-row sm:items-center sm:justify-between ${
        isDone
          ? "border-[#c6ff00]/50 bg-[#151a12]"
          : "border-[#292d37] bg-[#15161b]"
      }`}
    >
      {/* Image and Workout Information */}
      <div className="flex min-w-0 items-center gap-4">
        <Image
          src={image}
          alt={title}
          width={144}
          height={80}
          sizes="(min-width: 640px) 144px, 112px"
          className="h-20 w-28 shrink-0 rounded-xl object-cover sm:w-36"
        />

        <div className="min-w-0">
          <h3 className="truncate text-base font-extrabold uppercase text-white">
            {title}
          </h3>

          <p className="mt-1 text-xs text-gray-400">{equipment}</p>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-300">
            <span className="flex items-center gap-1">
              <Icon name="clock" />
              {duration} min
            </span>

            <span className="flex items-center gap-1">
              <Icon name="flame" />
              {calories} kcal
            </span>

            <span className="flex items-center gap-1">
              <Icon name="star" />
              {rating.toFixed(1)}
            </span>
          </div>

          {isDone && (
            <p className="mt-2 text-xs font-semibold text-[#c6ff00]">
              Workout completed
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {onViewDetails ? (
          <button
            type="button"
            onClick={onViewDetails}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#414754] px-4 py-2.5 text-xs text-white transition hover:border-[#c6ff00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6ff00]"
          >
            <Icon name="eye" />
            View Details
          </button>
        ) : linkedWorkout ? (
          <Link
            href={`/workouts/${linkedWorkout.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#414754] px-4 py-2.5 text-xs text-white transition hover:border-[#c6ff00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6ff00]"
          >
            <Icon name="eye" />
            View Details
          </Link>
        ) : (
          <button
            type="button"
            disabled
            title="Workout details are unavailable"
            className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[#414754] px-4 py-2.5 text-xs text-gray-500"
          >
            <Icon name="eye" />
            View Details
          </button>
        )}

        {onAddToPlan && (
          <button
            type="button"
            onClick={onAddToPlan}
            disabled={isInPlan}
            className="inline-flex items-center justify-center rounded-full bg-[#c6ff00] px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#d8ff57] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isInPlan ? "Already in Plan" : "Add to Plan"}
          </button>
        )}

        <button
          type="button"
          onClick={handleMarkDone}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition ${
            isDone
              ? "border border-[#c6ff00] text-[#c6ff00]"
              : "bg-[#c6ff00] text-black hover:bg-[#d8ff57]"
          }`}
        >
          <Icon name="check" />
          {isDone ? "Mark Undone" : "Mark as Done"}
        </button>

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${title}`}
          className="rounded-full p-2 text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <Icon name="x" />
        </button>
      </div>
    </article>
  );
}

function Icon({ name }: { name: "clock" | "flame" | "star" | "check" | "x" | "eye" }) {
  const paths = {
    clock: "M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    flame: "M12 22a7 7 0 0 0 7-7c0-3-2-5-4-7 0 3-2 4-2 4 0-5-4-9-6-10 1 5-4 8-4 13a7 7 0 0 0 9 7Z",
    star: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z",
    check: "m5 12 4 4L19 6",
    x: "m18 6-12 12M6 6l12 12",
    eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
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
      className="h-[14px] w-[14px]"
    >
      <path d={paths[name]} />
    </svg>
  );
}
