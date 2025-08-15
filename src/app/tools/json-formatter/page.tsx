"use client";

import { useState } from "react";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";
import ToolLayout from "@/components/ToolLayout";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError("");
    } catch {
      setError("❌ Invalid JSON format");
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  return (
    <ToolLayout title="JSON Formatter & Validator">
      <Toaster position="top-right" />
      <div className="flex flex-col gap-4 mb-4">
        <textarea
          className="w-full h-48 p-4 border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste your JSON here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleFormat}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Format
          </button>

          <button
            onClick={handleClear}
            className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Clear
          </button>

          {output && (
            <button
              onClick={handleCopy}
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition"
            >
              <ClipboardDocumentCheckIcon className="w-5 h-5" />
              Copy
            </button>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {output && (
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm whitespace-pre-wrap">
          {output}
        </pre>
      )}
    </ToolLayout>
  );
}
