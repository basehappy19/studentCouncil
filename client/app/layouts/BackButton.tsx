"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";

const BackButton: FC = () => {
  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault();
    router.back();
  };

  return (
    <button
      className="flex text-center justify-center items-center fixed z-50 rounded-[50%] text-2xl text-custom-black w-[50px] h-[50px] align-middle bg-yellow-400 dark:bg-indigo-600 dark:text-white bottom-4 right-4"
      type="button"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l14 0" />
        <path d="M5 12l6 6" />
        <path d="M5 12l6 -6" />
      </svg>
    </button>
  );
};

export default BackButton;
