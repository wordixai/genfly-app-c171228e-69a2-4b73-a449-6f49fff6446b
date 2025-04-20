import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const recipes = [
  {
    id: 1,
    title: "红烧肉",
    description: "经典家常菜，肥而不腻，入口即化",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
    rating: 4.8,
    author: "张厨师",
    time: "60分钟"
  },
  {
    id: 2,
    title: "意大利面",
    description: "正宗意式风味，搭配特制番茄酱",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2032&auto=format&fit=crop",
    rating: 4.6,
    author: "李大厨",
    time: "30分钟"
  },
  {
    id: 3,
    title: "寿司拼盘",
    description: "新鲜食材，精致摆盘，口感一流",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    author: "王师傅",
    time: "45分钟"
  },
];

export default function FeaturedRecipes() {
  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">精选食谱</h2>
        <Link href="/recipes" className="text-[color:var(--primary)] hover:underline">
          查看全部
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="group">
            <div className="card h-full group-hover:scale-105 transition-transform duration-300">
              <div className="relative h-48 w-full">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{recipe.title}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm">{recipe.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{recipe.description}</p>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>作者: {recipe.author}</span>
                  <span>时间: {recipe.time}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}