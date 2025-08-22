"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import ToolLayout from "@/components/ToolLayout";
import CollectionSidebar from "@/components/api-tester/CollectionSidebar";
import ApiFormPanel from "@/components/api-tester/ApiFormPanel";
import ResponsePanel from "@/components/api-tester/ResponsePanel";
import { ApiRequest, ApiResponse } from "@/types/apiTester";

export default function APITesterPage() {
  const [collections, setCollections] = useState<ApiRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ApiRequest | null>(null);
  const [response, setResponse] = useState<ApiResponse | null>(null);


  useEffect(() => {
    const saved = localStorage.getItem("api-collections");
    if (saved) setCollections(JSON.parse(saved));
  }, []);

  const handleSaveRequest = (req: ApiRequest) => {
    const updated = [req, ...collections];
    setCollections(updated);
    localStorage.setItem("api-collections", JSON.stringify(updated));
    toast.success("Request saved!");
  };    

  const handleLoadRequest = (req: ApiRequest) => {
    setSelectedRequest(req);
    toast.success(`Loaded request: ${req.name}`);
  };

  return (
    <ToolLayout title="API Tester">
      <Toaster position="top-right" />
      <div className="flex gap-4 h-[calc(100vh-150px)]">
        {/* Sidebar */}
        <CollectionSidebar
          collections={collections}
          onLoadRequest={handleLoadRequest}
        />

        {/* Main panel */}
        <div className="flex-1 flex flex-col gap-4">
          <ApiFormPanel
            initialData={selectedRequest}
            onSaveRequest={handleSaveRequest}
            setResponse={setResponse}
          />

          <ResponsePanel response={response} />
        </div>
      </div>
    </ToolLayout>
  );
}
