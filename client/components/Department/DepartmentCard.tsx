import Link from "next/link"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Department } from "@/app/interfaces/Department/Department"
import { ArrowRight, Coins } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const DepartmentCard = ({ department }: { department: Department }) => {
    return (
        <Link
            href={`/budget/detail/${department.id}`}
            key={department.id}
            className="block"
        >
            <Card className="h-full transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="p-6" style={{ backgroundColor: department.color }}>
                    <div className="flex items-center justify-between">
                        <Coins className="w-8 h-8 text-white" />
                        <div className="font-semibold text-white flex flex-row items-center gap-x-3">
                            {department.budget.total.toString()} บาท
                            <ArrowRight className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <h3
                        className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${department.color}, ${department.color}dd)`
                        }}
                    >
                        {department.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        คลิกเพื่อดูรายละเอียดงบประมาณ
                    </p>
                    <div className="flex flex-row items-center gap-x-3 mt-3">
                        <Avatar>
                            <AvatarImage src={`${process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH}/${department.leader.profile_image_128x128}`} />
                            <AvatarFallback>{department.leader.nickName}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            หัวหน้าฝ่าย : {department.leader.fullName}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default DepartmentCard