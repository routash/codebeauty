"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ReusableSidebar, SidebarContentWrapper, SidebarOption } from "@/components/ui/reusable-sidebar"
import { Button } from "@/components/ui/button"
import { FileText, Settings, Download, Palette } from "lucide-react"

const convertSqlData = (type: string, input: string) => {
  if (!input.trim()) return "Please enter SQL data to convert."

  try {
    const lines = input
      .trim()
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean)

    if (lines.length < 2) return "Invalid SQL-like data. Please provide headers and rows."

    const headers = lines[0].split(/\s*,\s*|\s*\|\s*/).map(h => h.trim())
    const rows = lines.slice(1).map(row =>
      row.split(/\s*,\s*|\s*\|\s*/).reduce((acc: any, val, i) => {
        acc[headers[i]] = val.trim()
        return acc
      }, {})
    )

    switch (type) {
      case "sql-to-csv":
        return [headers.join(","), ...rows.map(r => headers.map(h => r[h] || '').join(","))].join("\n")

      case "sql-to-json":
        return JSON.stringify(rows, null, 2)

      case "sql-to-xml":
        return (
          `<?xml version="1.0" encoding="UTF-8"?>\n<rows>\n` +
          rows
            .map(
              r =>
                `  <row>\n${headers
                  .map(h => `    <${h}>${r[h] || ''}</${h}>`)
                  .join("\n")}\n  </row>`
            )
            .join("\n") +
          `\n</rows>`
        )

      case "sql-to-yaml":
        return rows
          .map(
            r =>
              `- ${headers
                .map(h => `${h}: "${r[h] || ''}"`)
                .join("\n  ")}`
          )
          .join("\n")

      case "sql-to-html":
        return `<!DOCTYPE html>
<html>
<head>
  <style>
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; font-weight: bold; }
    tr:hover { background-color: #f5f5f5; }
  </style>
</head>
<body>
  <table>
    <thead>
      <tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>
    </thead>
    <tbody>
      ${rows
        .map(r => `<tr>${headers.map(h => `<td>${r[h] || ''}</td>`).join("")}</tr>`)
        .join("\n      ")}
    </tbody>
  </table>
</body>
</html>`

      default:
        return "Unknown conversion type."
    }
  } catch (err) {
    console.error(err)
    return "Error parsing input data. Please check your format."
  }
}

interface SqlConverterProps {
  defaultConverter?: string
}

export function SqlConverter({ defaultConverter = "" }: SqlConverterProps) {
  const router = useRouter()
  const [selectedConverter, setSelectedConverter] = useState(defaultConverter)
  const [inputValue, setInputValue] = useState("")
  const [output, setOutput] = useState("")

  // Update selected converter when URL changes
  useEffect(() => {
    if (defaultConverter) {
      setSelectedConverter(defaultConverter)
    }
  }, [defaultConverter])

  const converterOptions: SidebarOption[] = [
    {
      id: "sql-to-csv",
      label: "SQL to CSV Converter",
      icon: FileText,
      description: "Convert SQL query results or tables into downloadable CSV files."
    },
    {
      id: "sql-to-json",
      label: "SQL to JSON Converter",
      icon: FileText,
      description: "Transform SQL database data into structured JSON format."
    },
    {
      id: "sql-to-xml",
      label: "SQL to XML Converter",
      icon: FileText,
      description: "Convert SQL table data into well-formed XML documents."
    },
    {
      id: "sql-to-yaml",
      label: "SQL to YAML Converter",
      icon: FileText,
      description: "Convert SQL data into clean and readable YAML format."
    },
    {
      id: "sql-to-html",
      label: "SQL to HTML Converter",
      icon: FileText,
      description: "Convert SQL data into formatted HTML tables or web-friendly output."
    }
  ]

  const footerOptions: SidebarOption[] = [
    {
      id: "settings",
      label: "Settings",
      icon: Settings
    }
  ]

  const selectedOption = converterOptions.find(opt => opt.id === selectedConverter)

  // Handle converter change with auto-clear + URL navigation
  const handleConverterChange = (converterId: string) => {
    setSelectedConverter(converterId)
    setInputValue("")
    setOutput("")
    // Navigate to the converter URL
    router.push(`/sql-converters/${converterId}`)
  }

  const handleConvert = () => {
    if (!selectedConverter) {
      setOutput("Please select a converter from the sidebar.")
      return
    }
    const result = convertSqlData(selectedConverter, inputValue)
    setOutput(result)
  }

  const handleClear = () => {
    setInputValue("")
    setOutput("")
  }

  const handleDownload = () => {
    if (!output || output.includes("Please") || output.includes("Error")) {
      alert("No valid output to download!")
      return
    }

    const extensions: { [key: string]: string } = {
      "sql-to-csv": "csv",
      "sql-to-json": "json",
      "sql-to-xml": "xml",
      "sql-to-yaml": "yaml",
      "sql-to-html": "html"
    }

    const ext = extensions[selectedConverter] || "txt"
    const blob = new Blob([output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `converted-data.${ext}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <ReusableSidebar
      title="SQL Converter"
      icon={Palette}
      options={converterOptions}
      selectedOption={selectedConverter}
      onOptionSelect={handleConverterChange}
      footerOptions={footerOptions}
    >
      <SidebarContentWrapper selectedOption={selectedOption}>
        <div className="mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {selectedOption?.label || "Select a Converter"}
            </h2>
            <p className="text-muted-foreground">
              {selectedOption?.description || "Choose a converter from the sidebar to get started."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <label className="text-sm font-medium mb-2 block">Input SQL Data</label>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Example:\nname, age, city\nJohn, 25, Delhi\nAlice, 30, Mumbai`}
                className="border-2 border-dashed border-gray-300 rounded-lg pt-2 px-4 w-full h-full"
                rows={7}
              />
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <label className="text-sm font-medium mb-2 block">Output</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-sm min-h-[150px] overflow-auto bg-gray-50">
                {output ? (
                  <pre className="whitespace-pre-wrap break-all text-gray-800">{output}</pre>
                ) : (
                  <div className="text-gray-400 flex flex-col items-center justify-center h-full">
                    <Download className="h-8 w-8 mb-2" />
                    <p>Converted results will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Button 
              onClick={handleConvert}
              disabled={!selectedConverter || !inputValue.trim()}
            >
              Convert
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClear}
              disabled={!inputValue && !output}
            >
              Clear
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleDownload}
              disabled={!output || output.includes("Please") || output.includes("Error")}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </SidebarContentWrapper>
    </ReusableSidebar>
  )
}