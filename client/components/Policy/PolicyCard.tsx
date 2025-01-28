'use client'

import Image from "next/image";
import { Policy } from "@/app/interfaces/Policy/Policy";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const PolicyCard = ({ policy }: { policy: Policy }) => {
  const router = useRouter();
  const policySrc = process.env.NEXT_PUBLIC_POLICY_IMG_PATH || "";
  const subcategoryIconSrc = process.env.NEXT_PUBLIC_POLICY_ICON_PATH || "";
  const categoryIconSrc = process.env.NEXT_PUBLIC_POLICY_CATEGORY_ICON_PATH || "";

  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-lg cursor-pointer",
        "hover:translate-y-[-4px]",
      )}
      onClick={() => router.push(`/policy/detail/${policy.id}`)}
    >
      <div className="md:p-8 flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/3 h-64">
          <Image
            fill
            src={policySrc + policy.thumbnailImage}
            alt={policy.title}
            className="object-center object-cover rounded-md"
          />
        </div>

        {/* Content Container - Full width on mobile, right side on larger screens */}
        <CardContent className="flex-grow p-6 space-y-4 md:w-2/3">
          <Badge
            variant="secondary"
            className="bg-pink-200 dark:bg-pink-600"
          >
            {policy.rank}
          </Badge>
          <h3 className="text-md md:text-2xl font-bold">
            {policy.title}
          </h3>

          <div className="flex flex-wrap gap-2">
            {/* Category */}
            <div className="flex items-center gap-1.5 text-sm">
              <div className="relative w-4 h-4">
                <Image
                  width={16}
                  height={16}
                  crossOrigin="anonymous"
                  src={categoryIconSrc + policy.category.icon}
                  alt={policy.category.title}
                  className="object-contain"
                />
              </div>
              <span className="text-muted-foreground">
                {policy.category.title}
              </span>
            </div>

            {/* Subcategories */}
            {policy.subCategories.map((subCategory) => (
              <div
                key={subCategory.subCategory.id}
                className="flex items-center gap-1.5 text-sm"
              >
                <div className="relative w-4 h-4">
                  <Image
                    width={16}
                    height={16}
                    crossOrigin="anonymous"
                    src={subcategoryIconSrc + subCategory.subCategory.icon}
                    alt={subCategory.subCategory.title}
                    className="object-contain"
                  />
                </div>
                <span className="text-muted-foreground">
                  {subCategory.subCategory.title}
                </span>
              </div>
            ))}
          </div>


        </CardContent>
      </div>
    </Card>
  );
};

export default PolicyCard;