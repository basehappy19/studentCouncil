import { Category } from "@/app/interfaces/Category/category";
import PolicyCard from "@/components/Policy/PolicyCard";
import Link from "next/link";
import Image from "next/image";
import { AllCategories, getCategory } from "@/app/functions/Category";
import { CheckCircle, PlusCircle } from "lucide-react";
import { AllPolicies } from "@/app/functions/Policy";
import { Policy } from "@/app/interfaces/Policy/Policy";

export async function generateMetadata(props: { params: { slug: string[] } }) {
  const params = await props.params
  const slug = params.slug
  const categoryData: Category = await getCategory(slug.length >= 1 ? slug[0] : undefined);
  const categorySrc = process.env.NEXT_PUBLIC_POLICY_CATEGORY_IMG_PATH || "";
  const policies: Policy[] = await AllPolicies({ category: slug.length >= 1 ? slug[0] : undefined, subCategory: slug.length >= 2 ? slug[1] : undefined });
  
  return {
    title: `นโยบายหมวด${categoryData.title} ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description: `พรรคเราได้คิดนโยบายหมวด ${categoryData.title} ออกมา ${policies.length} นโยบาย`,
    openGraph: {
      title: `นโยบายหมวด${categoryData.title} ${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description: `พรรคเราได้คิดนโยบายหมวด ${categoryData.title} ออกมา ${policies.length} นโยบาย`,
      images: [
        {
          url: `${categorySrc}${categoryData.thumbnailImage}`,
        },
      ],
    },
  };
}

async function PolicyCollection( props : { params: { slug: string[] } }) {
  const params = await props.params
  const slug = params.slug
  const categoryData: Category = await getCategory(slug.length >= 1 ? slug[0] : undefined);
  const categories: Category[] = await AllCategories();
  const policies: Policy[] = await AllPolicies({ category: slug.length >= 1 ? slug[0] : undefined, subCategory: slug.length >= 2 ? slug[1] : undefined });
  const categorySrc =
    process.env.NEXT_PUBLIC_POLICY_CATEGORY_IMG_PATH || "";
  
  return (
    <div className="min-h-screen
        dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
        bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50">
      <section
        className="relative py-12 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-yellow-400/20 to-pink-400/20 backdrop-blur-sm" />

        <div className="relative container mx-auto px-4">
          <div className="w-auto mx-[-1.5rem] overflow-x-auto overflow-y-hidden px-[1.5rem] mb-3">
            <div className="flex gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/policy/collection/${category.id}`}
                >
                  <div
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300
                    hover:shadow-md hover:-translate-y-1 hover:text-white
                    ${Number(slug[0]) === category.id
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                        : "bg-white dark:bg-gray-800 dark:text-white hover:bg-blue-500 dark:hover:bg-blue-500"
                      }`}
                  >
                    {category.title}{" "}
                    {Number(slug[0]) === category.id ? (
                      <CheckCircle className="w-4 h-4 inline-flex" />
                    ) : (
                      <PlusCircle className="w-4 h-4 inline-flex" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between md:flex-row items-center">
            <h1 className="text-center text-5xl md:text-7xl font-bold w-full md:w-1/2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-yellow-500 to-pink-500">
                {categoryData.title}
              </span>
            </h1>
            <div className="w-full md:w-1/2">
              <Image
                className="w-full h-full min-h-[250px] max-h-[250px] rounded-lg object-cover"
                width={900}
                height={750}
                src={categorySrc + categoryData.thumbnailImage}
                alt={categoryData.title}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-12">
        <div className="relative container mx-auto px-4">
          <div className="absolute inset-y-0 left-0 w-1 bg-blue-400 dark:bg-white pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1 bg-blue-400 dark:bg-white pointer-events-none" />

          
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4">
              <Link href={`/policy/collection/${categoryData.id}`}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300
                hover:shadow-md hover:-translate-y-1 hover:text-white
                ${slug.length !== 2
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white dark:bg-gray-800 dark:text-white hover:bg-blue-500 dark:hover:bg-blue-500"
                  }`}
              >
                ทั้งหมด{" "}
                {Number(slug.length === 1) ? (
                  <CheckCircle className="w-4 h-4 inline-flex" />
                ) : (
                  <PlusCircle className="w-4 h-4 inline-flex" />
                )}
              </Link>
              {categoryData.subCategories.map(
                (subCategory) =>
                  <Link
                    key={subCategory.id}
                    href={`/policy/collection/${categoryData.id}/${subCategory.id}`}
                  >
                    <div
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300
                hover:shadow-md hover:-translate-y-1 hover:text-white
                      ${Number(slug[1]) === subCategory.id
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                          : "bg-white dark:bg-gray-800 dark:text-white hover:bg-blue-500 dark:hover:bg-blue-500"
                        }`}
                    >
                      {subCategory.title}{" "}
                      {Number(slug[1]) === subCategory.id ? (
                        <CheckCircle className="w-4 h-4 inline-flex" />
                      ) : (
                        <PlusCircle className="w-4 h-4 inline-flex" />
                      )}
                    </div>
                  </Link>

              )}
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-100 my-3 font-medium">หมวดหมู่เพิ่มเติม</p>
        <div className="grid grid-cols-1 items-center justify-center">
          {policies.map((policy) => (
            <div className="col-span-1" key={policy.id}>
              <PolicyCard policy={policy} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PolicyCollection;
