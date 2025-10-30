"use client"

import { useState, useEffect } from "react"
import {
  ReusableSidebar,
  SidebarContentWrapper,
  SidebarOption,
} from "@/components/ui/reusable-sidebar"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Settings,
  Palette,
  Download,
  RotateCcw,
} from "lucide-react"

interface JsonConvertersProps {
  defaultTool?: string
}

export function JsonConverters({ defaultTool = "" }: JsonConvertersProps) {
  const [selectedConverter, setSelectedConverter] = useState<string>(defaultTool)
  const [inputText, setInputText] = useState<string>("")
  const [outputText, setOutputText] = useState<string>("")

  // ✅ Converter options
  const converterOptions: SidebarOption[] = [
    {
      id: "json-to-java",
      label: "JSON to JAVA",
      icon: FileText,
      description:
        "Convert JSON data into Java class objects with fields and data types.",
    },
    {
      id: "json-to-xml",
      label: "JSON to XML",
      icon: FileText,
      description: "Transform JSON objects into structured XML format.",
    },
    {
      id: "json-to-yaml",
      label: "JSON to YAML",
      icon: FileText,
      description:
        "Convert JSON data into clean and human-readable YAML format.",
    },
    {
      id: "json-to-csv",
      label: "JSON to CSV",
      icon: FileText,
      description: "Convert JSON arrays or objects into tabular CSV data.",
    },
    {
      id: "json-to-tsv",
      label: "JSON to TSV",
      icon: FileText,
      description:
        "Convert JSON data into TSV (tab-separated values) format.",
    },
    {
      id: "json-to-text",
      label: "JSON to Text",
      icon: FileText,
      description:
        "Flatten and convert JSON content into simple plain text format.",
    },
    {
      id: "json-to-excel",
      label: "JSON to Excel",
      icon: FileText,
      description:
        "Export JSON data into Excel (.xlsx) spreadsheet format.",
    },
    {
      id: "json-to-html",
      label: "JSON to HTML",
      icon: FileText,
      description:
        "Convert JSON objects into formatted HTML tables for web use.",
    },
  ]

  const footerOptions: SidebarOption[] = [
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const selectedOption = converterOptions.find(
    (opt) => opt.id === selectedConverter
  )

  // ✅ Reset input/output on converter change
  useEffect(() => {
    setInputText("")
    setOutputText("")
  }, [selectedConverter])

  // ✅ Conversion Logic
  const convertJson = (json: string, type: string): string => {
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

        case "json-to-xml": {
          const jsonToXml = (obj: any, root = "root"): string =>
            `<${root}>` +
            Object.entries(obj)
              .map(([k, v]) =>
                typeof v === "object"
                  ? jsonToXml(v, k)
                  : `<${k}>${v}</${k}>`
              )
              .join("") +
            `</${root}>`
          return jsonToXml(parsed)
        }

        case "json-to-yaml":
          return Object.entries(parsed)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n")

        case "json-to-csv": {
          const arr = Array.isArray(parsed) ? parsed : [parsed]
          const keys = Object.keys(arr[0] || {})
          const rows = arr.map((obj) => keys.map((k) => obj[k]).join(","))
          return [keys.join(","), ...rows].join("\n")
        }

        case "json-to-tsv": {
          const arr = Array.isArray(parsed) ? parsed : [parsed]
          const keys = Object.keys(arr[0] || {})
          const rows = arr.map((obj) => keys.map((k) => obj[k]).join("\t"))
          return [keys.join("\t"), ...rows].join("\n")
        }

        case "json-to-text":
          return JSON.stringify(parsed, null, 2)

        case "json-to-html": {
          const arr = Array.isArray(parsed) ? parsed : [parsed]
          const keys = Object.keys(arr[0] || {})
          const rows = arr
            .map(
              (obj) =>
                `<tr>${keys.map((k) => `<td>${obj[k]}</td>`).join("")}</tr>`
            )
            .join("")
          return `<table border="1"><tr>${keys
            .map((k) => `<th>${k}</th>`)
            .join("")}</tr>${rows}</table>`
        }

        case "json-to-excel":
          return "Excel export feature placeholder (use XLSX library for real export)."

        default:
          return "Unsupported converter"
      }
    } catch (e) {
      return "❌ Invalid JSON input"
    }
  }

  // ✅ Handlers
  const handleConvert = () => {
    if (!selectedConverter) {
      alert("Please select a converter from the sidebar.")
      return
    }
    setOutputText(convertJson(inputText, selectedConverter))
  }

  const handleClear = () => {
    setInputText("")
    setOutputText("")
  }

  const handleDownload = () => {
    if (!outputText) return
    const blob = new Blob([outputText], { type: "text/plain" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${selectedConverter || "converted"}.txt`
    link.click()
  }

  // ✅ UI
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
            <h2 className="text-2xl font-bold mb-2">
              {selectedOption?.label || "Select a Converter"}
            </h2>
            <p className="text-muted-foreground">
              {selectedOption?.description ||
                "Choose a conversion type from the sidebar to begin."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <label className="text-sm font-medium mb-2 block">
                Input JSON
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="border-2 border-dashed border-gray-300 rounded-lg pt-2 px-4 w-full h-full"
                rows={10}
                placeholder="Paste your JSON here..."
              />
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <label className="text-sm font-medium mb-2 block">Output</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[200px] overflow-auto bg-gray-50">
                {outputText ? (
                  <pre className="text-sm whitespace-pre-wrap break-words">
                    {outputText}
                  </pre>
                ) : (
                  <p className="text-gray-400">
                    Converted output will appear here
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={handleConvert}>Convert</Button>
            <Button variant="outline" onClick={handleClear}>
              <RotateCcw className="w-4 h-4 mr-1" /> Clear
            </Button>
            {outputText && (
              <Button variant="secondary" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-1" /> Download
              </Button>
            )}
          </div>
        </div>
      </SidebarContentWrapper>
    </ReusableSidebar>
  )
}

export default JsonConverters
