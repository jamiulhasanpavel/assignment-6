import { notFound } from "next/navigation";
import WorkoutDetails from "@/components/detaitspage/DetailsCard";
import Navbar from "@/components/shared/Navbar";
import { workouts } from "@/data/workouts";

export function generateStaticParams() {
  return workouts.map(({ id }) => ({ id: String(id) }));
}

export default async function WorkoutDetailsPage({
  params,
}: PageProps<"/workouts/[id]">) {
  const { id } = await params;
  const workout = workouts.find((item) => String(item.id) === id);

  if (!workout) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white">
      <Navbar planCount={0} savedCount={0} />
      <WorkoutDetails workout={workout} />
    </div>
  );
}
