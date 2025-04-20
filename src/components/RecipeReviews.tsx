"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ThumbsUp, Flag } from "lucide-react";

// 模拟评论数据
const mockReviews = [
  {
    id: 1,
    user: {
      name: "李明",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop"
    },
    rating: 5,
    date: "2023-06-15",
    comment: "按照食谱做出来的红烧肉非常美味，肥而不腻，家人都很喜欢！下次还会再做。我用了一点点冰糖增加了甜味，效果很好。",
    likes: 12,
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    user: {
      name: "王芳",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
    },
    rating: 4,
    date: "2023-06-10",
    comment: "整体来说很不错，但我个人觉得可以再多炖一会儿，肉会更烂一些。调味很到位，香味十足。",
    likes: 5,
    images: []
  },
  {
    id: 3,
    user: {
      name: "张伟",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop"
    },
    rating: 5,
    date: "2023-06-05",
    comment: "这是我第一次尝试做红烧肉，按照步骤一步步来，成品出乎意料的好！朋友们都很惊讶。特别是那个收汁的步骤很关键。",
    likes: 8,
    images: [
      "https://images.unsplash.com/photo-1623595119708-26b1f7500ddd?q=80&w=1974&auto=format&fit=crop"
    ]
  }
];

export default function RecipeReviews({ recipeId }: { recipeId: string }) {
  const [reviews, setReviews] = useState(mockReviews);
  const [filter, setFilter] = useState("all");

  const filteredReviews = filter === "all" 
    ? reviews 
    : filter === "highest" 
      ? [...reviews].sort((a, b) => b.rating - a.rating)
      : [...reviews].sort((a, b) => a.rating - b.rating);

  const handleLike = (reviewId: number) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, likes: review.likes + 1 } 
        : review
    ));
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">用户评价 ({reviews.length})</h2>
      
      <div className="flex mb-6 space-x-4">
        <button 
          className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-[color:var(--primary)] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
          onClick={() => setFilter('all')}
        >
          全部评价
        </button>
        <button 
          className={`px-4 py-2 rounded-full ${filter === 'highest' ? 'bg-[color:var(--primary)] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
          onClick={() => setFilter('highest')}
        >
          最高评分
        </button>
        <button 
          className={`px-4 py-2 rounded-full ${filter === 'lowest' ? 'bg-[color:var(--primary)] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
          onClick={() => setFilter('lowest')}
        >
          最低评分
        </button>
      </div>
      
      <div className="space-y-8">
        {filteredReviews.map((review) => (
          <div key={review.id} className="border-b pb-8">
            <div className="flex items-center mb-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src={review.user.avatar}
                  alt={review.user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4">
                <h4 className="font-medium">{review.user.name}</h4>
                <div className="flex items-center">
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
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
            
            {review.images.length > 0 && (
              <div className="flex space-x-2 mb-4">
                {review.images.map((image, index) => (
                  <div key={index} className="relative h-20 w-20 rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={`Review image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex space-x-4">
              <button 
                className="flex items-center text-gray-500 hover:text-[color:var(--primary)]"
                onClick={() => handleLike(review.id)}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{review.likes}</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-[color:var(--primary)]">
                <Flag className="h-4 w-4 mr-1" />
                <span>举报</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}