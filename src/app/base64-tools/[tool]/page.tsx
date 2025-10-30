// app/tools/[tool]/page.tsx
"use client"

import React from "react"
import { Base64Tools } from "@/components/sections/base64-tools"
import { useParams } from "next/navigation"
import { notFound } from "next/navigation"

const validTools = [
  "image-to-base64",
  "base64-to-image",
  "png-to-base64",
  "jpg-to-base64",
  "json-to-base64",
  "xml-to-base64",
  "yaml-to-base64",
  "base64-to-json",
  "base64-to-xml",
  "base64-to-yaml",
  "csv-to-base64",
  "base64-to-csv",
  "tsv-to-base64",
  "base64-to-tsv",
  "binary-to-base64",
  "base64-to-binary",
  "hex-to-base64",
  "base64-to-hex",
  "octal-to-base64",
  "more-base64-tools",
]

export default function ToolPage() {
  const params = useParams()
  const tool = (params?.tool || "") as string

  if (!validTools.includes(tool)) {
    // show 404 if invalid tool
    notFound()
  }

  // pass as defaultTool (note spelling!)
  return <Base64Tools defaultTool={tool} />
}
