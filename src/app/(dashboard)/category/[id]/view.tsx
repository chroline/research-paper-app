"use client";

import { useQuery } from "@tanstack/react-query";

import { getCategoryById } from "@/lib/services/categories";

import { PaperCard } from "@/components/paper-card";

// Mocked data for demonstration
const papers = [
  {
    id: 1,
    title: "Machine Learning Approaches in COVID-19 Diagnosis",
    authors: ["John Doe", "Jane Smith"],
    year: 2023,
    categories: ["🌐 Neural Networks", "🤖 LLMs"],
    readingStatus: "Want to Read",
    favorite: true,
  },
  {
    id: 2,
    title: "Quantum Computing: A New Era in Information Processing",
    authors: ["Alice Johnson", "Bob Williams"],
    year: 2022,
    categories: ["Quantum Computing", "Information Theory"],
    readingStatus: "Reading",
    favorite: false,
  },
  // Add more paper objects as needed
];

export function CategoryView({ categoryId }: { categoryId: string }) {
  const { data: category, isLoading } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryById(categoryId),
    staleTime: 1000 * 60 * 5,
  });

  console.log({ category });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return <div>No category found</div>;
  }

  return (
    <div className={"flex px-4"}>
      <div className={"mx-auto w-full max-w-5xl"}>
        <h1 className={"mb-8 font-display text-4xl font-semibold"}>
          {category.emoji} {category.name}
        </h1>
        <div className={"grid grid-cols-3 gap-4"}>
          {papers.map(paper => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      </div>
    </div>
  );
}
