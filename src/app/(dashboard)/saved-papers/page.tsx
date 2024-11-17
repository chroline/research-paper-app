import { PaperCardStack } from "@/components/paper-card-stack";
import { Divider } from "@/components/ui/divider";

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

export default function YourPapers() {
  return (
    <div className={"flex px-4"}>
      <div className={"mx-auto w-full max-w-5xl"}>
        <h1 className={"font-display mb-8 text-3xl font-semibold"}>Saved Papers</h1>
        <Divider className={"mb-8"} />

        <div className={"grid grid-cols-3 gap-4"}>
          <div>
            <div className={"rounded-xl border border-gray-600/50 bg-gray-600/5 p-4"}>
              <h2 className={"text-base font-semibold text-gray-600"}>Want to Read</h2>
              <div className={"mt-4 space-y-2"}>
                {papers.map((paper, i) => (
                  <div key={i}>
                    <p className={"mb-2 text-sm font-semibold"}>Category</p>
                    <PaperCardStack papers={papers} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className={"rounded-xl border border-blue-600/50 bg-blue-600/5 p-4"}>
              <h2 className={"text-base font-semibold text-blue-600"}>Reading</h2>
            </div>
          </div>

          <div>
            <div className={"rounded-xl border border-green-600/50 bg-green-600/5 p-4"}>
              <h2 className={"text-base font-semibold text-green-600"}>Finished</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
