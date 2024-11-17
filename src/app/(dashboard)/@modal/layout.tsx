"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { paperModalOpenAtom } from "./atom";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [paperModalOpen] = useAtom(paperModalOpenAtom);

  return (
    <Sheet open={paperModalOpen} onOpenChange={() => router.back()}>
      {children}
      <SheetContent className={"w-full max-w-4xl"}>
        <SheetHeader>
          <SheetTitle>Paper</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
