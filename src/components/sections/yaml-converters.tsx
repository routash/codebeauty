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

// Props interface
interface YamlConvertersProps {
  defaultTool?: string
}

export function YamlConverters({ defaultTool = "" }: YamlConvertersProps) {
  const [selectedConverter, setSelectedConverter] = useState<string>(defaultTool)
  const [inputText, setInputText] = useState<string>("")
  const [outputText, setOutputText] = useState<string>("")

  // Sidebar options
  const converterOptions: SidebarOption[] = [
    {
      id: "yaml-to-json",
      label: "YAML to JSON",
      icon: FileText,
      description: "Convert YAML data into structured JSON format.",
    },
    {
      id: "yaml-to-xml",
      label: "YAML to XML",
      icon: FileText,
      description: "Convert YAML into clean XML structure.",
    },
    {
      id: "yaml-to-csv",
      label: "YAML to CSV",
      icon: FileText,
      description: "Convert YAML objects or arrays into CSV format.",
    },
    {
      id: "yaml-to-tsv",
      label: "YAML to TSV",
      icon: FileText,
      description: "Convert YAML into tab-separated values format.",
    },
    {
      id: "yaml-to-text",
      label: "YAML to Text",
      icon: FileText,
      description: "Flatten and export YAML content as plain text.",
    },
    {
      id: "yaml-to-html",
      label: "YAML to HTML",
      icon: FileText,
      description: "Convert YAML into structured HTML table format.",
    },
  ]

  const footerOptions: SidebarOption[] = [
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const selectedOption = converterOptions.find(
    (opt) => opt.id === selectedConverter
  )

  // Reset text areas when converter changes
  useEffect(() => {
    setInputText("")
    setOutputText("")
  }, [selectedConverter])

  // --- Conversion Logic ---
  const convertYaml = (yaml: string, type: string): string => {
    try {
      // Simple YAML parser (works for key: value pairs)
      const lines = yaml.split("\n")
      const obj: Record<string, any> = {}
      lines.forEach((line) => {
        const [key, value] = line.split(":").map((x) => x.trim())
        if (key) obj[key] = value
      })

      switch (type) {
        case "yaml-to-json":
          return JSON.stringify(obj, null, 2)

        case "yaml-to-xml":
          return (
            "<root>" +
            Object.entries(obj)
              .map(([k, v]) => `<${k}>${v}</${k}>`)
              .join("") +
            "</root>"
          )

        case "yaml-to-csv": {
          const keys = Object.keys(obj)
          const values = Object.values(obj)
          return keys.join(",") + "\n" + values.join(",")
        }

        case "yaml-to-tsv": {
          const keys = Object.keys(obj)
          const values = Object.values(obj)
          return keys.join("\t") + "\n" + values.join("\t")
        }

        case "yaml-to-text":
          return Object.entries(obj)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n")

        case "yaml-to-html":
          return `<table border="1"><tr>${Object.keys(obj)
            .map((k) => `<th>${k}</th>`)
            .join("")}</tr><tr>${Object.values(obj)
            .map((v) => `<td>${v}</td>`)
            .join("")}</tr></table>`

        default:
          return "Unsupported conversion type"
      }
    } catch (err) {
      return "❌ Invalid YAML input"
    }
  }

  // --- Handlers ---
  const handleConvert = () => {
    if (!selectedConverter) {
      alert("Please select a converter from the sidebar.")
      return
    }
    setOutputText(convertYaml(inputText, selectedConverter))
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

  // --- UI ---
  return (
    <ReusableSidebar
      title="YAML Converters"
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
                Input YAML
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="border-2 border-dashed border-gray-300 rounded-lg pt-2 px-4 w-full h-full"
                rows={10}
                placeholder="Paste your YAML here..."
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

export default YamlConverters
