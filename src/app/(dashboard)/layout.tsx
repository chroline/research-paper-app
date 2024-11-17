import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

import { CommandDialog } from "@/components/command-dialog";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { QueryProvider } from "./query-provider";
import { AppSidebar } from "./sidebar";

export default async function Layout({
  breadcrumb,
  children,
  modal,
}: Readonly<{
  breadcrumb: React.ReactNode;
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) return redirect("/auth/login");

  return (
    <QueryProvider>
      <SessionProvider session={session}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                {breadcrumb}
              </div>
            </header>
            <div className={"w-full py-12"}>{children}</div>
          </SidebarInset>
          {modal}
          <CommandDialog />
        </SidebarProvider>
      </SessionProvider>
    </QueryProvider>
  );
}
