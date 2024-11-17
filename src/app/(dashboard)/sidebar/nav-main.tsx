"use client";

import { useAtom } from "jotai/react";
import { type LucideIcon, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { searchDialogOpenAtom } from "@/components/command-dialog";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const [, setOpen] = useAtom(searchDialogOpenAtom);

  const pathname = usePathname();

  return (
    <SidebarMenu>
      <div>
        <SidebarMenuItem>
          <SidebarMenuButton asChild onClick={() => setOpen(true)} className={"cursor-pointer"}>
            <div>
              <Search />
              <span>Search</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
        {items.map(item => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={item.url === pathname}>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </div>
    </SidebarMenu>
  );
}
