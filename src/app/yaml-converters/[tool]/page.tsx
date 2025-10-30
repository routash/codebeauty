"use client"

import { YamlConverters } from "@/components/sections/yaml-converters"
import { useParams } from "next/navigation"
import { notFound } from "next/navigation"

const validTools = [
  "yaml-to-json",
  "yaml-to-xml",
  "yaml-to-csv",
  "yaml-to-tsv",
  "yaml-to-text",
  "yaml-to-html",
]

export default function ToolPage() {
  const params = useParams()
  const tool = params.tool as string

  if (!validTools.includes(tool)) {
    notFound()
  }

  return <YamlConverters defaultTool={tool} />
}
