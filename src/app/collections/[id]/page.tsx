"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowLeft, Edit, Trash2, Filter } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";

// 模拟收藏夹详情数据
const mockCollectionDetails = {
  id: 1,
  name: "我的最爱",
  description: "我最喜欢的食谱集合，包含各种美味佳肴",
  recipeCount: 12,
  coverImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop",
  recipes: [
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
      id: 2,
      title: "意大利面",
      description: "正宗意式风味，搭配特制番茄酱",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2032&auto=format&fit=crop",
      rating: 4.6,
      author: "李大厨",
      time: "30分钟",
      category: "西式料理"
    }
  ]
};

export default function CollectionDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [collection, setCollection] = useState(mockCollectionDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(collection.name);
  const [editDescription, setEditDescription] = useState(collection.description || "");
  const [sortBy, setSortBy] = useState("latest");
  const [recipes, setRecipes] = useState(collection.recipes);

  const handleSaveEdit = () => {
    if (!editName.trim()) return;
    
    setCollection({
      ...collection,
      name: editName.trim(),
      description: editDescription.trim()
    });
    
    setIsEditing(false);
  };

  const handleRemoveRecipe = (recipeId: number) => {
    if (confirm("确定要从收藏夹中移除这个食谱吗？")) {
      const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
      setRecipes(updatedRecipes);
      setCollection({
        ...collection,
        recipes: updatedRecipes,
        recipeCount: updatedRecipes.length
      });
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    
    let sortedRecipes = [...recipes];
    if (value === "rating") {
      sortedRecipes.sort((a, b) => b.rating - a.rating);
    } else if (value === "time") {
      sortedRecipes.sort((a, b) => parseInt(a.time) - parseInt(b.time));
    }
    // 最新发布保持原顺序
    
    setRecipes(sortedRecipes);
  };

  if (!session) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">请先登录</h1>
        <p className="mb-8">您需要登录后才能查看收藏夹。</p>
        <Link href="/login" className="btn btn-primary">
          登录
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link href="/collections" className="text-[color:var(--primary)] hover:underline flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          返回收藏夹列表
        </Link>
      </div>

      <div className="relative h-64 w-full mb-8 rounded-lg overflow-hidden">
        <Image
          src={collection.coverImage}
          alt={collection.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          {isEditing ? (
            <div className="w-full max-w-lg px-6">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="input text-xl font-bold mb-4 text-center"
                placeholder="收藏夹名称"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="input text-center"
                placeholder="添加描述（可选）"
                rows={2}
              ></textarea>
            </div>
          ) : (
            <div className="text-center text-white p-6">
              <h1 className="text-4xl font-bold mb-2">{collection.name}</h1>
              {collection.description && (
                <p className="text-lg max-w-2xl mx-auto">{collection.description}</p>
              )}
              <p className="mt-4">{collection.recipeCount} 个食谱</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        {isEditing ? (
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-outline"
            >
              取消
            </button>
            <button
              onClick={handleSaveEdit}
              className="btn btn-primary"
              disabled={!editName.trim()}
            >
              保存
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-outline flex items-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              编辑收藏夹
            </button>
            <button
              className="btn btn-outline text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              删除收藏夹
            </button>
          </div>
        )}

        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-sm">排序:</label>
          <select 
            id="sort"
            className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="latest">最新添加</option>
            <option value="rating">最高评分</option>
            <option value="time">烹饪时间</option>
          </select>
        </div>
      </div>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="group relative">
              <Link href={`/recipes/${recipe.id}`}>
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
              <button 
                className="absolute top-2 left-2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md text-red-500 hover:bg-red-50"
                onClick={() => handleRemoveRecipe(recipe.id)}
                aria-label="从收藏夹中移除"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-xl font-medium mb-2">这个收藏夹还没有食谱</h3>
          <p className="text-gray-500 mb-6">浏览食谱并添加到这个收藏夹</p>
          <Link href="/recipes" className="btn btn-primary">
            浏览食谱
          </Link>
        </div>
      )}
    </div>
  );
}