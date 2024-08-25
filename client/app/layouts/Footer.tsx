import Link from "next/link";
import { FC } from "react";
import { Menu } from "./Menu";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignOut from "../../components/Other/SignOut";

const Footer: FC = async () => {
  const session = await getServerSession(authOptions)
  
  return (
    <div id="Footer" className="text-center border-t border-custom-light-2">
      <section className="flex justify-center container px-4 mx-auto lg:justify-between p-4 border-b border-[#dee2e6]">
        <div className="me-5 hidden lg:block">
          <span>ติดต่อเรา</span>
        </div>
        <div>
          <Link href="" target="_blank" className="text-[#4d6ec1] p-2">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link href="" target="_blank" className="text-[#c83388] p-2">
            <i className="fa-brands fa-instagram"></i>
          </Link>
        </div>
      </section>
      <section>
        <div className="container px-4 mx-auto text-start md:tx-text-center mt-2">
          <div className="flex flex-col md:flex-row justify-center md:justify-between mt-3">
            <div className="text-center md:text-start w-full md:w-1/2 mx-auto mb-4">
              <h6 className="mb-4">พรรค</h6>
              <p>
                เจ้าของโรงเรียนคือนักเรียนทุกคน
                พรรคเราจึงตั้งใจผลักดันสภาโปร่งใส แก้ทุกปัญหาที่สะสม
                มุ่งเน้นสร้างสิ่งใหม่ เข้าถึงง่าย ผลักดันทุกนโยบาย
              </p>
            </div>
            <div className="text-center md:text-end w-full md:w-1/2 mb-8">
              <h6 className="mb-4">เมนู</h6>
              <ul className="m-0 p-0">
                {Menu.map((me, index) => (
                  <li key={index}>
                    <Link href={me.path} className="transition-all no-underline hover:text-custom-primary text-custom-gray">
                      {me.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-center text-center p-3 bg-[#0000000d]">
          © { new Date().getFullYear() + 543 } พรรค
          {!session ? (
            <div>
              <Link href="/login" className="font-semibold cursor-pointer text-custom-primary">
                Login
              </Link>
            </div>
          ) : (
            <div className="flex gap-x-3">
              <Link href="/dashboard" className="cursor-pointer text-custom-primary-dark">
                เข้าหลังบ้าน
              </Link>
              <span>{session?.user?.displayName}</span>
              <SignOut />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Footer;
