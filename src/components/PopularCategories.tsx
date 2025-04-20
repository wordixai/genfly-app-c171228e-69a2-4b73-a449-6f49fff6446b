import Image from "next/image";
import Link from "next/link";

const categories = [
  { id: 1, name: "中式料理", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1974&auto=format&fit=crop" },
  { id: 2, name: "西式料理", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop" },
  { id: 3, name: "日式料理", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop" },
  { id: 4, name: "甜点饮品", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1964&auto=format&fit=crop" },
];

export default function PopularCategories() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">热门分类</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.id}`} className="group">
            <div className="card group-hover:scale-105 transition-transform duration-300">
              <div className="relative h-48 w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">{category.name}</h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}