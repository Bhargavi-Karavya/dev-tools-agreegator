"use client";
import { ApiRequest } from "@/types/apiTester";
import { useState } from "react";

interface Props {
  collections: ApiRequest[];
  onLoadRequest: (req: ApiRequest) => void;
}


const methodColors: Record<string, string> = {
  GET: "bg-green-500",
  POST: "bg-blue-500",
  PUT: "bg-yellow-500",
  DELETE: "bg-red-500",
};

export default function CollectionSidebar({ collections, onLoadRequest }: Props) {
  const [filterMethod, setFilterMethod] = useState("");
  const [search, setSearch] = useState("");

  const filtered = collections.filter(req => {
    const matchMethod = filterMethod ? req.method === filterMethod : true;
    const matchSearch = req.name.toLowerCase().includes(search.toLowerCase());
    return matchMethod && matchSearch;
  });

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 rounded-l-2xl p-4 flex flex-col">
      <input
        type="text"
        placeholder="Search requests..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="px-3 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={filterMethod}
        onChange={e => setFilterMethod(e.target.value)}
        className="px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Methods</option>
        {Object.keys(methodColors).map(m => <option key={m}>{m}</option>)}
      </select>

      <div className="flex-1 overflow-y-auto space-y-2">
        {filtered.length === 0 && <p className="text-gray-500 text-sm">No requests</p>}
        {filtered.map(req => (
          <div
            key={req.id}
            className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer flex justify-between items-center transition shadow-sm"
            onClick={() => onLoadRequest(req)}
          >
            <div>
              <p className="font-medium">{req.name}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className={`px-2 py-0.5 rounded text-white text-[10px] ${methodColors[req.method]}`}>
                  {req.method}
                </span>
                {req.url}
              </p>
            </div>
            <span className="text-gray-400 text-xs">{new Date(req.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
