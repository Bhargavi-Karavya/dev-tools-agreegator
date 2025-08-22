"use client";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { ApiResponse } from "@/types/apiTester";

interface Props {
  response: ApiResponse | null;
  onCopy: () => void;
}
const ApiResponses = ({ response, onCopy }: Props) => {
  return (
    <div className="bg-gray-900 text-green-400 rounded-2xl p-4 shadow-lg relative mt-2">
      <button
        onClick={onCopy}
        className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-white"
      >
        <ClipboardDocumentCheckIcon className="w-5 h-5" /> Copy
      </button>
      <pre className="whitespace-pre-wrap overflow-auto text-sm max-h-96">{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default ApiResponses;
