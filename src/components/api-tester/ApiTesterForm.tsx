"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import ApiResponse from "./ApiResponse";
import Tabs from "../Tabs";
import { ApiRequest, ApiResponse as ApiResponseType } from "@/types/apiTester";

interface Props {
    onSaveRequest: (req: ApiRequest) => void;
    initialData?: Partial<ApiRequest> | null;
}

const methodColors: Record<string, string> = {
    GET: "bg-green-500",
    POST: "bg-blue-500",
    PUT: "bg-yellow-500",
    DELETE: "bg-red-500",
};

const ApiTesterForm = ({ onSaveRequest, initialData }: Props) => {
    const [url, setUrl] = useState(initialData?.url || "");
    const [method, setMethod] = useState(initialData?.method || "GET");
    const [body, setBody] = useState(initialData?.body || "");
    const [requestName, setRequestName] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<ApiResponseType | null>(null);
    const [activeTab, setActiveTab] = useState("Request");

    const handleSend = async () => {
        if (!url) return toast.error("URL is required");
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
            setActiveTab("Response");
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

    const handleCopy = () => {
        if (response) {
            navigator.clipboard.writeText(JSON.stringify(response, null, 2));
            toast.success("Copied response!");
        }
    };

    const handleSave = () => {
        if (!requestName) return toast.error("Please provide a request name");
        onSaveRequest({
            id: Date.now().toString(),
            name: requestName,
            url,
            method,
            body,
            createdAt: new Date().toISOString(),
        });
        setRequestName("");
        toast.success("Request saved!");
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
            <Tabs tabs={["Request", "Response"]} activeTab={activeTab} onChange={setActiveTab} />

            {activeTab === "Request" && (
                <>
                    <div className="flex gap-3 mb-4">
                        <select
                            value={method}
                            onChange={(e) => setMethod(e.target.value as "GET" | "POST" | "PUT" | "DELETE")}
                            className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {["GET", "POST", "PUT", "DELETE"].map((m) => (
                                <option key={m}>{m}</option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="https://api.example.com/endpoint"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            onClick={handleSend}
                            className={`px-6 py-2 rounded-lg text-white transition ${loading ? "bg-gray-400" : methodColors[method] + " hover:opacity-80"
                                }`}
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send"}
                        </button>
                    </div>

                    {method !== "GET" && (
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder='Request body JSON {"key":"value"}'
                            className="w-full p-3 border rounded-lg font-mono h-36 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}

                    <div className="flex gap-3 mt-4">
                        <input
                            type="text"
                            placeholder="Request Name"
                            value={requestName}
                            onChange={(e) => setRequestName(e.target.value)}
                            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Save
                        </button>
                    </div>
                </>
            )}

            {activeTab === "Response" && response && <ApiResponse response={response} onCopy={handleCopy} />}
        </div>
    );
};

export default ApiTesterForm;
