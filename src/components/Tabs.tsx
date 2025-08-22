"use client";
import React from "react";

interface Props {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

const Tabs = ({ tabs, activeTab, onChange }: Props) => (
  <div className="flex gap-2 border-b mb-4">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => onChange(tab)}
        className={`px-4 py-2 rounded-t-lg ${
          activeTab === tab ? "bg-white border-t border-l border-r border-gray-300 font-semibold" : "bg-gray-100"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default Tabs;
