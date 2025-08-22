"use client";
import { ApiRequest, ApiResponse, SaveRequestHandler } from "@/types/apiTester";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  initialData?: Partial<ApiRequest> | null;
  onSaveRequest: SaveRequestHandler;
  setResponse: (res: ApiResponse | null) => void;
}


const methodColors: Record<string, string> = {
    GET: "bg-green-500",
    POST: "bg-blue-500",
    PUT: "bg-yellow-500",
    DELETE: "bg-red-500",
};

export default function ApiFormPanel({ initialData, onSaveRequest, setResponse }: Props) {
    const [url, setUrl] = useState(initialData?.url || "");
    const [method, setMethod] = useState(initialData?.method || "GET");
    const [body, setBody] = useState(initialData?.body || "");
    const [requestName, setRequestName] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!url) return toast.error("URL required");
        setLoading(true);
        setResponse(null);
        try {
            const res = await fetch("/api/api-tester/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, method, body }),
            });
            const data = await res.json();
            setResponse(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Failed");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        if (!requestName) return toast.error("Name required");
        onSaveRequest({ id: Date.now().toString(), name: requestName, url, method, body, createdAt: new Date().toISOString() });
        setRequestName("");
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-md">
            <div className="flex gap-3 mb-3">
                <select
                    value={method}
                    onChange={e => setMethod(e.target.value as "POST" | "GET" | "PUT" | "DELETE")}
                    className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {Object.keys(methodColors).map(m => (
                        <option key={m} value={m}>
                            {m}
                        </option>
                    ))}
                </select>

                <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://api.example.com" className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button onClick={handleSend} className={`${methodColors[method]} px-6 py-2 rounded-lg text-white hover:opacity-80`}>{loading ? "Sending..." : "Send"}</button>
            </div>

            {method !== "GET" && (
                <textarea value={body} onChange={e => setBody(e.target.value)} placeholder='{"key":"value"}' className="w-full p-3 border rounded-lg font-mono h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3" />
            )}

            <div className="flex gap-3">
                <input type="text" value={requestName} onChange={e => setRequestName(e.target.value)} placeholder="Request Name" className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                <button onClick={handleSave} className="px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700">Save</button>
            </div>
        </div>
    );
}
