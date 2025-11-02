"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heading } from "../ui/heading";
import { ToolCard } from "../ui/toolcard";
import { constants } from "@/utils/consitants/consitaint";

// Helper function to convert title to URL slug
const titleToSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with dashes
    .replace(/[^a-z0-9-]/g, '')     // Remove special characters
    .replace(/--+/g, '-')           // Replace multiple dashes with single
    .replace(/^-|-$/g, '');         // Remove leading/trailing dashes
};

export function Popular() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  // Click handler for navigation
  const handleToolClick = (toolTitle: string) => {
    const slug = titleToSlug(toolTitle);
    // Navigate to tool page
    router.push(`/${slug}`);
    
    // Alternative: Open in new tab
    // window.open(`/${slug}`, '_blank');
  };

  return (
    <section className="relative py-12 px-6 bg-gradient-to-br from-[#f8f9ff] via-[#fff0f6] to-[#f0faff] rounded-3xl shadow-lg overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.12),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.12),transparent_60%)] blur-xl" />

      <div className="relative z-10">
        <Heading title="Popular Functionality" align="left" />
        <p className="text-gray-500 mb-8"></p>

        {/* Grid layout - 5 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {constants.tools.map((tool, index) => {
            const isActive = selected === tool.title;
            return (
              <button
                key={index}
                onClick={() => handleToolClick(tool.title)}
                onMouseEnter={() => setSelected(tool.title)}
                onMouseLeave={() => setSelected(null)}
                className={`relative p-5 text-base font-semibold rounded-2xl border cursor-pointer transition-all duration-300 ease-in-out transform
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white border-transparent shadow-lg scale-[1.05]"
                      : "bg-white/80 text-gray-800 border-gray-200 hover:-translate-y-1 hover:scale-[1.04] hover:shadow-[0_8px_20px_rgba(99,102,241,0.15)] hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-pink-50"
                  }
                `}
              >
                {/* Smooth background glow when active */}
                {isActive && (
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-400 to-pink-400 opacity-25 blur-md"></span>
                )}

                {/* Card Title */}
                <span className="relative z-10 block truncate">{tool.title}</span>

                {/* Subtle hover highlight line */}
                <span
                  className={`absolute bottom-0 left-0 h-[3px] rounded-full bg-gradient-to-r from-blue-500 to-pink-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                ></span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 
URL CONVERSIONS:
- "JSON Beautifier" → "/json-beautifier"
- "HTML Viewer" → "/html-viewer"
- "Number to Words" → "/number-to-words"
- "SQL Formatter" → "/sql-formatter"
- "ONLINE JSON EDITOR" → "/online-json-editor"

If you want to open in NEW TAB instead:
Replace line 24 with:
window.open(`/${slug}`, '_blank');
*/