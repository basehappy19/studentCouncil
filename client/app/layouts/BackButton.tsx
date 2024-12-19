"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { ArrowBigLeftIcon } from "lucide-react";

const BackButton: FC = () => {
  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault();
    router.back();
  };

  return (
    <button
      className="flex text-center justify-center items-center fixed z-50 rounded-[50%] text-2xl text-custom-black w-[50px] h-[50px] align-middle bg-yellow-400 dark:bg-indigo-600 dark:text-white bottom-8 right-8"
      type="button"
      onClick={handleClick}
    >
      <ArrowBigLeftIcon />
    </button>
  );
};

export default BackButton;
