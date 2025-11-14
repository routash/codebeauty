"use client"

import { SqlConverter } from "@/components/sections/sql-converters"
import { useParams } from "next/navigation"
import { notFound } from "next/navigation"

const validConverters = [
  "sql-to-csv",
  "sql-to-json",
  "sql-to-xml",
  "sql-to-yaml",
  "sql-to-html"
]

export default function ConverterPage() {
  const params = useParams()
  const converter = params.converter as string

  // Invalid converter check
  if (!validConverters.includes(converter)) {
    notFound()
  }

  return <SqlConverter defaultConverter={converter} />
}