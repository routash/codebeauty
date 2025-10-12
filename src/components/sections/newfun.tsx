"use client";
import { useState } from "react";
import { constants } from "@/utils/consitants/consitaint";
import { Heading } from "../ui/heading";
import { ToolCard } from "../ui/toolcard";

export function NewFun() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section
      className="
        relative py-10 px-6 md:px-8 
        bg-gradient-to-br from-[#f0f9ff] via-[#ecfdf5] to-[#fff7ed]
        rounded-3xl shadow-md overflow-hidden
        font-sans
      "
    >
      {/* Soft blurred background */}
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_25%_20%,rgba(56,189,248,0.15),transparent_60%),radial-gradient(circle_at_75%_80%,rgba(251,191,36,0.15),transparent_60%)] blur-lg" />

      <div className="relative z-10">
        <Heading title="New Functionality" align="left" />

        <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed max-w-2xl">
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {constants.newFundata.map((tool, index) => (
            <div
              key={index}
              className="
                relative group transition-all duration-500
                hover:scale-[1.04] hover:-translate-y-1
              "
            >
              {/* Glow effect behind on hover */}
              <div
                className="
                  absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                  bg-gradient-to-r from-blue-400/20 to-pink-400/20
                  blur-lg transition-all duration-500
                "
              ></div>

              <ToolCard
                title={tool.title}
                variant={tool.variant ?? "default"}
                isActive={selected === tool.title}
                onClick={() =>
                  setSelected(selected === tool.title ? null : tool.title)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
