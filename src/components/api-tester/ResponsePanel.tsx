"use client";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface ApiResponse {
  body?: unknown;
  headers?: Record<string, string>;
  status?: number;
}

interface Props {
  response: ApiResponse | null;
}


export default function ResponsePanel({ response }: Props) {
  const [activeTab, setActiveTab] = useState("Body");

  const handleCopy = () => {
    if (response) navigator.clipboard.writeText(JSON.stringify(response, null, 2));
  };

  if (!response) return null;

  return (
    <div className="bg-gray-900 text-green-400 rounded-2xl p-4 shadow-lg flex-1 relative">
      <div className="flex gap-2 mb-3">
        {["Body", "Headers", "Status"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1 rounded-t-lg ${activeTab === tab ? "bg-gray-800 font-semibold" : "bg-gray-700"}`}>{tab}</button>
        ))}
        <button onClick={handleCopy} className="ml-auto flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-white"><ClipboardDocumentCheckIcon className="w-5 h-5"/> Copy</button>
      </div>

      {activeTab === "Body" && <pre className="overflow-auto max-h-80 whitespace-pre-wrap text-sm scrollbar-hide">{JSON.stringify(response, null, 2)}</pre>}
      {activeTab === "Headers" && <pre className="overflow-auto max-h-80 whitespace-pre-wrap text-sm">{JSON.stringify(response?.headers || {}, null, 2)}</pre>}
      {activeTab === "Status" && <p className="text-lg font-semibold">{response?.status}</p>}
    </div>
  );
}
