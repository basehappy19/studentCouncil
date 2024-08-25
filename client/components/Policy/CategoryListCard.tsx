import { FC } from "react";
import Link  from "next/link";
import Image from "next/image";
import { CategoryListCardProps } from "@/app/interfaces/Props/Category";

const CategoryListCard : FC<CategoryListCardProps> = ({ category,imgSrc }) => {
  return (
    <div>
      <Link href={`/policy/category/${category.id}`}>
      <div className="transition-all ease-in-out hover:scale-105 hover:drop-shadow-lg duration-300 rounded-lg mb-2">
        <div className="relative">
          <Image
            src={imgSrc+category.image}
            alt=""
            width={1200}
            height={500}
            className="w-full h-full min-h-[350px] max-h-[350px] object-cover rounded-t-lg"
          />
          <div className="absolute rounded-t-lg bottom-0 bg-[#0000001f] text-custom-white w-full h-[350px] transition-all duration-500 ease-in-out text-xl p-7 text-center"></div>
          <div className="absolute bottom-0 h-[75px] backdrop-blur-sm bg-[#0000001a] text-custom-white w-full transition-all duration-500 ease-in-out text-xl p-7 text-center"></div>
          <div
            className="text-custom-white absolute drop-shadow-lg h-full max-h-[40px] text-[2rem] font-semibold bottom-5 left-7"
          >
            {category.title}
          </div>
        </div>

        <div>
          <Link href={`/policy/category/${category.id}`}>
            <button
              className="w-full py-2.5 text-lg font-medium px-2.5 text-custom-white bg-custom-btn-secondary rounded-b-lg p-3"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)" }}
            >
              ดูนโยบาย {'>'}
            </button>
          </Link>
        </div>
      </div>
    </Link>
    </div>
  );
}

export default CategoryListCard;
