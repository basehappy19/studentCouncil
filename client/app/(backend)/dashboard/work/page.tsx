import PostWork from "../../../../components/DashBoard2/PostWork";
import { AllUser } from "../../../functions/User";
import { AllWorkTag } from "../../../functions/Work";
import { User } from "../../../interfaces/User/User";
import { Tag } from "../../../interfaces/Work/Work";


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

async function getUser(): Promise<User[]> {
  const response = AllUser()
  return response
}

async function getWorkTag(): Promise<WorkTagData[]> {
  const response = AllWorkTag()
  return response
}

async function WorkPage() {
  const listUser: User[] = await getUser()
  const workTag: WorkTagData[] = await getWorkTag()


  return (
    <PostWork listUser={listUser} workTag={workTag} />
  )
}

export default WorkPage;