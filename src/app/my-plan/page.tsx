import MyPlan from "@/components/plan/MyPlan";
import Navbar from "@/components/shared/Navbar";

export default function MyPlanPage() {
  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white">
      <Navbar />
      <MyPlan />
    </div>
  );
}
