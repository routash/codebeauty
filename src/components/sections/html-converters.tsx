"use client"

import { useState } from "react"
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
  RefreshCw,
  Copy,
} from "lucide-react"
import { stripHTML } from "@/utils/utils"

export function HtmlConverters() {
  const [selectedConverter, setSelectedConverter] = useState<string>("html-stripper")
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")

  // Sidebar options
  const converterOptions: SidebarOption[] = [
    {
      id: "html-stripper",
      label: "HTML Stripper",
      icon: FileText,
      description: "Remove all HTML tags from content to get plain text.",
    },
    {
      id: "html-to-json",
      label: "HTML to JSON",
      icon: FileText,
      description: "Transform HTML table data into JSON format.",
    },
    {
      id: "html-to-text",
      label: "HTML to Text",
      icon: FileText,
      description: "Extract plain text from HTML content.",
    },
  ]

  const footerOptions: SidebarOption[] = [
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const selectedOption = converterOptions.find(
    (opt) => opt.id === selectedConverter
  )

  // ✅ Convert Handler
  const handleConvert = () => {
    let result = ""

    switch (selectedConverter) {
      case "html-stripper":
      case "html-to-text":
        result = stripHTML(input)
        break

      case "html-to-json":
        result = JSON.stringify({ html: input }, null, 2)
        break

      default:
        result = "Coming Soon 🚧"
    }

    setOutput(result)
  }

  // ✅ Copy Handler
  const handleCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    alert("Copied to clipboard!")
  }

  const handleClear = () => {
    setInput("")
    setOutput("")
  }

  return (
    <ReusableSidebar
      title="HTML Converter Tools"
      icon={Palette}
      options={converterOptions}
      selectedOption={selectedConverter}
      onOptionSelect={setSelectedConverter}
      footerOptions={footerOptions}
    >
      <SidebarContentWrapper selectedOption={selectedOption}>
        <div className="mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {selectedOption?.label || "Select Converter"}
            </h2>
            <p className="text-muted-foreground">
              {selectedOption?.description}
            </p>
          </div>

          {/* ================= CONVERTER AREA ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Area */}
            <div>
              <label className="text-sm font-medium mb-2 block">Input</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your HTML or text here..."
                className="border-2 border-dashed border-gray-300 rounded-lg pt-2 px-4 w-full h-[400px]"
              />
            </div>

            {/* Output Area */}
            <div>
              <label className="text-sm font-medium mb-2 block">Output</label>
              <textarea
                readOnly
                value={output}
                placeholder="Converted output will appear here..."
                className="border-2 border-dashed border-gray-300 rounded-lg pt-2 px-4 w-full h-[400px]"
              />
              {output && (
                <Button
                  onClick={handleCopy}
                  className="mt-3 flex items-center gap-2"
                >
                  <Copy size={16} /> Copy
                </Button>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-2">
            <Button onClick={handleConvert}>
              <RefreshCw className="mr-2 h-4 w-4" /> Convert
            </Button>
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          </div>
        </div>
      </SidebarContentWrapper>
    </ReusableSidebar>
  )
}
