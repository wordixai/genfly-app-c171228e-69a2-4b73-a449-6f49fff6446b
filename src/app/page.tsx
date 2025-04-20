import FeaturedRecipes from "@/components/FeaturedRecipes";
import Hero from "@/components/Hero";
import PopularCategories from "@/components/PopularCategories";
import RecentReviews from "@/components/RecentReviews";

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      <Hero />
      <div className="container">
        <PopularCategories />
        <FeaturedRecipes />
        <RecentReviews />
      </div>
    </div>
  );
}