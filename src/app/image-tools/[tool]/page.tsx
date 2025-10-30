"use client"

import { ImageTools } from "@/components/sections/image-tools"
import { useParams } from "next/navigation"
import { notFound } from "next/navigation"

const validTools = [
  "jpg-to-png",
  "png-to-jpg",
  "bmp-to-png",
  "gif-splitter",
  "gif-viewer",
]

export default function ToolPage() {
  const params = useParams()
  const tool = params.tool as string

  if (!validTools.includes(tool)) {
    notFound()
  }

  return <ImageTools defaultTool={tool} />
}
