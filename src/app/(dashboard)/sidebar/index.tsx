"use client";

import { BookOpen, Command, Home, LifeBuoy, Paperclip, Send, Star } from "lucide-react";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavCategories } from "./nav-categories";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Favorites",
      url: "/favorites",
      icon: Star,
    },
    {
      title: "Saved Papers",
      url: "/saved-papers",
      icon: Paperclip,
    },
    {
      title: "Discover",
      url: "/discover",
      icon: BookOpen,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  categories: [
    {
      name: "Neural Networks",
      url: "/category/1",
      emoji: "🌐",
      count: 6,
    },
    {
      name: "LLMs",
      url: "#",
      emoji: "🤖",
      count: 7,
    },
    {
      name: "Neuroscience",
      url: "#",
      emoji: "🧠",
      count: 6,
    },
    {
      name: "Psychology",
      url: "#",
      emoji: "🧑‍⚕️",
      count: 1,
    },
    {
      name: "Machine Learning",
      url: "#",
      emoji: "📊",
      count: 2,
    },
    {
      name: "Linguistics",
      url: "#",
      emoji: "🗣️",
      count: 1,
    },
    {
      name: "Prompt Engineering",
      url: "#",
      emoji: "⚙️",
      count: 3,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant={"inset"} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavCategories />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
