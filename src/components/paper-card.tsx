import { BookmarkCheck, Star } from "lucide-react";
import Link from "next/link";

import Paper from "@/lib/types/paper";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface PaperCardProps {
  paper: Paper;
  animateHover?: boolean;
  small?: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Finished":
      return "bg-green-100 text-green-800";
    case "Want to Read":
      return "bg-blue-100 text-blue-800";
    case "Reading":
    default:
      return "bg-orange-100 text-orange-800";
  }
};

export function PaperCard({ paper, animateHover = true, small = false }: PaperCardProps) {
  return (
    <Link href={`/paper/${paper.id}`}>
      <Card
        className={cn(
          "flex flex-col transition",
          animateHover ? "hover:-translate-y-1 hover:shadow-md" : "shadow-none"
        )}
      >
        <CardHeader className={cn(small && "p-4")}>
          <div className={cn("flex flex-wrap gap-2", small ? "mb-1" : "mb-2")}>
            {paper.categories.map(category => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <CardTitle className="line-clamp-2 text-lg font-semibold leading-tight">{paper.title}</CardTitle>
          <p className="text-sm text-gray-500">
            {paper.authors.join(", ")} • {paper.year}
          </p>
        </CardHeader>
        <CardContent className={cn("flex-grow", small && "p-4 pt-0")}>
          <p className="text-sm text-gray-600">Reading Status: {paper.readingStatus}</p>
        </CardContent>
        <CardFooter className={cn("flex justify-between", small && "p-4 pt-0")}>
          <Badge className={`space-x-1 ${getStatusColor(paper.readingStatus)}`} variant={"secondary"}>
            <BookmarkCheck className="h-3 w-3" />
            <span>{paper.readingStatus}</span>
          </Badge>
          <Button variant={"ghost"} size="sm">
            <Star className={`h-4 w-4 ${paper.favorite ? "fill-yellow-500 stroke-yellow-500" : ""}`} />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
