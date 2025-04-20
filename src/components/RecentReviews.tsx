import Image from "next/image";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    user: {
      name: "李明",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop"
    },
    recipe: "红烧肉",
    rating: 5,
    comment: "按照食谱做出来的红烧肉非常美味，肥而不腻，家人都很喜欢！下次还会再做。",
    date: "2023-06-15"
  },
  {
    id: 2,
    user: {
      name: "王芳",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
    },
    recipe: "意大利面",
    rating: 4,
    comment: "酱料很香，但我个人觉得可以再加点辣椒提味。整体来说还是很不错的！",
    date: "2023-06-10"
  },
  {
    id: 3,
    user: {
      name: "张伟",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop"
    },
    recipe: "寿司拼盘",
    rating: 5,
    comment: "第一次尝试做寿司，按照步骤一步步来，成品出乎意料的好！朋友们都很惊讶。",
    date: "2023-06-05"
  }
];

export default function RecentReviews() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">最新评论</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="card p-6">
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
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>
            <div>
              <p className="font-medium mb-2">评论了 {review.recipe}</p>
              <div className="flex mb-2">
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
              <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}