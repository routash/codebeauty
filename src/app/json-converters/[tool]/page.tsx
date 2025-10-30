"use client";

import { JsonConverters } from "@/components/sections/json-converters";
import { notFound, useParams } from "next/navigation";

const validTools = [
  "json-to-java",
  "json-to-xml",
  "json-to-yaml",
  "json-to-csv",
  "json-to-tsv",
  "json-to-text",
  "json-to-excel",
  "json-to-html",
];

export default function ToolPage() {
  const params = useParams();
  const tool = params?.tool as string;

  if (!validTools.includes(tool)) {
    notFound();
  }

  return <JsonConverters defaultTool={tool} />;
}
