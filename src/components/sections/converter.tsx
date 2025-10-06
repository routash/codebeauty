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
  Code,
  Image,
  File,
  Settings,
  Download,
  Upload,
  Palette,
  RefreshCw,
  Copy,
} from "lucide-react"
import { base64ToImage, imageFileToBase64 } from "@/utils/utils"

export function Converter() {
  const [selectedConverter, setSelectedConverter] = useState<string>("Base64")
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")

  const converterOptions: SidebarOption[] = [
    {
      id: "Base64",
      label: "Base64 To Image",
      icon: FileText,
      description: "Convert Base64 string to image format",
    },
    {
      id: "code",
      label: "Image to Base64",
      icon: Code,
      description: "Convert images to Base64 string format",
    },
    {
      id: "image",
      label: "Image Converter",
      icon: Image,
      description: "Convert image formats (JPG → PNG etc.)",
    },
    {
      id: "file",
      label: "File Converter",
      icon: File,
      description: "Convert files between different formats",
    },
  ]

  const footerOptions: SidebarOption[] = [
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ]

  const selectedOption = converterOptions.find(
    (opt) => opt.id === selectedConverter
  )

  // ✅ Base64 → Image
  const handleBase64ToImage = () => {
    try {
      const url = base64ToImage(input)
      setOutput(url)
    } catch (err) {
      alert("Invalid Base64 string!")
    }
  }

  // ✅ Image → Base64
  const handleImageToBase64 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const base64 = await imageFileToBase64(file)
    setOutput(base64)
  }

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
      title="Converter Tools"
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

          {/* ================= BASE64 → IMAGE ================= */}
          {selectedConverter === "Base64" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Enter Base64 String
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste Base64 string here"
                  className="border-2 border-dashed border-gray-300 rounded-lg pt-2 px-4 w-full h-[400px]"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Converted Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-[400px] flex items-center justify-center">
                  {output ? (
                    <img
                      src={output}
                      alt="Converted"
                      className="max-h-80 object-contain mx-auto"
                    />
                  ) : (
                    <>
                      <Download className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        Converted image will appear here
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= IMAGE → BASE64 ================= */}
          {selectedConverter === "code" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Upload Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500 mb-3">
                    Select an image to convert
                  </p>
                  <input type="file" accept="image/*" onChange={handleImageToBase64} />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Base64 Output
                </label>
                <textarea
                  readOnly
                  value={output}
                  placeholder="Base64 string will appear here"
                  className="border-2 border-dashed border-gray-300 rounded-lg pt-2 px-4 w-full h-[400px]"
                />
                {output && (
                  <Button onClick={handleCopy} className="mt-3 flex items-center gap-2">
                    <Copy size={16} /> Copy
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* ================= IMAGE CONVERTER (Placeholder) ================= */}
          {selectedConverter === "image" && (
            <div className="text-center border-2 border-dashed border-gray-300 rounded-lg p-12">
              <p className="text-lg font-medium mb-2">Image Converter Coming Soon 🚧</p>
              <p className="text-sm text-gray-500">
                This section will support JPG ↔ PNG conversions.
              </p>
            </div>
          )}

          {/* ================= FILE CONVERTER (Placeholder) ================= */}
          {selectedConverter === "file" && (
            <div className="text-center border-2 border-dashed border-gray-300 rounded-lg p-12">
              <p className="text-lg font-medium mb-2">File Converter Coming Soon 📁</p>
              <p className="text-sm text-gray-500">
                This section will allow DOCX ↔ PDF or TXT conversions.
              </p>
            </div>
          )}

          {/* ================= Buttons ================= */}
          <div className="mt-6 flex gap-2">
            {selectedConverter === "Base64" && (
              <Button onClick={handleBase64ToImage}>
                <RefreshCw className="mr-2 h-4 w-4" /> Convert
              </Button>
            )}
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          </div>
        </div>
      </SidebarContentWrapper>
    </ReusableSidebar>
  )
}
