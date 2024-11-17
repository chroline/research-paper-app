"use client";

import { SmilePlus } from "lucide-react";

import { Suspense, use, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

import { ScrollArea } from "./ui/scroll-area";

// Simulated async function to fetch emojis
async function fetchEmojis() {
  const res = await fetch("https://raw.githubusercontent.com/github/gemoji/refs/heads/master/db/emoji.json").then(v =>
    v.json()
  );
  return res as {
    emoji: string;
    description: string;
    category: string;
    aliases: string[];
    tags: string[];
  }[];
}

function EmojiGrid({ searchTerm, onEmojiSelect }: { searchTerm: string; onEmojiSelect: (emoji: string) => void }) {
  const emojis = use(fetchEmojis());

  const groupedEmojis = emojis.reduce(
    (acc, emoji) => {
      if (searchTerm && !emoji.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return acc;
      }

      const category = emoji.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(emoji);
      return acc;
    },
    {} as Record<string, typeof emojis>
  );

  const categories = Object.entries(groupedEmojis).filter(([, emojis]) => emojis.length > 0);

  if (categories.length === 0) {
    return <div className="p-4 text-center text-muted-foreground">No emojis found</div>;
  }

  return (
    <div className="relative space-y-4">
      {categories.map(([category, categoryEmojis]) => (
        <div key={category} className="relative">
          <div className="sticky top-0 z-10 bg-popover py-1">
            <h4 className="px-1 text-sm font-medium text-muted-foreground">{category}</h4>
            <div className="absolute inset-x-0 -bottom-2 h-2 bg-gradient-to-b from-popover to-transparent" />
          </div>
          <div className="grid grid-cols-6 gap-2">
            {categoryEmojis.map((emoji, index) => (
              <button
                key={`${category}-${index}`}
                className="rounded p-1 text-2xl hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => onEmojiSelect(emoji.emoji)}
                title={emoji.description}
              >
                {emoji.emoji}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Fallback component to show while loading
function EmojiGridFallback() {
  return (
    <div className="grid grid-cols-6 gap-2">
      {Array(30)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} className="aspect-square w-full rounded" />
        ))}
    </div>
  );
}

export function EmojiPicker({ value, onChange }: { value: string | undefined; onChange: (value: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emoji: string) => {
    onChange(emoji);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-16 p-0 text-2xl">
          {value || <SmilePlus className="h-4 w-4" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-80 w-80 overflow-hidden pb-0">
        <div className="flex h-full flex-col space-y-4">
          <Input
            type="search"
            placeholder="Search emojis..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className={"flex-1 overflow-hidden"}>
            <Suspense fallback={<EmojiGridFallback />}>
              <ScrollArea className={"h-full"}>
                <div className={"pb-4"}>
                  <EmojiGrid searchTerm={searchTerm} onEmojiSelect={handleEmojiSelect} />
                </div>
              </ScrollArea>
            </Suspense>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
