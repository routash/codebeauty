"use client";
import { Heading } from "../ui/heading";
import { ToolCard } from "../ui/toolcard";
import { constants } from "@/utils/consitants/consitaint";

export function TrendingTools() {
    return (
        <section>
            <Heading title="Trending Tools" align="left" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" >
                {constants.trendingTools.map((tool, index) => (
                    <ToolCard key={index} title={tool.title} variant={tool.variant as "primary" | "default"} onClick={() => {}} />
                ))}
            </div>

        </section>
    );
}