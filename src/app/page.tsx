import Banner from "@/components/homepage/Banner";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white">
      <Navbar planCount={0} savedCount={0} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Banner />
      </main>
    </div>
  );
}
