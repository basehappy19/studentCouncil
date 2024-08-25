import { getServerSession } from "next-auth";
import Login from "./login";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function page() {
  const session = await getServerSession(authOptions)
  if(session) {
    redirect('/')
  }
  return <Login />
}

export default page;
