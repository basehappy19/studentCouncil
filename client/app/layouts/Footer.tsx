import Link from "next/link";
import { Menu } from "./Menu";
import SignOut from "@/components/SignOutButton";
import { ChevronRight, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { UserData } from "../interfaces/Auth/User";
import { getUserData } from "../functions/Auth";

const Footer = async () => {
  const user: UserData | null = await getUserData()

  return (
    <footer className="text-gray-700 bg-none bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:text-gray-200">
      <div className="container mx-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <p className="hidden text-lg font-medium lg:block">
            ติดตามเราผ่านช่องทางโซเชียล
          </p>
          <div className="flex items-center gap-4">
            <a
              href={`https://www.instagram.com/student.ownschool/`}
              target="_blank"
              className="transition-transform hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-pink-400 dark:hover:text-pink-300 hover:text-pink-500 inline-flex icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
              Student Own School
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              พรรคของนักเรียน |
              เพื่อนักเรียน |
              เพราะนักเรียนเป็นเจ้าของโรงเรียน
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">เมนูหลัก</h3>
            <nav>
              <ul className="grid grid-cols-2 gap-2">
                {Menu.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.path}
                      className="group flex items-center gap-1 text-gray-600 dark:text-gray-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-400 dark:border-gray-700 bg-blue-400/50 dark:bg-gray-900/50 p-6 backdrop-blur-sm md:flex-row">
          <p>© {new Date().getFullYear() + 543} Student Own School - สงวนลิขสิทธิ์</p>

          {!user ? (
            <Link
              href="/auth"
              className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              <User className="h-4 w-4" />
              เข้าสู่ระบบ
            </Link>
          ) : (
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {user.data?.displayName}
              </span>
              <Separator orientation="vertical" className="h-4 bg-gray-700" />
              <Link
                href="/dashboard/home"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                เข้าหลังบ้าน
              </Link>
              <SignOut />
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;