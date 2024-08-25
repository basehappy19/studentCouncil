"use client";
import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { PolicyListCardProps } from "@/app/interfaces/Props/Policy";

const PolicyListCard: FC<PolicyListCardProps> = ({
  policies,
  policySrc,
  categoryData,
  categoryIconSrc,
  subcategoryIconSrc,
}) => {
  return (
    <div>
      <Link href={`/policy/detail/${policies.id}`}>
        <div className="flex flex-col-reverse md:flex-row p-8 bg-custom-card rounded-lg border border-custom-light-2 my-2.5 items-center transition-all hover:scale-105 hover:drop-shadow-lg ease-in">
          <div className="order-1">
            <Image
              width={500}
              height={500}
              src={policySrc + policies.image}
              alt={policies.title}
              className="object-cover h-full rounded-lg max-w-full max-h-[150px] md:max-w-[200px] md:min-h-[200px]"
            />
          </div>
          <div className="w-full my-0 mx-12 order-2">
            <h1 className="font-semibold text-black2 text-4xl">{policies.title}</h1>
            <div className="flex flex-wrap my-4 mx-0 md:my-0 text-custom-dark font-medium">
              <div className="flex items-center mr-2 gap-1">
                <Image
                  width={50}
                  height={50}
                  src={categoryIconSrc + categoryData.icon}
                  className="min-w-4 min-h-4 w-4 h-4"
                  alt={categoryData.icon}
                />
                {categoryData.title}
              </div>
              {policies.subCategories.map(
                (policy) =>
                  policy.id !== 0 && (
                    <div
                      key={policy.id}
                      className="flex items-center mr-2 gap-1"
                    >
                      <Image
                        width={50}
                        height={50}
                        src={subcategoryIconSrc + policy.icon}
                        className="min-w-4 min-h-4 w-4 h-4"
                        alt={policy.icon}
                      />
                      {policy.title}
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="w-full md:w-auto md:block text-start md:text-end mb-5 order-3">
            <span className="text-custom-primary-dark">{policies.numberTag}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PolicyListCard;
