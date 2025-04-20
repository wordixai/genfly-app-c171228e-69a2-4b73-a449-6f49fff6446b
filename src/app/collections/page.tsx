"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FolderPlus, MoreHorizontal, Edit, Trash2, Star } from "lucide-react";

// 模拟收藏夹数据
const mockCollections = [
  {
    id: 1,
    name: "我的最爱",
    description: "我最喜欢的食谱集合",
    recipeCount: 12,
    coverImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop",
    recipes: [
      {
        id: 1,
        title: "红烧肉",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
        rating: 4.8
      },
      {
        id: 3,
        title: "寿司拼盘",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop",
        rating: 4.9
      }
    ]
  },
  {
    id: 2,
    name: "周末尝试",
    description: "周末有空时想尝试的食谱",
    recipeCount: 5,
    coverImage: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2032&auto=format&fit=crop",
    recipes: [
      {
        id: 2,
        title: "意大利面",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2032&auto=format&fit=crop",
        rating: 4.6
      }
    ]
  },
  {
    id: 3,
    name: "家常菜",
    description: "简单易做的家常菜谱",
    recipeCount: 8,
    coverImage: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1974&auto=format&fit=crop",
    recipes: [
      {
        id: 5,
        title: "宫保鸡丁",
        image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1974&auto=format&fit=crop",
        rating: 4.5
      }
    ]
  }
];

export default function CollectionsPage() {
  const { data: session } = useSession();
  const [collections, setCollections] = useState(mockCollections);
  const [activeCollection, setActiveCollection] = useState<number | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    
    const newCollection = {
      id: Date.now(),
      name: newCollectionName.trim(),
      description: newCollectionDescription.trim(),
      recipeCount: 0,
      coverImage: "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?q=80&w=2076&auto=format&fit=crop",
      recipes: []
    };
    
    setCollections([...collections, newCollection]);
    setNewCollectionName("");
    setNewCollectionDescription("");
    setIsCreatingNew(false);
  };

  const handleDeleteCollection = (id: number) => {
    if (confirm("确定要删除这个收藏夹吗？")) {
      setCollections(collections.filter(collection => collection.id !== id));
    }
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">我的收藏夹</h1>
        <button
          onClick={() => setIsCreatingNew(true)}
          className="btn btn-primary flex items-center"
        >
          <FolderPlus className="h-5 w-5 mr-2" />
          新建收藏夹
        </button>
      </div>

      {isCreatingNew && (
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">新建收藏夹</h2>
          <form onSubmit={handleCreateCollection}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                名称
              </label>
              <input
                id="name"
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                className="input"
                placeholder="收藏夹名称"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                描述 (可选)
              </label>
              <textarea
                id="description"
                value={newCollectionDescription}
                onChange={(e) => setNewCollectionDescription(e.target.value)}
                className="input"
                placeholder="简短描述这个收藏夹"
                rows={3}
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="btn btn-outline"
              >
                取消
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!newCollectionName.trim()}
              >
                创建
              </button>
            </div>
          </form>
        </div>
      )}

      {collections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div key={collection.id} className="card overflow-visible">
              <div 
                className="relative h-40 w-full cursor-pointer"
                onClick={() => setActiveCollection(activeCollection === collection.id ? null : collection.id)}
              >
                <Image
                  src={collection.coverImage}
                  alt={collection.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold">{collection.name}</h3>
                    <p className="text-sm">{collection.recipeCount} 个食谱</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="relative">
                    <button 
                      className="p-1 bg-white dark:bg-gray-800 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCollection(activeCollection === collection.id ? null : collection.id);
                      }}
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                    
                    {activeCollection === collection.id && (
                      <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                        <div className="py-1">
                          <button 
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              // 编辑收藏夹逻辑
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            编辑
                          </button>
                          <button 
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCollection(collection.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            删除
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {collection.description || "没有描述"}
                </p>
                
                {collection.recipes.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-500">包含的食谱:</h4>
                    {collection.recipes.slice(0, 3).map((recipe) => (
                      <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded">
                        <div className="relative h-10 w-10 rounded overflow-hidden">
                          <Image
                            src={recipe.image}
                            alt={recipe.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-3 flex-grow">
                          <p className="text-sm font-medium">{recipe.title}</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 text-xs">{recipe.rating}</span>
                        </div>
                      </Link>
                    ))}
                    
                    {collection.recipes.length > 3 && (
                      <Link href={`/collections/${collection.id}`} className="text-sm text-[color:var(--primary)] hover:underline">
                        查看全部 {collection.recipes.length} 个食谱
                      </Link>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    这个收藏夹还没有食谱
                  </p>
                )}
              </div>
              
              <div className="p-4 border-t">
                <Link href={`/collections/${collection.id}`} className="btn btn-outline w-full text-sm">
                  查看详情
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-xl font-medium mb-2">您还没有创建任何收藏夹</h3>
          <p className="text-gray-500 mb-6">创建收藏夹来整理您喜欢的食谱</p>
          <button 
            onClick={() => setIsCreatingNew(true)}
            className="btn btn-primary"
          >
            创建第一个收藏夹
          </button>
        </div>
      )}
    </div>
  );
}