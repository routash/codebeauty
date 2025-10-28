"use client"

import { useState } from "react"
import { ReusableSidebar, SidebarContentWrapper, SidebarOption } from "@/components/ui/reusable-sidebar"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Settings,
  Download,
  Palette
} from "lucide-react"
import * as YAML from "js-yaml"
import * as xmljs from "xml-js"
import * as Papa from "papaparse"
import * as XLSX from "xlsx"

export function YamlConverters() {
  const [selectedConverter, setSelectedConverter] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [output, setOutput] = useState("")

  const converterOptions: SidebarOption[] = [
    {
      id: "yaml-converter",
      label: "YAML Converter",
      icon: FileText,
      description: "All-in-one YAML conversion tool to transform YAML data into various formats."
    },
    {
      id: "yaml-to-xml",
      label: "YAML to XML",
      icon: FileText,
      description: "Convert YAML content into well-structured XML format."
    },
    {
      id: "yaml-to-json",
      label: "YAML to JSON",
      icon: FileText,
      description: "Transform YAML data into JSON format for web and API use."
    },
    {
      id: "yaml-to-csv",
      label: "YAML to CSV",
      icon: FileText,
      description: "Convert YAML structured data into CSV format for spreadsheets."
    },
    {
      id: "yaml-to-excel",
      label: "YAML to Excel",
      icon: FileText,
      description: "Export YAML data directly into Excel (.xlsx) spreadsheets."
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

  // Clear inputs when converter changes
  const handleConverterChange = (converterId: string) => {
    setSelectedConverter(converterId)
    setInputValue("")
    setOutput("")
  }

  const handleConvert = () => {
    if (!selectedConverter || !inputValue) {
      setOutput("⚠️ Please select a converter and enter YAML input.")
      return
    }

    try {
      // Parse YAML input first
      const yamlData = YAML.load(inputValue)

      let result = ""
      switch (selectedConverter) {
        case "yaml-to-json":
          result = JSON.stringify(yamlData, null, 2)
          break

        case "yaml-to-xml":
          result = xmljs.json2xml(JSON.stringify(yamlData), { compact: true, spaces: 2 })
          break

        case "yaml-to-csv":
          if (Array.isArray(yamlData)) {
            result = Papa.unparse(yamlData)
          } else {
            result = Papa.unparse([yamlData])
          }
          break

        case "yaml-to-excel":
          const ws = XLSX.utils.json_to_sheet(Array.isArray(yamlData) ? yamlData : [yamlData])
          const wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
          XLSX.writeFile(wb, "converted.xlsx")
          result = "✅ Excel file has been downloaded (converted.xlsx)"
          break

        default:
          result = "Select a valid YAML converter option."
          break
      }

      setOutput(result)
    } catch (error: any) {
      setOutput("❌ Conversion failed: " + error.message)
    }
  }

  const handleClear = () => {
    setInputValue("")
    setOutput("")
  }

  return (
    <ReusableSidebar
      title="YAML Converters"
      icon={Palette}
      options={converterOptions}
      selectedOption={selectedConverter}
      onOptionSelect={handleConverterChange}
      footerOptions={footerOptions}
    >
      <SidebarContentWrapper selectedOption={selectedOption}>
        <div className="mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{selectedOption?.label}</h2>
            <p className="text-muted-foreground">{selectedOption?.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input */}
            <div>
              <label className="text-sm font-medium mb-2 block">Input (YAML)</label>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter YAML content here..."
                className="border-2 border-dashed border-gray-300 rounded-lg p-3 w-full font-mono"
                rows={10}
              />
            </div>

            {/* Output */}
            <div>
              <label className="text-sm font-medium mb-2 block">Output</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 h-[260px] overflow-auto bg-gray-50">
                {output ? (
                  <pre className="text-sm text-left whitespace-pre-wrap">{output}</pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Download className="h-6 w-6 mb-2" />
                    <p>Converted output will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-2">
            <Button onClick={handleConvert}>Convert</Button>
            <Button variant="outline" onClick={handleClear}>Clear</Button>
          </div>
        </div>
      </SidebarContentWrapper>
    </ReusableSidebar>
  )
}