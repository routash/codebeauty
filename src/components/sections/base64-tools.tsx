"use client"

import { useState } from "react"
import { ReusableSidebar, SidebarContentWrapper, SidebarOption } from "@/components/ui/reusable-sidebar"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Settings,
  Upload,
  Download,
  Palette,
  Image as ImgIcon
} from "lucide-react"

export function Base64Tools() {
  const [selectedConverter, setSelectedConverter] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [outputValue, setOutputValue] = useState("")
  const [file, setFile] = useState<File | null>(null)

  // 🧩 All Converter Options
  const converterOptions: SidebarOption[] = [
    { id: "image-to-base64", label: "Image to Base64", icon: ImgIcon, description: "Convert images into Base64 string." },
    { id: "base64-to-image", label: "Base64 to Image", icon: ImgIcon, description: "Convert Base64 string back to image." },
    { id: "png-to-base64", label: "PNG to Base64", icon: FileText },
    { id: "jpg-to-base64", label: "JPG to Base64", icon: FileText },
    { id: "json-to-base64", label: "JSON to Base64", icon: FileText },
    { id: "xml-to-base64", label: "XML to Base64", icon: FileText },
    { id: "yaml-to-base64", label: "YAML to Base64", icon: FileText },
    { id: "base64-to-json", label: "Base64 to JSON", icon: FileText },
    { id: "base64-to-xml", label: "Base64 to XML", icon: FileText },
    { id: "base64-to-yaml", label: "Base64 to YAML", icon: FileText },
    { id: "csv-to-base64", label: "CSV to Base64", icon: FileText },
    { id: "base64-to-csv", label: "Base64 to CSV", icon: FileText },
    { id: "tsv-to-base64", label: "TSV to Base64", icon: FileText },
    { id: "base64-to-tsv", label: "Base64 to TSV", icon: FileText },
    { id: "binary-to-base64", label: "Binary to Base64", icon: FileText },
    { id: "base64-to-binary", label: "Base64 to Binary", icon: FileText },
    { id: "hex-to-base64", label: "Hex to Base64", icon: FileText },
    { id: "base64-to-hex", label: "Base64 to Hex", icon: FileText },
    { id: "octal-to-base64", label: "Octal to Base64", icon: FileText },
    { id: "base64-to-octal", label: "Base64 to Octal", icon: FileText },
    { id: "html-to-base64", label: "HTML to Base64", icon: FileText },
    { id: "base64-to-html", label: "Base64 to HTML", icon: FileText },
    { id: "css-to-base64", label: "CSS to Base64", icon: FileText },
    { id: "base64-to-css", label: "Base64 to CSS", icon: FileText },
    { id: "javascript-to-base64", label: "JavaScript to Base64", icon: FileText },
    { id: "base64-to-javascript", label: "Base64 to JavaScript", icon: FileText },
    { id: "ascii-to-base64", label: "ASCII to Base64", icon: FileText },
    { id: "base64-to-ascii", label: "Base64 to ASCII", icon: FileText },
    { id: "text-to-base64", label: "Text to Base64", icon: FileText },
    { id: "base64-to-text", label: "Base64 to Text", icon: FileText },
    { id: "svg-to-base64", label: "SVG to Base64", icon: FileText },
    { id: "bmp-to-base64", label: "BMP to Base64", icon: FileText },
    { id: "gif-to-base64", label: "GIF to Base64", icon: FileText },
    { id: "webp-to-base64", label: "WebP to Base64", icon: FileText },
    { id: "avif-to-base64", label: "AVIF to Base64", icon: FileText },
    { id: "apng-to-base64", label: "APNG to Base64", icon: FileText },
  ]

  const footerOptions: SidebarOption[] = [
    { id: "settings", label: "Settings", icon: Settings }
  ]

  const selectedOption = converterOptions.find(opt => opt.id === selectedConverter)

  // 🔁 Convert Handler
  const handleConvert = () => {
    if (!selectedConverter) return

    try {
      // 📷 Image Upload -> Base64
      if (selectedConverter.includes("image-to-base64") && file) {
        const reader = new FileReader()
        reader.onload = () => setOutputValue(reader.result as string)
        reader.readAsDataURL(file)
      }
      // 🖼 Base64 -> Image
      else if (selectedConverter === "base64-to-image") {
        setOutputValue(inputValue)
      }
      // 🧾 Text, HTML, JSON, etc. -> Base64
      else if (selectedConverter.includes("to-base64")) {
        setOutputValue(btoa(unescape(encodeURIComponent(inputValue))))
      }
      // 🔡 Base64 -> Text, HTML, JSON, etc.
      else if (selectedConverter.includes("base64-to")) {
        setOutputValue(decodeURIComponent(escape(atob(inputValue))))
      }
    } catch (err) {
      setOutputValue("⚠️ Conversion failed. Invalid format or data.")
    }
  }

  // 🧹 Clear All
  const handleClear = () => {
    setInputValue("")
    setOutputValue("")
    setFile(null)
  }

  // 💾 Download Result
  const handleDownload = () => {
    if (!outputValue) return
    const blob = new Blob([outputValue], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${selectedConverter || "converted"}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ReusableSidebar
      title="Base64 Tools"
      icon={Palette}
      options={converterOptions}
      selectedOption={selectedConverter}
      onOptionSelect={setSelectedConverter}
      footerOptions={footerOptions}
    >
      <SidebarContentWrapper selectedOption={selectedOption}>
        <div className="mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold">{selectedOption?.label}</h2>
            <p className="text-muted-foreground">{selectedOption?.description}</p>
          </div>

          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Input</label>
              {selectedConverter.includes("image-to-base64") ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </div>
              ) : (
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter text or Base64 here..."
                  className="border-2 border-dashed border-gray-300 rounded-lg p-3 w-full"
                  rows={6}
                />
              )}
            </div>

            {/* Output Section */}
            <div>
              <label className="text-sm font-medium mb-2 block">Output</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {selectedConverter === "base64-to-image" && outputValue ? (
                  <img
                    src={outputValue}
                    alt="Decoded"
                    className="mx-auto max-h-60 rounded-lg"
                  />
                ) : (
                  <textarea
                    readOnly
                    value={outputValue}
                    className="border-none bg-transparent resize-none w-full h-48 text-sm"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleConvert}>
              <Upload className="h-4 w-4 mr-2" /> Convert
            </Button>
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
            {outputValue && (
              <Button variant="secondary" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" /> Download Result
              </Button>
            )}
          </div>
        </div>
      </SidebarContentWrapper>
    </ReusableSidebar>
  )
}
