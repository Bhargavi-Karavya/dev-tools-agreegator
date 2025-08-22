import { notFound } from "next/navigation";
import sequelize from "@/lib/db";
import Snippet from "@/app/model/Snippet";

export default async function SnippetPage({
  params,
}: {
  params: { id: string };
}) {
  await sequelize.authenticate();
  await sequelize.sync();

  const snippet = await Snippet.findByPk(params.id);

  if (!snippet) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Shared Code</h1>
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
        <code>{snippet.code}</code>
      </pre>
      <button
        onClick={() => navigator.clipboard.writeText(snippet.code)}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Copy Code
      </button>
    </div>
  );
}
