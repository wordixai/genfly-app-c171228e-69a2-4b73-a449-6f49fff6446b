"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Star, Edit, Bookmark, Settings, LogOut } from "lucide-react";

// 模拟用户数据
const userReviews = [
  {
    id: 1,
    recipe: {
      id: 1,
      title: "红烧肉1",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
    },
    rating: 5,
    comment: "按照食谱做出来的红烧肉非常美味，肥而不腻，家人都很喜欢！",
    date: "2023-06-15"
  },
  {
    id: 2,
    recipe: {
      id: 2,
      title: "意大利面",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2032&auto=format&fit=crop",
    },
    rating: 4,
    comment: "酱料很香，但我个人觉得可以再加点辣椒提味。整体来说还是很不错的！",
    date: "2023-06-10"
  }
];

const savedRecipes = [
  {
    id: 1,
    title: "红烧肉",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
    rating: 4.8,
    author: "张厨师"
  },
  {
    id: 3,
    title: "寿司拼盘",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    author: "王师傅"
  },
  {
    id: 5,
    title: "宫保鸡丁",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1974&auto=format&fit=crop",
    rating: 4.5,
    author: "赵师傅"
  }
];

export default function ProfilePage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("reviews");

  if (!session) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">请先登录</h1>
        <p className="mb-8">您需要登录后才能查看个人资料页面。</p>
        <Link href="/login" className="btn btn-primary">
          登录
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="card p-6 sticky top-24">
            <div className="flex flex-col items-center mb-6">
              <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop"
                  alt={session.user?.name || "用户"}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-bold">{session.user?.name || "用户"}</h2>
              <p className="text-gray-500">{session.user?.email}</p>
            </div>
            
            <nav className="space-y-2">
              <button
                className={`flex items-center w-full px-4 py-2 rounded-md ${
                  activeTab === "reviews"
                    ? "bg-[color:var(--primary)] text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                <Star className="h-5 w-5 mr-3" />
                我的评论
              </button>
              <button
                className={`flex items-center w-full px-4 py-2 rounded-md ${
                  activeTab === "saved"
                    ? "bg-[color:var(--primary)] text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => setActiveTab("saved")}
              >
                <Bookmark className="h-5 w-5 mr-3" />
                收藏的食谱
              </button>
              <Link
                href="/profile/settings"
                className="flex items-center w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Settings className="h-5 w-5 mr-3" />
                账号设置
              </Link>
              <button
                className="flex items-center w-full px-4 py-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => {}}
              >
                <LogOut className="h-5 w-5 mr-3" />
                退出登录
              </button>
            </nav>
          </div>
        </div>
        
        <div className="md:col-span-3">
          {activeTab === "reviews" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">我的评论</h1>
              {userReviews.length > 0 ? (
                <div className="space-y-6">
                  {userReviews.map((review) => (
                    <div key={review.id} className="card p-6">
                      <div className="flex items-start">
                        <div className="relative h-20 w-20 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={review.recipe.image}
                            alt={review.recipe.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold">
                                <Link href={`/recipes/${review.recipe.id}`} className="hover:text-[color:var(--primary)]">
                                  {review.recipe.title}
                                </Link>
                              </h3>
                              <div className="flex items-center mt-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-[color:var(--primary)]">
                              <Edit className="h-5 w-5" />
                            </button>
                          </div>
                          <p className="mt-2 text-gray-600 dark:text-gray-300">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-xl font-medium mb-2">您还没有发表任何评论</h3>
                  <p className="text-gray-500 mb-6">浏览食谱并分享您的烹饪体验</p>
                  <Link href="/recipes" className="btn btn-primary">
                    浏览食谱
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {activeTab === "saved" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">收藏的食谱</h1>
              {savedRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedRecipes.map((recipe) => (
                    <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="group">
                      <div className="card h-full group-hover:scale-105 transition-transform duration-300">
                        <div className="relative h-40 w-full">
                          <Image
                            src={recipe.image}
                            alt={recipe.title}
                            fill
                            className="object-cover"
                          />
                          <button className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-1.5 rounded-full text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-white">
                            <Bookmark className="h-5 w-5 fill-current" />
                          </button>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-bold">{recipe.title}</h3>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="ml-1 text-sm">{recipe.rating}</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            <span>作者: {recipe.author}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-xl font-medium mb-2">您还没有收藏任何食谱</h3>
                  <p className="text-gray-500 mb-6">浏览食谱并收藏您喜欢的内容</p>
                  <Link href="/recipes" className="btn btn-primary">
                    浏览食谱
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
