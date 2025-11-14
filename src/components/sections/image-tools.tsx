"use client"

import { useState, useEffect } from "react"
import { ReusableSidebar, SidebarContentWrapper, SidebarOption } from "@/components/ui/reusable-sidebar"
import { Button } from "@/components/ui/button"
import { Upload, Download, Image as ImgIcon, Settings, Palette } from "lucide-react"

export function ImageTools({ defaultTool = "" }: { defaultTool?: string }) {
  const [selectedTool, setSelectedTool] = useState(defaultTool)
  const [inputFile, setInputFile] = useState<File | null>(null)
  const [outputUrl, setOutputUrl] = useState("")

  useEffect(() => {
    setSelectedTool(defaultTool)
  }, [defaultTool])

  const imageTools: SidebarOption[] = [
    { id: "jpg-to-png", label: "JPG to PNG", icon: ImgIcon, description: "Convert JPG image to PNG format." },
    { id: "png-to-jpg", label: "PNG to JPG", icon: ImgIcon, description: "Convert PNG image to JPG format." },
    { id: "bmp-to-png", label: "BMP to PNG", icon: ImgIcon, description: "Convert BMP image to PNG format." },
    { id: "gif-splitter", label: "GIF Splitter", icon: ImgIcon, description: "Split GIF into individual frames." },
    { id: "gif-viewer", label: "GIF Viewer", icon: ImgIcon, description: "View and analyze animated GIFs." },
  ]

  const footerOptions: SidebarOption[] = [{ id: "settings", label: "Settings", icon: Settings }]

  const selectedOption = imageTools.find((opt) => opt.id === selectedTool)

  const handleToolChange = (optionId: string) => {
    setSelectedTool(optionId)
    setInputFile(null)
    setOutputUrl("")
  }

  const handleConvert = () => {
    if (!inputFile) {
      alert("Please select a file first.")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setOutputUrl(e.target?.result as string)
    }
    reader.readAsDataURL(inputFile)
  }

  const handleDownload = () => {
    if (!outputUrl) return
    const link = document.createElement("a")
    link.href = outputUrl
    link.download = `${selectedTool || "converted"}.png`
    link.click()
  }

  return (
    <ReusableSidebar
      title="Image Tools"
      icon={Palette}
      options={imageTools}
      selectedOption={selectedTool}
      onOptionSelect={handleToolChange}
      footerOptions={footerOptions}
    >
      <SidebarContentWrapper selectedOption={selectedOption}>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">{selectedOption?.label}</h2>
            <p className="text-muted-foreground">{selectedOption?.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Upload Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setInputFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Preview / Output</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {outputUrl ? (
                  <img src={outputUrl} alt="Converted Preview" className="mx-auto max-h-60 rounded-lg" />
                ) : (
                  <p className="text-muted-foreground">No output yet</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleConvert}>
              <Upload className="h-4 w-4 mr-2" /> Convert
            </Button>
            {outputUrl && (
              <Button variant="secondary" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
            )}
          </div>
        </div>
      </SidebarContentWrapper>
    </ReusableSidebar>
  )
}

export default ImageTools
