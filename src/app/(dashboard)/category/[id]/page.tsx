// app/category/[id]/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { getCategoryById } from "@/lib/services/categories";

import { CategoryView } from "./view";

async function getData(categoryId: string) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryById(categoryId),
  });

  return {
    dehydratedState: dehydrate(queryClient),
  };
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const { id: categoryId } = params;
  const { dehydratedState } = await getData(categoryId);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CategoryView categoryId={categoryId} />
    </HydrationBoundary>
  );
}
