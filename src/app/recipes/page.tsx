import Image from "next/image";
import Link from "next/link";
import { Star, Filter } from "lucide-react";

// 模拟食谱数据
const recipes = [
  {
    id: 1,
    title: "红烧肉",
    description: "经典家常菜，肥而不腻，入口即化",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
    rating: 4.8,
    author: "张厨师",
    time: "60分钟",
    category: "中式料理"
  },
  {
    id: 2,
    title: "意大利面",
    description: "正宗意式风味，搭配特制番茄酱",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2032&auto=format&fit=crop",
    rating: 4.6,
    author: "李大厨",
    time: "30分钟",
    category: "西式料理"
  },
  {
    id: 3,
    title: "寿司拼盘",
    description: "新鲜食材，精致摆盘，口感一流",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    author: "王师傅",
    time: "45分钟",
    category: "日式料理"
  },
  {
    id: 4,
    title: "提拉米苏",
    description: "意大利经典甜点，口感丰富层次分明",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1974&auto=format&fit=crop",
    rating: 4.7,
    author: "刘甜点师",
    time: "120分钟",
    category: "甜点饮品"
  },
  {
    id: 5,
    title: "宫保鸡丁",
    description: "麻辣鲜香，鸡肉鲜嫩，花生酥脆",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1974&auto=format&fit=crop",
    rating: 4.5,
    author: "赵师傅",
    time: "40分钟",
    category: "中式料理"
  },
  {
    id: 6,
    title: "法式牛排",
    description: "完美煎制，搭配红酒汁，口感多汁",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    author: "马大厨",
    time: "35分钟",
    category: "西式料理"
  }
];

export default function RecipesPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">美食食谱</h1>
          <p className="text-gray-600 dark:text-gray-300">
            探索各种美味食谱，开启您的烹饪之旅
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <button className="flex items-center px-4 py-2 border rounded-md">
            <Filter className="h-4 w-4 mr-2" />
            筛选
          </button>
          <select className="ml-4 px-4 py-2 border rounded-md bg-white dark:bg-gray-800">
            <option>最新发布</option>
            <option>最高评分</option>
            <option>最受欢迎</option>
          </select>
        </div>
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
                <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm font-medium">
                  {recipe.category}
                </div>
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

      <div className="mt-12 flex justify-center">
        <nav className="flex items-center">
          <button className="px-4 py-2 border rounded-l-md bg-white dark:bg-gray-800">
            上一页
          </button>
          <button className="px-4 py-2 border-t border-b bg-[color:var(--primary)] text-white">
            1
          </button>
          <button className="px-4 py-2 border-t border-b bg-white dark:bg-gray-800">
            2
          </button>
          <button className="px-4 py-2 border-t border-b bg-white dark:bg-gray-800">
            3
          </button>
          <button className="px-4 py-2 border rounded-r-md bg-white dark:bg-gray-800">
            下一页
          </button>
        </nav>
      </div>
    </div>
  );
}