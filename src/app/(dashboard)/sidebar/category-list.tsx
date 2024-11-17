"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getCategoriesByUserId } from "@/lib/services/categories";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

import { CategoryItem } from "./category-item";

function LoadingSkeleton() {
  return (
    <>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton asChild>
              <div className="flex">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="ml-2 h-6 w-24" />
                <Skeleton className="ml-auto h-5 w-5 rounded" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
    </>
  );
}

export function CategoryList() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories", userId],
    queryFn: () => getCategoriesByUserId(userId!),
    enabled: !!userId,
  });

  console.log(!userId, isLoading);

  if (!userId || isLoading) {
    return <LoadingSkeleton />;
  }

  if (!categories) return null;

  return (
    <>
      {categories.map(category => (
        <CategoryItem key={category.id} emoji={category.emoji} name={category.name} count={5} id={category.id} />
      ))}
    </>
  );
}
