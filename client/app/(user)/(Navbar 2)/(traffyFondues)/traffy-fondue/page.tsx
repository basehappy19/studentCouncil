import TagInHeader from '@/app/layouts/TagInHeader';
import ProblemReportForm from './ReportForm';
import LocationCard from './LocationCard';
import RecentProblemCard from './RecentProblemCard';
import { getLocations } from '@/app/functions/TraffyFondue';
import { Location } from '@/app/interfaces/TraffyFondue/Location';

const mockProblems = [
    {
        id: 1,
        title: "ก๊อกน้ำรั่ว",
        description: "ก๊อกน้ำในห้องน้ำชายห้อง 1 มีน้ำรั่วตลอดเวลา",
        location: "อาคารเรียน 1",
        subLocation: "ห้องน้ำชาย",
        room: "ห้อง 1",
        reportedImages: [],
        resolvedImages: [],
        status: "pending",
        createdAt: "2025-01-04T10:00:00Z"
    },
    {
        id: 2,
        title: "หลอดไฟเสีย",
        description: "หลอดไฟในห้องน้ำชายห้อง 2 ดับ",
        location: "อาคารเรียน 1",
        subLocation: "ห้องน้ำชาย",
        room: "ห้อง 2",
        reportedImages: [],
        resolvedImages: [],
        status: "resolved",
        createdAt: "2025-01-03T15:30:00Z"
    }
];


const TraffyFonduePage = async () => {
    const locations : Location[] = await getLocations();
    
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


                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {locations.map((location) => (
                            <LocationCard key={location.id} location={location} />
                        ))}
                    </div>

                    {/* Report Form */}
                    <ProblemReportForm locations={locations} />

                    {/* Recent Problems */}
                    <RecentProblemCard mockProblems={mockProblems} />

                </div>
            </section>
            <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl -z-10" />
            <div className="fixed top-1/2 right-0 w-[600px] h-[600px] bg-pink-400/10 rounded-full blur-3xl -z-10" />
            <div className="fixed bottom-0 left-1/3 w-[550px] h-[550px] bg-yellow-400/10 rounded-full blur-3xl -z-10" />
        </div>
    );
}

export default TraffyFonduePage