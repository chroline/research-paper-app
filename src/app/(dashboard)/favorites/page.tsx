import { PaperCard } from "@/components/paper-card";

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

export default function Favorites() {
  return (
    <div className={"flex px-4"}>
      <div className={"mx-auto w-full max-w-5xl"}>
        <h1 className={"font-display mb-8 text-3xl font-semibold"}>Favorite Papers</h1>
        <div className={"grid grid-cols-3 gap-4"}>
          {papers.map(paper => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      </div>
    </div>
  );
}
