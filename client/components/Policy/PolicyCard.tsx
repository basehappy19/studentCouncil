'use client'

import Image from "next/image";
import { Policy } from "@/app/interfaces/Policy/Policy";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const PolicyCard = ({ policy }: { policy: Policy }) => {
  const router = useRouter();
  const policySrc = process.env.NEXT_PUBLIC_POLICY_IMG_PATH || "";
  const subcategoryIconSrc = process.env.NEXT_PUBLIC_POLICY_ICON_PATH || "";
  const categoryIconSrc = process.env.NEXT_PUBLIC_POLICY_CATEGORY_ICON_PATH || "";
  console.log(policy);
  
  return (
    <Card 
      className={cn(
        "transition-all duration-300 hover:shadow-lg cursor-pointer",
        "hover:translate-y-[-4px]"
      )}
      onClick={() => router.push(`/policy/detail/${policy.id}`)}
    >
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            fill
            src={policySrc + policy.thumbnailImage}
            alt={policy.title}
            className="object-cover rounded-t-lg"
          />
          <Badge 
            variant="secondary" 
            className="absolute top-4 right-4 bg-white/90 dark:bg-black backdrop-blur-sm"
          >
            {policy.rank}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-4 line-clamp-2">
          {policy.title}
        </h3>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-sm">
            <div className="relative w-4 h-4">
              <Image
                width={16}
                height={16}
                src={categoryIconSrc + policy.category.icon}
                alt={policy.category.title}
                className="object-contain"
              />
            </div>
            <span className="text-muted-foreground">
              {policy.category.title}
            </span>
          </div>

          {policy.subCategories.map((subCategory) => (
            <div 
              key={subCategory.subCategory.id} 
              className="flex items-center gap-1.5 text-sm"
            >
              <div className="relative w-4 h-4">
                <Image
                  width={16}
                  height={16}
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
    </Card>
  );
};

export default PolicyCard;