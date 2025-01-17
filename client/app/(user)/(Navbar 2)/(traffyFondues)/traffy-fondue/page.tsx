import TagInHeader from '@/app/layouts/TagInHeader';
import { getLocations, getReports } from '@/app/functions/TraffyFondue';
import { Location } from '@/app/interfaces/TraffyFondue/Location';
import Client from './Client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: `แจ้งปัญหา ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description: "แพลตฟอร์มแจ้งปัญหาและติดตามการแก้ไขปัญหาในโรงเรียนโดยสภานักเรียน ช่วยให้นักเรียนมีส่วนร่วมในการปรับปรุงสภาพแวดล้อมในโรงเรียน",
    openGraph: {
        title: `แจ้งปัญหา ${process.env.NEXT_PUBLIC_APP_TITLE}`,
        description: "แจ้งปัญหาในโรงเรียนและติดตามการแก้ไขโดยสภานักเรียน เพื่อสร้างความโปร่งใสและการพัฒนาร่วมกัน",
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

const TraffyFonduePage = async (props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const searchParams = await props.searchParams
    const searchLocation = typeof searchParams.location === 'string' ? searchParams.location : undefined;
    const searchReport = typeof searchParams.report === 'string' ? searchParams.report : undefined;
    const locations: Location[] = await getLocations({ search: searchLocation });
    const problems = await getReports({ search: searchReport });

    return (
        <div className={`min-h-screen
        dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
        bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50`}>
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-yellow-400/20 to-pink-400/20 backdrop-blur-sm" />

                <div className="relative container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <TagInHeader icon="Sparkles" color="text-yellow-400" title="ปัญหาทั้งหมด" />

                        <h1 className="text-5xl md:text-7xl font-bold">
                            <span className="bg-clip-text text-transparent bg-pink-400 dark:bg-pink-500">
                                แจ้งปัญหา
                            </span>
                        </h1>

                        <p className={`text-xl md:text-2xl dark:text-gray-300 text-gray-600`}>
                            ร่วมแจ้งปัญหาเพื่อโรงเรียนที่ดีขึ้น
                        </p>
                    </div>
                </div>
            </section>
            <section className="container mx-auto px-4 py-8">
                <div className="relative container mx-auto px-4">


                    <Client locations={locations} problems={problems} />

                </div>
            </section>
            <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl -z-10" />
            <div className="fixed top-1/2 right-0 w-[600px] h-[600px] bg-pink-400/10 rounded-full blur-3xl -z-10" />
            <div className="fixed bottom-0 left-1/3 w-[550px] h-[550px] bg-yellow-400/10 rounded-full blur-3xl -z-10" />
        </div>
    );
}

export default TraffyFonduePage