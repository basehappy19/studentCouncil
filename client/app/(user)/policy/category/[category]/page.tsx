import { PolicyFilter as PolicyFilterFetch } from "@/app/functions/Policy";
import { PolicyCategories, AllPolicyCategory } from "@/app/functions/Category";
import { CategoryData, Categories } from "@/app/interfaces/Category/category";
import { PolicyFilter } from "@/app/interfaces/Policy/policies";
import NavbarPink from "@/app/layouts/NavbarPink";
import PolicyListCard from "@/components/Policy/PolicyListCard";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const categoryId = category;
  const subCategory = "0";
  const categoryData: CategoryData = await getPolicyCategories(categoryId);
  const categorySrc =
    process.env.NEXT_PUBLIC_APP_POLICIES_CATEGORIES_IMG_PATH_SERVER || "";
  const policies: PolicyFilter[] = await getPolicyFilterFetch(
    category,
    subCategory
  );
  
  if (categoryData.length === 0) {
    return {
      title: `หมวดนโยบาย${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description: `ไม่มีข้อมูลหมวดนโยบายที่คุณค้นหา`,
    };
  }

  return {
    title: `นโยบายหมวด${categoryData.title} ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description: `พรรคเราได้คิดนโยบายหมวด ${categoryData.title} ออกมา ${policies.length} นโยบาย`,
    openGraph: {
      title: `นโยบายหมวด${categoryData.title} ${process.env.APP_TITLE}`,
      description: `พรรคเราได้คิดนโยบายหมวด ${categoryData.title} ออกมา ${policies.length} นโยบาย`,
      images: [
        {
          url: `${categorySrc}${categoryData.image}`,
        },
      ],
    },
  };
}

async function page({ params }: { params: { category: string } }) {
  const { category } = params;
  const categoryId = parseInt(category);
  const subCategoryId = 0;
  const categories: Categories[] = await getCategories(); // All Categories
  const categoryData: CategoryData = await getPolicyCategories(category); // Only One Category
  const policies: PolicyFilter[] = await getPolicyFilterSubCategory(
    category,
    subCategoryId
  );
  const categorySrc =
    process.env.NEXT_PUBLIC_APP_POLICIES_CATEGORIES_IMG_PATH_SERVER || "";
  const policySrc = process.env.NEXT_PUBLIC_APP_POLICIES_IMG_PATH_SERVER || "";
  const subcategoryIconSrc =
    process.env.NEXT_PUBLIC_APP_POLICIES_ICON_PATH_SERVER || "";
  const categoryIconSrc =
    process.env.NEXT_PUBLIC_APP_POLICIES_CATEGORIES_ICON_PATH_SERVER || "";
  
  return (
    <div className="bg-custom-background pb-5">
      <NavbarPink />
      <section
        className="bg-custom-gradient-main p-10"
        style={{
          background: `linear-gradient(-302deg,var(--color-gradient-1) 0%,var(--color-gradient-2) 15%,var(--color-gradient-3) 61%,var(--color-gradient-4) 100%)`,
        }}
      >
        <div className="container px-4 mx-auto">
          <div className="w-auto mx-[-1.5rem] overflow-x-auto overflow-y-hidden px-[1.5rem] mb-3">
            <div className="flex gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/policy/category/${category.id}`}
                >
                  <div
                    className={`transition-all rounded-lg duration-300 py-2 px-8 whitespace-nowrap font-medium text-custom-black hover:bg-custom-primary hover:text-custom-white ${
                      categoryId === category.id
                        ? "bg-custom-primary text-custom-white"
                        : "bg-custom-light-2"
                    }`}
                  >
                    {category.title}{" "}
                    {categoryId === category.id ? (
                      <i className="fa-regular fa-circle-check"></i>
                    ) : (
                      <i className="fa-solid fa-plus"></i>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2">
              <div className="text-center drop-shadow-md">
                <h1 className="text-custom-white text-7xl">
                  {categoryData?.title}
                </h1>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div>
                <Image
                  className="w-full h-full min-h-[250px] max-h-[250px] rounded-lg object-cover"
                  width={900}
                  height={750}
                  src={categorySrc + categoryData.image}
                  alt={categoryData.title}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-10 container mx-auto px-4">
        <div className="w-auto mx-[-1.5rem] overflow-x-auto overflow-y-hidden px-[1.5rem] mb-3">
          <div className="flex gap-4">
            <div
              className={`transition-all rounded-lg duration-300 py-2 px-8 whitespace-nowrap font-medium text-custom-black hover:bg-custom-primary hover:text-custom-white ${
                subCategoryId == 0 ? "bg-custom-primary text-custom-white" : "bg-custom-light-2"
              }`}
            >
              ทั้งหมด{" "}
              {subCategoryId == 0 ? (
                <i className="fa-regular fa-circle-check"></i>
              ) : (
                <i className="fa-solid fa-plus"></i>
              )}
            </div>
            {categoryData?.subCategories.map(
              (subCategory) =>
                subCategory.id !== 0 && (
                  <Link
                    key={subCategory.id}
                    href={`/policy/category/${categoryData.id}/${subCategory.id}`}
                  >
                    <div
                      className={`transition-all rounded-lg duration-300 py-2 px-8 whitespace-nowrap font-medium text-custom-black hover:bg-custom-primary hover:text-custom-white ${
                        subCategoryId == subCategory.id
                          ? "bg-custom-primary text-custom-white"
                          : "bg-custom-light-2"
                      }`}
                    >
                      {subCategory.title}{" "}
                      {subCategoryId == subCategory.id ? (
                        <i className="fa-regular fa-circle-check"></i>
                      ) : (
                        <i className="fa-solid fa-plus"></i>
                      )}
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
        <div>
          <p>หมวดหมู่เพิ่มเติม</p>
        </div>
        <div className="grid grid-cols-1 items-center justify-center">
          {policies.map((policy) => (
            <div className="col-span-1" key={policy.id}>
              <PolicyListCard
                policies={policy}
                policySrc={policySrc}
                categoryData={categoryData}
                categoryIconSrc={categoryIconSrc}
                subcategoryIconSrc={subcategoryIconSrc}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

async function getCategories(): Promise<Categories[]> {
  const response = await AllPolicyCategory();
  return response;
}

async function getPolicyCategories(category: string): Promise<CategoryData> {
  const response = await PolicyCategories(category);
  return response;
}

async function getPolicyFilterFetch(
  category: string,
  subCategory: string
): Promise<PolicyFilter[]> {
  const response = await PolicyFilterFetch(category, subCategory);
  return response;
}

export default page;
