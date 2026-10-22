import MyPlan from "@/components/plan/MyPlan";
import Navbar from "@/components/shared/Navbar";

export default function SavedPage() {
  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white">
      <Navbar />
      <MyPlan initialTab="saved" />
    </div>
  );
}
