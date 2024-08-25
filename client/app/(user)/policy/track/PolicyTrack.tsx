"use client";
import { useState } from "react";
import NavbarPink from "@/app/layouts/NavbarPink";
import PolicyTrackCard from "@/components/Policy/PolicyTrackCard";
import Link from "next/link";
import { PolicyTrackProps } from "@/app/interfaces/Props/Policy";

function PolicyTrack({ categories, policies, policyProgress } : PolicyTrackProps) {
  const [policyCount, setPolicyCount] = useState(9);

  const handleShowMore = () => {
    setPolicyCount(policyCount + 3);
  };

  const categoryId = 0;
  return (
    <div className="bg-custom-background pb-5">
      <NavbarPink />
      <section className="bg-custom-section-primary p-10">
        <h1
          className="text-center text-custom-white text-3xl md:text-5xl font-semibold"
          style={{
            textShadow:
              "0 1px 0 var(--color-text-shadow),0 1px 0 var(--color-text-shadow-1),0 3px 0 var(--color-text-shadow-3),0 0 0 var(--color-text-shadow-4),0 1px 0 var(--color-text-shadow-5),0 5px 0 var(--color-text-shadow-6),0 3px 0 var(--color-text-shadow-7),0 0 0 var(--color-text-shadow-8),0 0 2px var(--color-text-shadow-9),0 -1px 5px var(--color-text-shadow-10),0 3px 3px var(--color-text-shadow-11),0 6px 4px var(--color-text-shadow-12),0 8px 8px var(--color-text-shadow-13)",
          }}
        >
          จับตานโยบาย เดินทางไปถึงขั้นตอนไหนแล้ว
        </h1>
      </section>
      <section className="bg-custom-section-secondary">
        <div className="container p-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3">
            <div className="col-span-2 md:col-span-6 order-1">
              <div className="flex items-center justify-between bg-custom-white my-2 p-4 rounded-lg">
                <h4 className="m-0 text-custom-gray font-semibold">
                  นโยบายทั้งหมด
                </h4>
                <div className="text-4xl font-semibold text-custom-primary">
                  {policyProgress.AllPolicy || 0}
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-3 order-2">
              <div className="flex items-center justify-between bg-custom-white my-2 p-4 rounded-lg">
                <h4 className="m-0 text-custom-gray font-semibold">
                  เริ่มนโยบาย
                </h4>
                <div className="text-4xl font-semibold text-custom-secondary-dark">
                  {policyProgress.statusId_1 || 0}
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-3 order-3">
              <div className="flex items-center justify-between bg-custom-white my-2 p-4 rounded-lg">
                <h4 className="m-0 text-custom-gray font-semibold">วางแผน</h4>
                <div className="text-4xl font-semibold text-custom-secondary-dark">
                  {policyProgress.statusId_2 || 0}
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-6 order-1 md:order-4">
              <div className="flex items-center justify-between bg-custom-white my-2 p-4 rounded-lg">
                <h4 className="m-0 text-custom-gray font-semibold">สำเร็จ</h4>
                <div className="text-4xl font-semibold text-[#86c058]">
                  {policyProgress.statusId_6 || 0}
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 order-5">
              <div className="flex items-center justify-between bg-custom-white my-2 p-4 rounded-lg">
                <h4 className="m-0 text-custom-gray font-semibold">
                  ดำเนินการ
                </h4>
                <div className="text-4xl font-semibold text-custom-secondary-dark">
                  {policyProgress.statusId_3 || 0}
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 order-6">
              <div className="flex items-center justify-between bg-custom-white my-2 p-4 rounded-lg">
                <h4 className="m-0 text-custom-gray font-semibold">
                  ตรวจสอบ
                </h4>
                <div className="text-4xl font-semibold text-custom-secondary-dark">
                  {policyProgress.statusId_4 || 0}
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 order-7">
              <div className="flex items-center justify-between bg-custom-white my-2 p-4 rounded-lg">
                <h4 className="m-0 text-custom-gray font-semibold">
                  รออนุมัติ
                </h4>
                <div className="text-4xl font-semibold text-custom-primary">
                  {policyProgress.statusId_5 || 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container px-4 py-8 mx-auto">
          <div>
            <div className="mx-[-1.5rem] overflow-x-auto overflow-y-hidden px-[1.5rem] mb-3">
              <div className="flex gap-4">
                <div>
                  <Link href="/policy/track">
                    <div
                      className={`transition-all rounded-lg duration-300 py-2 px-8 whitespace-nowrap font-medium text-custom-black hover:bg-custom-primary hover:text-custom-white ${
                        categoryId == 0 ? "bg-custom-primary text-custom-white" : "bg-custom-light-2"
                      }`}
                    >
                      ทั้งหมด{" "}
                      {categoryId == 0 ? (
                        <i className="fa-regular fa-circle-check"></i>
                      ) : (
                        <i className="fa-solid fa-plus"></i>
                      )}
                    </div>
                  </Link>
                </div>
                {categories.map((category) => (
                  <div key={category.id}>
                    <Link href={`/policy/track/${category.id}`}>
                      <div
                        className={`transition-all rounded-lg duration-300 py-2 px-8 whitespace-nowrap font-medium text-custom-black hover:bg-custom-primary hover:text-custom-white ${
                          categoryId == category.id
                            ? "bg-custom-primary text-custom-white"
                            : "bg-custom-light-2"
                        }`}
                      >
                        {category.title}{" "}
                        {categoryId == category.id ? (
                          <i className="fa-regular fa-circle-check"></i>
                        ) : (
                          <i className="fa-solid fa-plus"></i>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p>หมวดหมู่นโยบาย</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center justify-center">
            {policies.length > 0
              ? policies.slice(0, policyCount).map((policy) => (
                  <div key={policy.id} className="col-span-1">
                    <PolicyTrackCard policies={policy} />
                  </div>
                ))
              : null}
          </div>
          {policies.length > policyCount && (
            <div className="w-full text-center mt-6">
              <button
                className="transition-all rounded-lg duration-300 py-2 px-8 border border-custom-primary whitespace-nowrap font-medium text-custom-black hover:bg-custom-primary hover:text-custom-white"
                onClick={handleShowMore}
              >
                โหลดเพิ่ม
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default PolicyTrack;
