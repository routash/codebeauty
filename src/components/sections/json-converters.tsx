"use client"

import { useState, useEffect } from "react"
import { ReusableSidebar, SidebarContentWrapper, SidebarOption } from "@/components/ui/reusable-sidebar"
import { Button } from "@/components/ui/button"
import { FileText, Settings, Palette, Download } from "lucide-react"
import Image from "next/image"

export function JsonConverters() {
  const [selectedConverter, setSelectedConverter] = useState("")
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")

  const converterOptions: SidebarOption[] = [
    { id: "json-to-java", label: "JSON to JAVA", icon: FileText, description: "Convert JSON data into Java class objects with fields and data types." },
    { id: "json-to-xml", label: "JSON to XML", icon: FileText, description: "Transform JSON objects into structured XML format." },
    { id: "json-to-yaml", label: "JSON to YAML", icon: FileText, description: "Convert JSON data into clean and human-readable YAML format." },
    { id: "json-to-csv", label: "JSON to CSV", icon: FileText, description: "Convert JSON arrays or objects into tabular CSV data." },
    { id: "json-to-tsv", label: "JSON to TSV", icon: FileText, description: "Convert JSON data into TSV (tab-separated values) format." },
    { id: "json-to-text", label: "JSON to Text", icon: FileText, description: "Flatten and convert JSON content into simple plain text format." },
    { id: "json-to-excel", label: "JSON to Excel", icon: FileText, description: "Export JSON data into Excel (.xlsx) spreadsheet format." },
    { id: "json-to-html", label: "JSON to HTML", icon: FileText, description: "Convert JSON objects into formatted HTML tables for web use." },
  ]

  const footerOptions: SidebarOption[] = [{ id: "settings", label: "Settings", icon: Settings }]

  // Auto-clear when converter changes
  useEffect(() => {
    setInputText("")
    setOutputText("")
  }, [selectedConverter])

  const selectedOption = converterOptions.find(opt => opt.id === selectedConverter)

  // Utility function to convert JSON
  const convertJson = (json: string, type: string) => {
    try {
      const parsed = JSON.parse(json)

      switch (type) {
        case "json-to-java":
          return Object.entries(parsed)
            .map(([key, value]) => {
              const jsType = typeof value
              let javaType = "String"
              if (jsType === "number") javaType = "double"
              else if (jsType === "boolean") javaType = "boolean"
              return `private ${javaType} ${key};`
            })
            .join("\n")
        case "json-to-xml":
          const jsonToXml = (obj: any, root = "root") =>
            `<${root}>` +
            Object.entries(obj)
              .map(([k, v]) => `<${k}>${v}</${k}>`)
              .join("") +
            `</${root}>`
          return jsonToXml(parsed)
        case "json-to-yaml":
          return Object.entries(parsed)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n")
        case "json-to-csv":
          const keys = Object.keys(parsed[0] || parsed)
          const rows = Array.isArray(parsed) ? parsed : [parsed]
          return [keys.join(","), ...rows.map(r => keys.map(k => r[k]).join(","))].join("\n")
        case "json-to-tsv":
          const tKeys = Object.keys(parsed[0] || parsed)
          const tRows = Array.isArray(parsed) ? parsed : [parsed]
          return [tKeys.join("\t"), ...tRows.map(r => tKeys.map(k => r[k]).join("\t"))].join("\n")
        case "json-to-text":
          return JSON.stringify(parsed, null, 2)
        case "json-to-excel":
          return "Excel export placeholder (implement XLSX library for full support)"
        case "json-to-html":
          const htmlKeys = Object.keys(parsed[0] || parsed)
          const htmlRows = Array.isArray(parsed) ? parsed : [parsed]
          return `<table border="1"><tr>${htmlKeys.map(k => `<th>${k}</th>`).join("")}</tr>${htmlRows
            .map(r => `<tr>${htmlKeys.map(k => `<td>${r[k]}</td>`).join("")}</tr>`)
            .join("")}</table>`
        default:
          return "Unsupported converter"
      }
    } catch (e) {
      return "Invalid JSON input"
    }
  }

  const handleConvert = () => {
    setOutputText(convertJson(inputText, selectedConverter))
  }

  const handleClear = () => {
    setInputText("")
    setOutputText("")
  }

  return (
    <ReusableSidebar
      title="JSON Converters"
      icon={Palette}
      options={converterOptions}
      selectedOption={selectedConverter}
      onOptionSelect={setSelectedConverter}
      footerOptions={footerOptions}
    >
      <SidebarContentWrapper selectedOption={selectedOption}>
        <div className="mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{selectedOption?.label}</h2>
            <p className="text-muted-foreground">{selectedOption?.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-sm font-medium mb-2 block">Input JSON</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="border-2 border-dashed border-gray-300 rounded-lg pt-2 px-4 w-full h-full"
                rows={10}
                placeholder="Paste your JSON here"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium mb-2 block">Output</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[200px] overflow-auto">
                {outputText ? <pre className="text-sm">{outputText}</pre> : <p className="text-gray-400">Converted output will appear here</p>}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Button onClick={handleConvert}>Convert</Button>
            <Button variant="outline" onClick={handleClear}>Clear</Button>
          </div>
        </div>
      </SidebarContentWrapper>
    </ReusableSidebar>
  )
}