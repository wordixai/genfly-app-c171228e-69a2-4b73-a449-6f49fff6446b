"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {
  recipeId: string | number;
  initialIsFavorited?: boolean;
  className?: string;
  showText?: boolean;
}

export default function FavoriteButton({
  recipeId,
  initialIsFavorited = false,
  className = "",
  showText = false
}: FavoriteButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [isLoading, setIsLoading] = useState(false);

  // 当用户登录状态或初始收藏状态变化时更新
  useEffect(() => {
    setIsFavorited(initialIsFavorited);
  }, [initialIsFavorited, session]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!session) {
      router.push("/login?redirect=" + encodeURIComponent(window.location.pathname));
      return;
    }

    setIsLoading(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsFavorited(!isFavorited);
      setIsLoading(false);
    }, 300);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`flex items-center justify-center transition-all duration-200 ${
        isFavorited 
          ? "text-[color:var(--primary)]" 
          : "text-gray-500 hover:text-[color:var(--primary)]"
      } ${className}`}
      aria-label={isFavorited ? "取消收藏" : "收藏"}
    >
      <Bookmark className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} />
      {showText && (
        <span className="ml-1 text-sm">
          {isFavorited ? "已收藏" : "收藏"}
        </span>
      )}
    </button>
  );
}