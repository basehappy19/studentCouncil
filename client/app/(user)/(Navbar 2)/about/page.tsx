import { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  Users,
  CheckCircle,
  ActivityIcon,
  DollarSignIcon,
  VoteIcon
} from "lucide-react";

export const metadata: Metadata = {
  title: `เกี่ยวกับ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description:
    "ทุกคนสามารถติดตามการทำงาน นโยบาย สภานักเรียน งบประมาณ หรือแม้กระทั่งมติที่ประชุมได้ที่นี้",
  openGraph: {
    title: `เกี่ยวกับ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "ทุกคนสามารถติดตามการทำงาน นโยบาย สภานักเรียน งบประมาณ หรือแม้กระทั่งมติที่ประชุมได้ที่นี้",
  },
  keywords: [
    "Student Own School",
    "เพราะนักเรียนเป็นเจ้าของโรงเรียน",
    "ติดตามนโยบาย",
    "ความคืบหน้านโยบาย",
    "หมวดหมู่นโยบาย",
    "สถานะนโยบาย",
    "นโยบายสภานักเรียน",
    "การอัปเดตนโยบาย",
    "การตรวจสอบนโยบาย",
    "สถิตินโยบาย",
    "สภานักเรียนโปร่งใส",
    "สภาโปร่งใส",
    "สภานักเรียน",
    "นักเรียน",
    "นโยบาย",
    "งบประมาณ",
    "มติ",
    "โรงเรียนภูเขียว"
  ],
};

const SectionCard = ({
  icon: Icon,
  title,
  description,
  linkText,
  linkHref,
}: {
  icon: React.ElementType,
  title: string,
  description: string[],
  linkText: string,
  linkHref: string,
}) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl border border-gray-100 dark:border-slate-700">
    <Link href={linkHref}>
      <div className="flex flex-col items-center text-center space-y-4">
        <Icon className="w-16 h-16 text-custom-primary-dark dark:text-custom-primary-light" />
        <h2 className="text-2xl font-bold text-custom-black dark:text-blue-600 text-blue-400">{title}</h2>
        <div className="text-gray-700 dark:text-gray-300">
          {description.map((line, index) => (
            <p key={index} className="mb-2">{line}</p>
          ))}
        </div>
        <div
          className="mt-4 px-6 py-2 
          bg-custom-primary-dark dark:bg-custom-primary-light 
          dark:text-white text-slate-900 
          rounded-full 
          hover:bg-custom-primary dark:hover:bg-opacity-80 
          transition-colors"
        >
          {linkText} →
        </div>
      </div>
    </Link>
  </div>
);

function About() {
  const sections = [
    {
      icon: Search,
      title: "สภาโปร่งใส คืออะไร",
      description: [
        "ทุกการเลือกตั้งปี 64 ถึง 67",
        "เราใช้สิทธิ์เลือกพรรคที่ชอบ แต่หลังจากนั้น สภานักเรียนทำอะไรไปบ้าง",
        "ผลักดันนโยบายอะไรไปแล้วบ้าง คงเป็นคำถามที่ตอบยาก",
        "มาร่วมสร้างสภานักเรียนโปร่งใส ที่เห็นผลการทำงานชัดเจน",
        "ด้วย 5 เสาหลัก ยกระดับมาตรฐานสภานักเรียนไทย"
      ],
      linkText: "ดูนโยบาย",
      linkHref: "/policies",
      bgColor: "bg-white"
    },
    {
      icon: CheckCircle,
      title: "ขายคุณภาพชีวิต ไม่ได้ขายฝัน",
      description: [
        "พรรคเราตั้งใจคิดนโยบายไม่ว่าจะเกี่ยวกับ",
        "กิจกรรม การศึกษา คุณภาพชีวิต การศึกษานอกห้องเรียน",
        "ทุกนโยบายมีหลักคิด 3 ประการ:",
        "• ปัญหาที่ต้องการแก้ไข",
        "• ข้อเสนอทำยังไง ไม่ใช่มีนโยบายอะไรบ้าง",
        "• งบประมาณ ต้องใช้เงินไหม ใช้ยังไง เอาเงินมาจากไหน"
      ],
      linkText: "ดูนโยบายพรรค",
      linkHref: "/policies",
      bgColor: "bg-white"
    },
    {
      icon: ActivityIcon,
      title: "ติดตามความคืบหน้านโยบาย",
      description: [
        "เมื่อมีนโยบายที่ดีแล้ว ก็ต้องมีความคืบหน้าที่ดีด้วย",
        "นักเรียนทุกคน เจ้าของโรงเรียนทุกคน",
        "ก็ย่อมที่มีสิทธิ์ในการตรวจสอบ ผู้แทนนักเรียนของตัวเอง",
        "พรรคเราจะเปิดเผยความคืบหน้านโยบาย",
        "ที่เคยให้คำสัญญากับนักเรียนทุกคน"
      ],
      linkText: "จับตาความคืบหน้า",
      linkHref: "/policy/watch",
      bgColor: "bg-white"
    },
    {
      icon: Users,
      title: "ทำความรู้จักสมาชิกพรรค",
      description: [
        "เราจะเปิดเผย ความสามารถส่วนบุคคล ประสบการณ์ ทัศนคติ",
        "ติดตามจุดยืน การลงมติประเด็นต่าง ๆ ในโรงเรียน",
        "และยังสามารถติดตามการเข้าทำงานของคน ๆ นั้น",
        "ได้อีกด้วย มีผลงานอะไรบ้างทั้งวาระการทำงาน"
      ],
      linkText: "ทำความรู้จักสมาชิก",
      linkHref: "/partyLists",
      bgColor: "bg-white"
    },
    {
      icon: DollarSignIcon,
      title: "เปิดเผยงบประมาณ",
      description: [
        "เราจะเปิดเผย งบประมาณการเงินทุกฝ่าย",
        "เพื่อยกระดับความโปร่งใส และให้นักเรียนติดตาม",
        "รายรับ รายจ่ายของฝ่ายต่าง ๆ ได้อีกด้วย",
        "และทุกคนยังสามารถเสนองบประมาณ",
        "ให้พี่ๆ สภานักเรียนนำงบมาเพิ่มเติม"
      ],
      linkText: "ดูงบประมาณ",
      linkHref: "/budgets",
      bgColor: "bg-white"
    },
    {
      icon: VoteIcon,
      title: "โหวตอะไรไป รู้หมดนะ",
      description: [
        "เราจะเปิดให้นักเรียนสามารถติดตามการประชุม",
        "การลงมติประเด็นต่าง ๆ ได้ทั้งหมด และยังสามารถรู้จุดยืน",
        "ของสมาชิกได้ทุกคนว่ามีจุดยืนต่อประเด็นที่ประชุมยังไง",
        "เห็นด้วย ไม่เห็นด้วย เปิดเผยข้อมูลทั้งหมด"
      ],
      linkText: "ติดตามการลงมติ",
      linkHref: "/votes",
      bgColor: "bg-white"
    }
  ];
  return (
    <div className="min-h-screen 
      bg-gradient-to-br 
      from-blue-50 via-yellow-50 to-pink-50
      dark:bg-gradient-to-br 
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
      text-gray-800 dark:text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="
            text-4xl font-bold 
            text-custom-primary-dark 
            dark:text-custom-primary-light 
            mb-4"
          >
            สภานักเรียนโปร่งใส
          </h1>
          <p className="
            text-xl 
            text-gray-600 dark:text-gray-300 
            max-w-2xl mx-auto"
          >
            เราเชื่อว่าความโปร่งใสและการมีส่วนร่วมคือหัวใจของการทำงานเพื่อนักเรียน
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <SectionCard key={index} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;