"use client"

import { useState } from "react"
import Image from "next/image"
import { ReusableSidebar, SidebarContentWrapper, SidebarOption } from "@/components/ui/reusable-sidebar"
import { Button } from "@/components/ui/button"
import { FileText, Image as ImageIcon, Settings, Download, Palette, Upload } from "lucide-react"

export function ImageTools() {
  const [selectedConverter, setSelectedConverter] = useState("")
  const [inputFile, setInputFile] = useState<File | null>(null)
  const [outputUrl, setOutputUrl] = useState<string>("")

  const converterOptions: SidebarOption[] = [
    { id: "jpg-to-png", label: "JPG to PNG", icon: FileText, description: "Convert JPG or JPEG images into high-quality PNG format." },
    { id: "png-to-jpg", label: "PNG to JPG", icon: FileText, description: "Convert PNG images into compressed JPG format." },
    { id: "bmp-to-png", label: "BMP to PNG", icon: FileText, description: "Convert BMP (Bitmap) images into PNG format." },
    { id: "png-to-bmp", label: "PNG to BMP", icon: FileText, description: "Convert PNG images into BMP format." },
    { id: "gif-to-png", label: "GIF to PNG", icon: FileText, description: "Convert GIF images into PNG format." },
    { id: "jpg-to-gif", label: "JPG to GIF", icon: FileText, description: "Convert JPG images into GIF format." },
    { id: "grayscale", label: "Grayscale Image", icon: FileText, description: "Convert a colored image to black and white." },
    { id: "flip-image", label: "Flip Image", icon: FileText, description: "Flip an image horizontally or vertically." },
    { id: "pixelate-image", label: "Pixelate Image", icon: FileText, description: "Add pixelation effect to the image." },
    { id: "metadata-viewer", label: "Image Metadata Viewer", icon: FileText, description: "View EXIF data (camera, date, etc.) from your image." },
  ]

  const footerOptions: SidebarOption[] = [
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const selectedOption = converterOptions.find(opt => opt.id === selectedConverter)

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setInputFile(file)
  }

  // Convert image using <canvas>
  const handleConvert = async () => {
    if (!inputFile || !selectedConverter) return alert("Please select a tool and upload an image")

    const img = document.createElement("img")
    img.src = URL.createObjectURL(inputFile)
    await new Promise((res) => (img.onload = res))

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!
    canvas.width = img.width
    canvas.height = img.height

    ctx.drawImage(img, 0, 0)

    let mimeType = "image/png"

    switch (selectedConverter) {
      case "jpg-to-png":
      case "bmp-to-png":
      case "gif-to-png":
        mimeType = "image/png"
        break
      case "png-to-jpg":
        mimeType = "image/jpeg"
        break
      case "png-to-bmp":
      case "jpg-to-bmp":
        mimeType = "image/bmp"
        break
      case "jpg-to-gif":
        mimeType = "image/gif"
        break
      case "grayscale":
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
          data[i] = data[i + 1] = data[i + 2] = avg
        }
        ctx.putImageData(imageData, 0, 0)
        mimeType = "image/png"
        break
      case "flip-image":
        ctx.translate(canvas.width, 0)
        ctx.scale(-1, 1)
        ctx.drawImage(img, 0, 0)
        mimeType = "image/png"
        break
      case "pixelate-image":
        const size = 10 // pixel size
        for (let y = 0; y < canvas.height; y += size) {
          for (let x = 0; x < canvas.width; x += size) {
            const pixel = ctx.getImageData(x, y, 1, 1).data
            ctx.fillStyle = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`
            ctx.fillRect(x, y, size, size)
          }
        }
        mimeType = "image/png"
        break
      default:
        mimeType = "image/png"
    }

    const output = canvas.toDataURL(mimeType)
    setOutputUrl(output)
  }

  const handleClear = () => {
    setInputFile(null)
    setOutputUrl("")
  }

  const handleDownload = () => {
    if (!outputUrl) return
    const a = document.createElement("a")
    a.href = outputUrl
    a.download = `converted-${selectedConverter}.png`
    a.click()
  }

  return (
    <ReusableSidebar
      title="Image Tools"
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
              <label className="text-sm font-medium mb-2 block">Upload Image</label>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="border p-2 rounded-md w-full" />
              {inputFile && <p className="text-sm text-gray-500 mt-2">{inputFile.name}</p>}
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium mb-2 block">Output</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center min-h-[200px] flex items-center justify-center">
                {outputUrl ? (
                  <div>
                    <Image src={outputUrl} alt="Output" width={200} height={200} className="rounded-lg mx-auto" />
                    <Button onClick={handleDownload} className="mt-3">
                      <Download className="w-4 h-4 mr-2" /> Download
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">Converted image will appear here</p>
                )}
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
