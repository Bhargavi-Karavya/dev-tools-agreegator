"use client";
import { ApiRequest } from "@/types/apiTester";
import { useState } from "react";


interface Props {
  collections: ApiRequest[];
  onLoadRequest: (req: ApiRequest) => void;
}


const CollectionPanel = ({ collections, onLoadRequest }: Props) => {
  const [filterMethod, setFilterMethod] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCollections = collections.filter((req) => {
    const matchesMethod = filterMethod ? req.method === filterMethod : true;
    const matchesSearch = req.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMethod && matchesSearch;
  });

  return (
    <div className="w-80 border-r border-gray-200 p-4 bg-gray-50 h-[calc(100vh-150px)] overflow-y-auto rounded-l-2xl">
      <div className="flex gap-2 mb-3">
        <select
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
          className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Methods</option>
          {["GET", "POST", "PUT", "DELETE"].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredCollections.length === 0 ? (
        <p className="text-gray-500 text-sm">No saved requests</p>
      ) : (
        filteredCollections.map((req) => (
          <div
            key={req.id}
            onClick={() => onLoadRequest(req)}
            className="p-3 mb-2 border rounded-lg hover:bg-gray-100 cursor-pointer flex justify-between items-center transition"
          >
            <div>
              <p className="font-medium">{req.name}</p>
              <p className="text-xs text-gray-500">
                <span className={`px-2 py-0.5 rounded text-white text-[10px] ${
                  req.method === "GET"
                    ? "bg-green-500"
                    : req.method === "POST"
                    ? "bg-blue-500"
                    : req.method === "PUT"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                >
                  {req.method}
                </span>{" "}
                {req.url}
              </p>
            </div>
            <span className="text-gray-400 text-xs">
              {new Date(req.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default CollectionPanel;
