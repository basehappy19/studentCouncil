import { AllBudget } from "@/app/functions/Budget";
import { BudgetData } from "@/app/interfaces/Budget/Budget";
import NavbarPink from "@/app/layouts/NavbarPink";
import Link from "next/link";

export const metadata = {
  title: `ติดตามงบประมาณ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description:
    "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามงบประมาณเราได้ที่นี้",
  openGraph: {
    title: `ติดตามงบประมาณ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามงบประมาณเราได้ที่นี้",
  },
};

async function getBudget(): Promise<BudgetData[]> {
  const response = AllBudget();
  return response;
}

async function page() {
  const budget: BudgetData[] = await getBudget();
  return (
    <div className="bg-custom-background">
      <NavbarPink />
      <section className="bg-custom-section-primary p-10">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-[600px] mx-auto">
            <div className="text-start">
              <h1
                style={{
                  textShadow:
                    "0 1px 0 var(--color-text-shadow),0 1px 0 var(--color-text-shadow-1),0 3px 0 var(--color-text-shadow-3),0 0 0 var(--color-text-shadow-4),0 1px 0 var(--color-text-shadow-5),0 5px 0 var(--color-text-shadow-6),0 3px 0 var(--color-text-shadow-7),0 0 0 var(--color-text-shadow-8),0 0 2px var(--color-text-shadow-9),0 -1px 5px var(--color-text-shadow-10),0 3px 3px var(--color-text-shadow-11),0 6px 4px var(--color-text-shadow-12),0 8px 8px var(--color-text-shadow-13)",
                }}
                className="text-custom-white text-5xl w-full font-semibold"
              >
                ติดตามงบประมาณ
              </h1>
            </div>
            <div className="text-end">
              <h1
                style={{
                  textShadow:
                    "0 1px 0 var(--color-text-shadow),0 1px 0 var(--color-text-shadow-1),0 3px 0 var(--color-text-shadow-3),0 0 0 var(--color-text-shadow-4),0 1px 0 var(--color-text-shadow-5),0 5px 0 var(--color-text-shadow-6),0 3px 0 var(--color-text-shadow-7),0 0 0 var(--color-text-shadow-8),0 0 2px var(--color-text-shadow-9),0 -1px 5px var(--color-text-shadow-10),0 3px 3px var(--color-text-shadow-11),0 6px 4px var(--color-text-shadow-12),0 8px 8px var(--color-text-shadow-13)",
                }}
                className="text-custom-white text-5xl w-full font-semibold"
              >
                ฝ่ายการทำงาน
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section className="p-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 flex-col md:flex-row gap-3">
            {budget.map((item) => (
              <div key={item.id}>
                <Link href={`/budget/${item.id}`}>
                  <div
                    className={`flex items-center justify-center transition-all duration-300 hover:drop-shadow-lg py-5`}
                    style={{ backgroundColor: item.budgetColor }}
                  >
                    <div className="font-semibold leading-[1.1]">
                      <div className={`text-custom-white text-5xl`}>
                        {item.budgetTitle}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
