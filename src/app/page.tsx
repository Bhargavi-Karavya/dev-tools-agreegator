import Link from "next/link";

const tools = [
  {
    name: "JSON Formatter & Validator",
    description: "Format and validate JSON strings with ease.",
    href: "/tools/json-formatter",
  },
  {
    name: "JWT Decoder",
    description: "Decode JWT tokens to inspect their payload.",
    href: "/tools/jwt-decoder",
  },
  {
    name: "Regex Tester",
    description: "Test and debug regular expressions in real-time.",
    href: "/tools/regex-tester",
  },
  // Add more tools here in the future
];

export default function Home() {
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Dev Tools Aggregator</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href}
            className="border rounded-xl p-6 hover:shadow-lg transition cursor-pointer hover:bg-gray-50"
          >
            <h2 className="text-2xl font-semibold mb-2">{tool.name}</h2>
            <p className="text-gray-600">{tool.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
