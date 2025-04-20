"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, ChefHat, Star, Bookmark, Share2 } from "lucide-react";
import { useSession } from "next-auth/react";
import RecipeReviews from "@/components/RecipeReviews";
import AddReviewForm from "@/components/AddReviewForm";
import FavoriteButton from "@/components/FavoriteButton";
import CollectionModal from "@/components/CollectionModal";

// 模拟食谱数据
const recipe = {
  id: 1,
  title: "红烧肉",
  description: "经典家常菜，肥而不腻，入口即化，色泽红亮，香味四溢。",
  image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
  rating: 4.8,
  reviewCount: 24,
  author: "张厨师",
  time: "60分钟",
  servings: 4,
  difficulty: "中等",
  ingredients: [
    "五花肉 500g",
    "生姜 2片",
    "大葱 1根",
    "八角 2个",
    "桂皮 1小块",
    "干辣椒 2个",
    "冰糖 30g",
    "酱油 3汤匙",
    "料酒 2汤匙",
    "盐 适量"
  ],
  steps: [
    "五花肉切成4厘米见方的块。",
    "锅中放入冷水，放入五花肉，大火煮开，撇去浮沫，煮3分钟后捞出，用清水冲洗干净。",
    "锅中放入少量油，小火融化冰糖至焦糖色。",
    "放入五花肉翻炒均匀，使每块肉都均匀裹上糖色。",
    "加入姜片、葱段、八角、桂皮、干辣椒，翻炒出香味。",
    "加入酱油、料酒，翻炒均匀。",
    "加入没过肉的热水，大火烧开后转小火，盖上锅盖炖1小时左右，直到肉烂。",
    "开盖转大火收汁，加入适量盐调味即可。"
  ],
  tips: "选择三层五花肉，肥瘦比例约为3:7最佳。炖煮时间越长，肉质越酥烂。"
};

export default function RecipePage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleShareRecipe = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href,
      }).catch((error) => console.log('分享失败', error));
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('链接已复制到剪贴板'))
        .catch((err) => console.error('无法复制链接: ', err));
    }
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link href="/recipes" className="text-[color:var(--primary)] hover:underline">
          ← 返回食谱列表
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-96 w-full mb-6">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl font-bold">{recipe.title}</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsCollectionModalOpen(true)}
                className="flex items-center justify-center p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="收藏到收藏夹"
              >
                <Bookmark className="h-5 w-5" />
              </button>
              <button
                onClick={handleShareRecipe}
                className="flex items-center justify-center p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="分享食谱"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(recipe.rating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-lg font-medium">{recipe.rating}</span>
              <span className="ml-1 text-gray-500">({recipe.reviewCount} 评价)</span>
            </div>
            <div className="ml-auto">
              <FavoriteButton 
                recipeId={params.id} 
                initialIsFavorited={isFavorited}
                showText={true}
              />
            </div>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{recipe.description}</p>

          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-[color:var(--primary)]" />
              <span className="ml-2">{recipe.time}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-[color:var(--primary)]" />
              <span className="ml-2">{recipe.servings} 人份</span>
            </div>
            <div className="flex items-center">
              <ChefHat className="h-5 w-5 text-[color:var(--primary)]" />
              <span className="ml-2">难度: {recipe.difficulty}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">食材</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--primary)] mr-2"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">步骤</h2>
            <ol className="space-y-6">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[color:var(--primary)] text-white flex items-center justify-center mr-4">
                    {index + 1}
                  </div>
                  <p className="mt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {recipe.tips && (
            <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
              <h3 className="text-xl font-bold mb-2">小贴士</h3>
              <p>{recipe.tips}</p>
            </div>
          )}

          <RecipeReviews recipeId={params.id} />
          <AddReviewForm recipeId={params.id} />
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-4">关于作者</h3>
            <div className="flex items-center mb-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1974&auto=format&fit=crop"
                  alt={recipe.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4">
                <h4 className="font-medium">{recipe.author}</h4>
                <p className="text-sm text-gray-500">专业厨师</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              拥有10年烹饪经验，擅长中式料理，尤其是各种经典家常菜。
            </p>
            <Link href="#" className="btn btn-outline w-full">
              查看所有食谱
            </Link>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">相关食谱</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="relative h-16 w-16 rounded overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=1770&auto=format&fit=crop"
                      alt="东坡肉"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h4 className="font-medium">东坡肉</h4>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-xs">4.7</span>
                    </div>
                  </div>
                  <FavoriteButton recipeId="2" />
                </div>
                <div className="flex items-center">
                  <div className="relative h-16 w-16 rounded overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1623595119708-26b1f7500ddd?q=80&w=1974&auto=format&fit=crop"
                      alt="糖醋排骨"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h4 className="font-medium">糖醋排骨</h4>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-xs">4.6</span>
                    </div>
                  </div>
                  <FavoriteButton recipeId="3" />
                </div>
                <div className="flex items-center">
                  <div className="relative h-16 w-16 rounded overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2070&auto=format&fit=crop"
                      alt="红烧鱼"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h4 className="font-medium">红烧鱼</h4>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-xs">4.5</span>
                    </div>
                  </div>
                  <FavoriteButton recipeId="4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CollectionModal 
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        recipeId={params.id}
        recipeTitle={recipe.title}
      />
    </div>
  );
}