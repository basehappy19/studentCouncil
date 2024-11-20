import { AllStatuses, getPolicy } from "@/app/functions/Policy";
import { Policy, Status } from "@/app/interfaces/Policy/Policy";
import Image from "next/image";
import ProgressStep from "@/components/Policy/ProgressStep";

export async function generateMetadata(props: {
  params: { id: string };
}) {
  const params = await props.params
  const id = params.id
  const policy : Policy = await getPolicy(id);

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

async function PolicyDetail(props: {params: { id: string }}) {
  const params = await props.params
  const id = params.id
  const policy: Policy = await getPolicy(id);
  const statuses: Status[] = await AllStatuses();
  const policySrc = process.env.NEXT_PUBLIC_POLICY_IMG_PATH || "";
  const subcategoryIconSrc = process.env.NEXT_PUBLIC_POLICY_ICON_PATH || "";
  const categoryIconSrc = process.env.NEXT_PUBLIC_POLICY_CATEGORY_ICON_PATH || "";

  return (
    <div className="bg-custom-background pb-5">
      <section className="border-b border-gray p-10">
        <div className="container p-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-y-6 md:gap-y-0 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <h1
                className="font-semibold text-custom-gray text-6xl text-center md:text-start"
                style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.25)" }}
              >
                {policy.title}
              </h1>
              <div className="flex gap-2 justify-center font-medium md:justify-normal text-custom-dark flex-wrap">
                <div className="flex items-center gap-1 justify-center md:justify-normal">
                  <Image
                    src={categoryIconSrc + policy.category.icon}
                    className="min-w-4 min-h-4 w-4 h-4"
                    alt=""
                  />
                  {policy.category.title}
                </div>
              </div>
              <div className="flex gap-2 flex-wrap text-custom-dark font-medium justify-center md:justify-normal">
                {policy.subCategories.map(
                  (subCategory) =>
                    <div
                      key={subCategory.id}
                      className="flex items-center gap-1 justify-normal md:justify-center"
                    >
                      <Image
                        src={subcategoryIconSrc + subCategory.subCategory.icon}
                        className="min-w-4 min-h-4 w-4 h-4"
                        alt=""
                      />
                      {subCategory.subCategory.title}
                    </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div>
                <Image
                  className="object-cover w-full h-full max-h-[350px] rounded-lg"
                  width={1200}
                  height={500}
                  src={policySrc + policy.thumbnailImage}
                  alt={policy.title}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="p-10">
        <div className="container p-4 mx-auto">
          <h1
            className={`text-4xl font-semibold text-center md:text-start mt-3`} style={{ color: policy.currentProgress.status.color }}
          >
            สถานะ{policy.currentProgress.status.name}
          </h1>
          <div className="mt-2 flex items-center top-0 z-30 bottom-4">
            <div className="flex-1 grid grid-cols-6 gap-1">
              {statuses.map((step) => (
                <ProgressStep
                  policy={policy}
                  key={step.step}
                  step={step.step}
                  name={step.name}
                />
              ))}
            </div>
          </div>
          <div className="w-full">
            <div className="my-10">
              <h1 className="text-4xl font-semibold text-[#ae4334]">ปัญหา</h1>
              <p>{policy.description.problem}</p>
            </div>
          </div>
          <div className="w-full">
            <div className="my-10">
              <h1 className="text-4xl font-semibold text-[#a33bc8]">ข้อเสนอ</h1>
              <p>{policy.description.offer}</p>
            </div>
          </div>
          <div className="w-full">
            <div className="my-10">
              <h1 className="text-4xl font-semibold text-[#4a9924]">งบประมาณ</h1>
              <p>{policy.description.budget}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


export default PolicyDetail;
