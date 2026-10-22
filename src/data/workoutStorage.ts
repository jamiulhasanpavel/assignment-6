const PLAN_STORAGE_KEY = "fitlog-plan";
const SAVED_STORAGE_KEY = "fitlog-saved";

export type WorkoutList = "plan" | "saved";
const WORKOUTS_UPDATED_EVENT = "fitlog-workouts-updated";

function getStorageKey(list: WorkoutList) {
  return list === "plan" ? PLAN_STORAGE_KEY : SAVED_STORAGE_KEY;
}

export function readWorkoutIds(list: WorkoutList): number[] {
  const stored = window.localStorage.getItem(getStorageKey(list));
  if (!stored) return [];

  const parsed: unknown = JSON.parse(stored);
  if (!Array.isArray(parsed)) {
    throw new Error(`Stored ${list} workouts must be an array.`);
  }

  return [...new Set(parsed.filter(
    (id): id is number => typeof id === "number" && Number.isInteger(id),
  ))];
}

export function writeWorkoutIds(list: WorkoutList, ids: number[]) {
  window.localStorage.setItem(getStorageKey(list), JSON.stringify(ids));
  window.dispatchEvent(new Event(WORKOUTS_UPDATED_EVENT));
}

export function subscribeToWorkoutStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(WORKOUTS_UPDATED_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(WORKOUTS_UPDATED_EVENT, onChange);
  };
}

export function isWorkoutInList(list: WorkoutList, id: number) {
  return readWorkoutIds(list).includes(id);
}

export function getWorkoutCount(list: WorkoutList) {
  return readWorkoutIds(list).length;
}

export function addWorkoutId(list: WorkoutList, id: number): "added" | "exists" {
  const ids = readWorkoutIds(list);
  if (ids.includes(id)) return "exists";

  writeWorkoutIds(list, [...ids, id]);
  return "added";
}

export function removeWorkoutId(list: WorkoutList, id: number) {
  writeWorkoutIds(
    list,
    readWorkoutIds(list).filter((workoutId) => workoutId !== id),
  );
}
