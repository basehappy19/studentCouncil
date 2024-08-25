import PostWork from "@/components/DashBoard/PostWork";
import { AllUser } from "@/app/functions/User";
import { AllWorkTag } from "@/app/functions/Work";
import { UserData } from "@/app/interfaces/User/user";
import { WorkTagData } from "@/app/interfaces/Work/Work";



export const metadata = {
  title: `โพสต์การทำงาน ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description:
    "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามการทำงานผลงานเราได้ที่นี้",
  openGraph: {
    title: `ติดตามการทำงานของเราได้ตลอด 24/7 ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามการทำงานผลงานเราได้ที่นี้",
  },
};

async function getUser(): Promise<UserData[]> {
  const response = AllUser()
  return response
}

async function getWorkTag(): Promise<WorkTagData[]> {
  const response = AllWorkTag()
  return response
}

async function WorkPage() {
  const listUser: UserData[] = await getUser()
  const workTag: WorkTagData[] = await getWorkTag()


  return (

    <PostWork listUser={listUser} workTag={workTag} />

  )
}

export default WorkPage;