"use client";

import Link from "next/link";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface CategoryItemProps {
  emoji: string;
  name: string;
  count: number;
  id: string;
}

export function CategoryItem({ emoji, name, count, id }: CategoryItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={`/category/${id}`} title={name} className="flex">
          <span>{emoji}</span>
          <span className="flex-1">{name}</span>
          <div className="flex aspect-square w-5 items-center justify-center rounded bg-gray-100">
            <span>{count}</span>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
