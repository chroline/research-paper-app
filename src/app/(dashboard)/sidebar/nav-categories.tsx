import { MoreHorizontal, Plus } from "lucide-react";

import React, { useState } from "react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { CategoryList } from "./category-list";
import { NewCategoryDialog } from "./new-category-dialog";

export function NavCategories() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Categories</SidebarGroupLabel>
        <SidebarMenu>
          <CategoryList />
          <SidebarMenuItem>
            <SidebarMenuButton>
              <MoreHorizontal />
              <span className={"font-medium"}>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem onClick={() => setIsOpen(true)}>
            <SidebarMenuButton variant={"outline"}>
              <Plus />
              <span className={"font-medium"}>New Category</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <NewCategoryDialog isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
