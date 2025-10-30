// components/sections/base64-tools.tsx
"use client"

import React, { useEffect, useState } from "react"
import { ReusableSidebar, SidebarContentWrapper, SidebarOption } from "@/components/ui/reusable-sidebar"
import { Button } from "@/components/ui/button"
import {
  Upload,
  Download,
  Palette,
  Image as ImgIcon,
  FileText,
  Settings,
} from "lucide-react"

type Props = {
  defaultTool?: string
}

export function Base64Tools({ defaultTool = "text-to-base64" }: Props) {
  const [selectedConverter, setSelectedConverter] = useState<string>(defaultTool)
  const [inputValue, setInputValue] = useState<string>("")
  const [outputValue, setOutputValue] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)

  // converter options
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

  useEffect(() => {
    // when defaultTool prop changes from parent, update local selection
    setSelectedConverter(defaultTool)
    // clear values when selection changes
    setInputValue("")
    setOutputValue("")
    setFile(null)
  }, [defaultTool])

  const handleConvert = () => {
    if (!selectedConverter) return

    try {
      // IMAGE -> BASE64 (FileReader)
      if (selectedConverter === "image-to-base64" && file) {
        const reader = new FileReader()
        reader.onload = () => {
          setOutputValue(String(reader.result || ""))
          // keep file until user clears explicitly (optional)
        }
        reader.readAsDataURL(file)
      }
      // BASE64 -> IMAGE (just set output so <img src=.../> shows)
      else if (selectedConverter === "base64-to-image") {
        setOutputValue(inputValue)
      }
      // BINARY -> BASE64 (expects groups of 8 bits separated or not)
      else if (selectedConverter === "binary-to-base64") {
        const binaryStr = inputValue.replace(/\s/g, "")
        const bytes = binaryStr.match(/.{1,8}/g) || []
        const text = bytes.map(bin => String.fromCharCode(parseInt(bin, 2))).join("")
        setOutputValue(btoa(text))
      }
      // BASE64 -> BINARY
      else if (selectedConverter === "base64-to-binary") {
        const decoded = atob(inputValue)
        const binary = decoded.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ")
        setOutputValue(binary)
      }
      // HEX -> BASE64
      else if (selectedConverter === "hex-to-base64") {
        const hex = inputValue.replace(/\s/g, "")
        const bytes = hex.match(/.{1,2}/g) || []
        const text = bytes.map(byte => String.fromCharCode(parseInt(byte, 16))).join("")
        setOutputValue(btoa(text))
      }
      // BASE64 -> HEX
      else if (selectedConverter === "base64-to-hex") {
        const decoded = atob(inputValue)
        const hex = decoded.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ")
        setOutputValue(hex.toUpperCase())
      }
      // OCTAL -> BASE64
      else if (selectedConverter === "octal-to-base64") {
        const octal = inputValue.replace(/\s/g, "")
        const bytes = octal.match(/.{1,3}/g) || []
        const text = bytes.map(o => String.fromCharCode(parseInt(o, 8))).join("")
        setOutputValue(btoa(text))
      }
      // BASE64 -> OCTAL
      else if (selectedConverter === "base64-to-octal") {
        const decoded = atob(inputValue)
        const oct = decoded.split("").map(c => c.charCodeAt(0).toString(8).padStart(3, "0")).join(" ")
        setOutputValue(oct)
      }
      // Generic: TEXT/JSON/HTML/CSS/JS -> BASE64
      else if (selectedConverter.includes("to-base64")) {
        // use encodeURIComponent to preserve unicode
        setOutputValue(btoa(unescape(encodeURIComponent(inputValue))))
      }
      // Generic: BASE64 -> text/html/json...
      else if (selectedConverter.includes("base64-to")) {
        setOutputValue(decodeURIComponent(escape(atob(inputValue))))
      } else {
        setOutputValue("⚠️ Unsupported converter or missing input.")
      }
    } catch (err) {
      console.error("Conversion error:", err)
      setOutputValue("⚠️ Conversion failed. Check input format.")
    }
  }

  const handleOptionChange = (optionId: string) => {
    setSelectedConverter(optionId)
    setInputValue("")
    setOutputValue("")
    setFile(null)
  }

  const handleClear = () => {
    setInputValue("")
    setOutputValue("")
    setFile(null)
  }

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
      onOptionSelect={handleOptionChange}
      footerOptions={footerOptions}
    >
      <SidebarContentWrapper selectedOption={selectedOption}>
        <div className="mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold">{selectedOption?.label || "Select a tool"}</h2>
            <p className="text-sm text-muted-foreground">{selectedOption?.description || ""}</p>
          </div>

          {/* Input + Output */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Input</label>
              {selectedConverter === "image-to-base64" ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {/* IMPORTANT: do NOT set `value` on file inputs */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  {file && <p className="mt-2 text-sm">Selected: {file.name}</p>}
                </div>
              ) : (
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter text, hex, binary or Base64 here..."
                  className="border-2 border-dashed border-gray-300 rounded-lg p-3 w-full"
                  rows={8}
                />
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Output</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[12rem]">
                {selectedConverter === "base64-to-image" && outputValue ? (
                  // show image if result is data URL
                  <img src={outputValue} alt="Decoded" className="mx-auto max-h-60 rounded-lg" />
                ) : (
                  <textarea
                    readOnly
                    value={outputValue}
                    className="border-none bg-transparent resize-none w-full h-full text-sm"
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
            <Button variant="outline" onClick={handleClear}>Clear</Button>
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

export default Base64Tools
