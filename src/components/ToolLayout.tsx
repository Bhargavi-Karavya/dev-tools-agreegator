// src/components/ToolLayout.tsx
import Link from "next/link";

export default function ToolLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>
      <div className="mb-6 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
      {children}
    </div>
  );
}
