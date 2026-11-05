import BestProducts from "./components/BestProducts";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import ScienceTrust from "./components/ScienceTrust";
import SkinConcerns from "./components/SkinConcerns";
import UserStories from "./components/UserStories";

export default function Home() {
  return (
    <main className="relative flex-1">
      <Hero />
      <Philosophy />
      <BestProducts />
      <SkinConcerns />
      <ScienceTrust />
      <UserStories />
    </main>
  );
}
