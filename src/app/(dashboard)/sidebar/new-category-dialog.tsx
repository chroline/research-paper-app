import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAsyncFn } from "react-use";

import React, { useState } from "react";

import { createCategory } from "@/lib/services/categories";

import { EmojiPicker } from "@/components/emoji-picker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewCategoryDialog({ isOpen, onOpenChange }: CategoryDialogProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const queryClient = useQueryClient();

  const [emoji, setEmoji] = useState<string | undefined>(undefined);
  const [name, setName] = useState("");

  const [submitState, submitFn] = useAsyncFn(
    async e => {
      e.preventDefault();

      const category = await createCategory({ name, emoji: emoji!, userId: userId! });
      await queryClient.invalidateQueries({ queryKey: ["categories", userId!] });

      router.push("/category/" + category[0].id);

      onOpenChange(false);
    },
    [emoji, name]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitFn}>
          <div className="flex gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="emoji">Emoji</Label>
              <div id={"emoji"}>
                <EmojiPicker value={emoji} onChange={setEmoji} />
              </div>
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter category name" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitState.loading}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
