import DetailPolicy from "./DetailPolicy";
import { Policy } from "@/app/functions/Policy";
import { Policies } from "@/app/interfaces/Policy/policies";

export async function generateMetadata({
  params,
}: {
  params: { idQuery: string };
}) {
  const { idQuery } = params;
  const Policy: Policies[] = await getPolicy(idQuery);

  return {
    title: "นโยบาย" + Policy[0].title + ` ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "ไหนแต่ละนโยบาย พรรคเรามี How? วิธีการ ข้อเสนอ งบประมาณ ในนโยบายระบุไว้เพื่อให้สามารถติดตามได้ตลอด",
    openGraph: {
      title: "นโยบาย" + Policy[0].title + ` ${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description:
        "ไหนแต่ละนโยบาย พรรคเรามี How? วิธีการ ข้อเสนอ งบประมาณ ในนโยบายระบุไว้เพื่อให้สามารถติดตามได้ตลอด",
    },
  };
}

async function PolicyDetail({ params }: { params: { idQuery: string } }) {
  const { idQuery } = params;
  const policy: Policies[] = await getPolicy(idQuery);
  const policySrc = process.env.NEXT_PUBLIC_APP_POLICIES_IMG_PATH_SERVER || "";
  const subcategoryIconSrc = process.env.NEXT_PUBLIC_APP_POLICIES_ICON_PATH_SERVER || "";
  const categoryIconSrc =
    process.env.NEXT_PUBLIC_APP_POLICIES_CATEGORIES_ICON_PATH_SERVER || "";
  return (
    <DetailPolicy
      policySrc={policySrc}
      categoryIconSrc={categoryIconSrc}
      subcategoryIconSrc={subcategoryIconSrc}
      policy={policy}
    />
  );
}

async function getPolicy(idQuery: string) {
  const response = await Policy(idQuery);
  return response;
}

export default PolicyDetail;
