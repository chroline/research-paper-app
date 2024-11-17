"use client";

import { useQuery } from "@tanstack/react-query";

import React from "react";

import { getCategoryById } from "@/lib/services/categories";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbSlot({ params }: { params: { id: string } }) {
  const { id: categoryId } = params;

  const { data: category, isLoading } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryById(categoryId),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Category</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{isLoading ? "..." : category!.emoji + " " + category!.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
