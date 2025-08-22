"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Props {
  title: string;
  children: ReactNode;
}

export default function ToolLayout({ title, children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Back button - always goes to /tools */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeftIcon className="w-5 h-5" /> Back
        </Link>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{title}</h1>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
