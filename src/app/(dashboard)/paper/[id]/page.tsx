export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = ["1", "2", "3", "4", "5", "6"];
  return slugs.map(slug => ({ id: slug }));
}

export default async function PhotoPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  return <div className="card">{id}</div>;
}
