"use client";
import { useState } from "react";
import { Heading } from "../ui/heading";
import { ToolCard } from "../ui/toolcard";
import { constants } from "@/utils/consitants/consitaint";

export function TrendingTools() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative py-12 px-6 rounded-3xl overflow-hidden bg-gradient-to-br from-[#eef5ff] via-[#fdf2ff] to-[#e8f9f3] shadow-xl">
      {/* Background blur + glow effect */}
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.2),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.15),transparent_50%),radial-gradient(circle_at_50%_100%,rgba(236,72,153,0.15),transparent_50%)]"></div>

      <div className="relative z-10">
        <Heading title="Trending Tools" align="left" />

        <p className="text-gray-600 mb-8"></p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {constants.trendingTools.map((tool, index) => (
            <ToolCard
              key={index}
              title={tool.title}
              variant={tool.variant as "primary" | "default"}
              isActive={activeIndex === index}
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
