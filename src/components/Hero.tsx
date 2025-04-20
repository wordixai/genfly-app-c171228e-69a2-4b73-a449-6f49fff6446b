import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative h-[70vh] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
          alt="美食展示"
          fill
          priority
          className="object-cover brightness-50"
        />
      </div>
      <div className="container relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">探索美食世界</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          发现最美味的食谱，分享您的烹饪体验，与美食爱好者交流
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/recipes" className="btn btn-primary">
            浏览食谱
          </Link>
          <Link href="/login" className="btn btn-outline text-white border-white">
            登录分享
          </Link>
        </div>
      </div>
    </div>
  );
}