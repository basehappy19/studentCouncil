import { RecommendPolicies } from "@/app/functions/Policy"
import { Policy } from "@/app/interfaces/Policy/Policy"
import { Category } from "@/app/interfaces/Category/category"
import CategoryCard from "@/components/Policy/CategoryCard"
import type { Metadata } from "next"
import { AllCategories } from "@/app/functions/Category"
import TagInHeader from "@/app/layouts/TagInHeader"
import RecommendPolicy from "./RecommendPolicy"
import { Bookmark, Layout } from "lucide-react"

export const metadata: Metadata = {
  title: `หมวดนโยบาย ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description: "พรรคเราได้คิดหมวดนโยบายออกมาเพิ่มพัฒนาในหลายด้าน หลายมุมภายในโรงเรียน",
  openGraph: {
    title: `หมวดนโยบาย ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description: "พรรคเราได้คิดหมวดนโยบายออกมาเพิ่มพัฒนาในหลายด้าน หลายมุมภายในโรงเรียน",
  },
}

async function PolicyCategories() {

  const policies: Policy[] = await RecommendPolicies()
  const categories: Category[] = await AllCategories()

  return (
    <div className={`min-h-screen
        dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
        bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-yellow-400/20 to-pink-400/20 backdrop-blur-sm" />
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <TagInHeader icon="Sparkles" color="text-yellow-400" title="นโยบายทั้งหมด" />

            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-clip-text text-transparent bg-pink-400 dark:bg-pink-500">
                นโยบายทั้งหมด
              </span>
            </h1>

            <p className={`text-xl md:text-2xl dark:text-gray-300 text-gray-600`}>
              4 ด้าน 4 มุม
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Bookmark className={`w-6 h-6 dark:text-pink-400 text-pink-600`} />
          <h2 className={`text-2xl font-semibold dark:text-gray-200 text-gray-800`}>
            นโยบายที่คุณอาจสนใจ
          </h2>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-1 bg-pink-400 dark:bg-white pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1 bg-pink-400 dark:bg-white pointer-events-none" />
          
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-center flex-row px-4 gap-4">
              {policies.map((policy) => (
                <RecommendPolicy key={policy.id} policy={policy} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-12">
          <Layout className={`w-6 h-6 dark:text-pink-400 text-pink-600`} />
          <h2 className={`text-2xl font-semibold dark:text-gray-200 text-gray-800`}>
            หมวดนโยบาย
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div key={category.id}>
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </section>

      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl -z-10" />
      <div className="fixed top-1/2 right-0 w-[600px] h-[600px] bg-pink-400/10 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-0 left-1/3 w-[550px] h-[550px] bg-yellow-400/10 rounded-full blur-3xl -z-10" />
    </div>
  )
}

export default PolicyCategories