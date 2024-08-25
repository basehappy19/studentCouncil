import { AllPolicyCategory } from "@/app/functions/Category";
import { AllPolicy } from "@/app/functions/Policy";
import { Policies } from "@/app/interfaces/Policy/policies";
import { CategoryData } from "@/app/interfaces/Category/category";
import CategoryListCard from "@/components/Policy/CategoryListCard";
import NavbarPink from "@/app/layouts/NavbarPink";
import Link from "next/link";

export const metadata = {
  title: `หมวดนโยบาย ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description:
    "พรรคเราได้คิดหมวดนโยบายออกมาเพิ่มพัฒนาในหลายด้าน หลายมุมภายในโรงเรียน",
  openGraph: {
    title: `หมวดนโยบาย ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "พรรคเราได้คิดหมวดนโยบายออกมาเพิ่มพัฒนาในหลายด้าน หลายมุมภายในโรงเรียน",
  },
};

async function getAllPolicy(): Promise<Policies[]> {
  const response = await AllPolicy();
  return response;
}

async function getCategoryList(): Promise<CategoryData[]> {
  const response = await AllPolicyCategory();
  return response;
}

async function page() {
  const policies: Policies[] = await getAllPolicy();
  const categories: CategoryData[] = await getCategoryList();
  const imgSrc =
    process.env.NEXT_PUBLIC_APP_POLICIES_CATEGORIES_IMG_PATH_SERVER || "";
  const shuffledPolicies: Policies[] = policies.sort(() => Math.random() - 0.5);
  return (
    <>
      <div className="bg-custom-background pb-5">
        <NavbarPink />
        <section className="bg-custom-section-primary p-10">
          <div className="w-full max-w-[600px] mx-auto">
            <h1
              className="text-center text-custom-white text-5xl font-semibold w-full"
              style={{
                textShadow:
                  "0 1px 0 var(--color-text-shadow),0 1px 0 var(--color-text-shadow-1),0 3px 0 var(--color-text-shadow-3),0 0 0 var(--color-text-shadow-4),0 1px 0 var(--color-text-shadow-5),0 5px 0 var(--color-text-shadow-6),0 3px 0 var(--color-text-shadow-7),0 0 0 var(--color-text-shadow-8),0 0 2px var(--color-text-shadow-9),0 -1px 5px var(--color-text-shadow-10),0 3px 3px var(--color-text-shadow-11),0 6px 4px var(--color-text-shadow-12),0 8px 8px var(--color-text-shadow-13)",
              }}
            >
              นโยบายทั้งหมด ({policies.length})
            </h1>
            {/* <div className="search-box">
              <Search style={{ width: "250px", margin: "0 auto" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="ค้นหานโยบาย…"
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={(e) => handleSearch(e)}
              />
            </Search>
            <div className="result-search">
              {policies
                .filter((policy) =>
                  policy.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((filteredPolicy) => (
                  <div key={filteredPolicy._id} className="result-item">
                    {filteredPolicy.title}
                  </div>
                ))}
            </div>
            </div> */}
          </div>
        </section>
        <section className="container mx-auto pt-10 px-4">
          <div className="mx-[-1.5rem] overflow-x-auto overflow-y-hidden px-[1.5rem] mb-3">
            <div className="flex gap-4">
              {shuffledPolicies.map((policy) => (
                <Link
                  className="whitespace-nowrap transition duration-300 hover:bg-custom-primary text-custom-black bg-none border border-custom-primary rounded-xl mr-2 py-2 px-8"
                  key={policy.idQuery}
                  href={`/policy/detail/${policy.idQuery}`}
                >
                  <div>{policy.title}</div>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xl font-medium text-custom-gray-4">นโยบายที่คุณอาจสนใจ</p>
          </div>
          <div>
            <p className="text-center text-3xl font-medium text-custom-gray-4">หมวดนโยบาย</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
            {categories.map((category) => (
              <div key={category.idQuery} className="col-span-2 sm:col-span-1 lg:col-span-1">
                <CategoryListCard category={category} imgSrc={imgSrc} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default page;
