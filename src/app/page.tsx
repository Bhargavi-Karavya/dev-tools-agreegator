"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const tools = [
  { name: "JSON Formatter", description: "Format and validate JSON strings.", href: "/tools/json-formatter" },
  { name: "API Tester", description: "Send HTTP requests and inspect responses.", href: "/tools/api-tester" },
  { name: "Code Share", description: "Send HTTP requests and inspect responses.", href: "/tools/code-share" },
  { name: "JWT Decoder", description: "Decode JWT tokens to inspect payloads.", href: "/tools/jwt-decoder" },
  { name: "Regex Tester", description: "Test and debug regular expressions.", href: "/tools/regex-tester" },
];

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark";
    if (saved) setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <main className="p-6 transition-colors duration-300 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Theme toggle button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100 transition"
        >
          {theme === "light" ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800 dark:text-gray-100">Dev Tools Aggregator</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{tool.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">{tool.description}</p>
            </div>
            <span className="text-blue-600 dark:text-blue-400 mt-4 font-medium hover:underline">Go →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
