"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Star, Upload } from "lucide-react";
import Link from "next/link";

export default function AddReviewForm({ recipeId }: { recipeId: string }) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟提交
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setRating(0);
      setComment("");
    }, 1000);
  };

  if (!session) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold mb-4">添加评论</h3>
        <p className="mb-4">请先登录后再发表评论。</p>
        <Link href="/login" className="btn btn-primary">
          登录
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold mb-2">评论已提交</h3>
        <p className="mb-4">感谢您的评价！您的评论将在审核后显示。</p>
        <button 
          onClick={() => setSubmitted(false)} 
          className="btn btn-outline"
        >
          添加另一条评论
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
      <h3 className="text-xl font-bold mb-4">添加评论</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">评分</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  className={`h-8 w-8 ${
                    (hoverRating || rating) >= star
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium mb-2">
            评论
          </label>
          <textarea
            id="comment"
            rows={4}
            className="input"
            placeholder="分享您的烹饪体验..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            上传图片 (可选)
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 rounded-lg text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">
              点击或拖拽图片到此处上传
            </p>
            <p className="text-xs text-gray-400 mt-1">
              支持 JPG, PNG 格式，最大 5MB
            </p>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              className="mt-4 px-4 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
            >
              选择图片
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting || rating === 0 || !comment.trim()}
        >
          {isSubmitting ? "提交中..." : "提交评论"}
        </button>
      </form>
    </div>
  );
}