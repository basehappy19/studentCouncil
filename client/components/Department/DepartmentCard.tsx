import Link from "next/link"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Department } from "@/app/interfaces/Department/Department"
import { ArrowRight, Coins } from "lucide-react"

const DepartmentCard = ({ department } : { department : Department }) => {
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
                        <ArrowRight className="w-6 h-6 text-white" />
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
                </CardContent>
            </Card>
        </Link>
    )
}

export default DepartmentCard