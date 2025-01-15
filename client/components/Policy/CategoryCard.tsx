'use client'
import Image from "next/image"
import { Category } from "@/app/interfaces/Category/category"
import { useRouter } from "next/navigation"
import { ArrowRight, Sparkles } from "lucide-react"

const CategoryCard = ({ category }: { category: Category }) => {
  const imgSrc = process.env.NEXT_PUBLIC_POLICY_CATEGORY_IMG_PATH || ""
  const router = useRouter()


  return (
    <div
      onClick={() => router.push(`/policy/collection/${category.id}`)}
      className="group cursor-pointer"
    >
      <div className={`
        relative overflow-hidden rounded-xl
        transition-all duration-500 ease-out
        dark:bg-slate-800 bg-white
        transform hover:-translate-y-1
      `}>
        <div className="relative">
          <Image
            src={imgSrc + category.thumbnailImage}
            alt={category.title}
            width={1200}
            height={500}
            className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
          />

          {/* Gradient Overlay */}
          <div className={`
        absolute inset-0 
        bg-gradient-to-b
        from-transparent
        via-[rgba(0,0,0,0.5)]
        to-[rgba(0,0,0,0.8)]
        opacity-90
        group-hover:opacity-60 transition-opacity duration-300
      `} />

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-pink-400 opacity-20 rounded-full blur-xl group-hover:opacity-60 transition-opacity" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-yellow-300 opacity-20 rounded-full blur-xl group-hover:opacity-60 transition-opacity" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 w-full p-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className={`
          text-sm font-medium text-white dark:text-gray-200
        `}>
              นโยบายสำคัญ
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
            {category.title}
          </h3>

          <button
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/policy/collection/${category.id}`)
            }}
            className={`
          w-full py-3 px-4 rounded-lg
          flex items-center justify-center gap-2
          font-medium text-base
          transition-all duration-300
          dark:bg-pink-500 dark:hover:bg-pink-400 dark:text-white dark:bg-none
          bg-pink-400 text-white hover:opacity-90
        `}
          >
            ดูนโยบายทั้งหมด
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard