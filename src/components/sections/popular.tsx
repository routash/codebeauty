"use client";
import { Heading } from "../ui/heading";
import { ToolCard } from "../ui/toolcard";
import { constants } from "@/utils/consitants/consitaint";

export function Popular() {
    return (
        <section>
            <Heading title="Popular Functionality" align="left" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" >
                {constants.tools.map((tool, index) => (
                    <ToolCard key={index} title={tool.title} variant={tool.variant as "primary" | "default"} onClick={() => {}} />
                ))}
            </div>

        </section>
    );
}