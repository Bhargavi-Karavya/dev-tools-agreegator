"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CodeShare() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api-snippets/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.id) {
      router.push(`/p/${data.id}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Paste & Share Code</h1>
      <textarea
        className="w-full h-64 p-3 border rounded-md font-mono"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        {loading ? "Saving..." : "Generate Link"}
      </button>
    </div>
  );
}
