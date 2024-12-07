import { AllStatuses, getPolicy } from "@/app/functions/Policy";
import { Policy, Status } from "@/app/interfaces/Policy/Policy";
import PolicyDetail from "./PolicyDetail";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params
  const id = params.id
  const policy: Policy = await getPolicy(id);

  return {
    title: "นโยบาย" + policy.title + ` ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "ไหนแต่ละนโยบาย พรรคเรามี How? วิธีการ ข้อเสนอ งบประมาณ ในนโยบายระบุไว้เพื่อให้สามารถติดตามได้ตลอด",
    openGraph: {
      title: "นโยบาย" + policy.title + ` ${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description:
        "ไหนแต่ละนโยบาย พรรคเรามี How? วิธีการ ข้อเสนอ งบประมาณ ในนโยบายระบุไว้เพื่อให้สามารถติดตามได้ตลอด",
    },
  };
}

async function PolicyDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id
  const policy: Policy = await getPolicy(id);
  const statuses: Status[] = await AllStatuses();
  const policySrc = process.env.NEXT_PUBLIC_POLICY_IMG_PATH || "";
  const subcategoryIconSrc = process.env.NEXT_PUBLIC_POLICY_ICON_PATH || "";
  const categoryIconSrc = process.env.NEXT_PUBLIC_POLICY_CATEGORY_ICON_PATH || "";

  return (
    <PolicyDetail
      policy={policy}
      statuses={statuses}
      policySrc={policySrc}
      subcategoryIconSrc={subcategoryIconSrc}
      categoryIconSrc={categoryIconSrc}
    />
  );
}

export default PolicyDetailPage;