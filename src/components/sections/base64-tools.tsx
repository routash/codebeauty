
"use client"

import { useState } from "react"
import { ReusableSidebar, SidebarContentWrapper, SidebarOption } from "@/components/ui/reusable-sidebar"
import { Button } from "@/components/ui/button"
import {
    FileText,
    Code,
    Image,
    File,
    Settings,
    Download,
    Upload,
    Palette
} from "lucide-react"
import { base64ToImage } from "@/utils/utils"

export function Base64Tools() {
    const [selectedConverter, setSelectedConverter] = useState("")
    const [img, setImg] = useState('')

    const converterOptions: SidebarOption[] = [
      
    {
    id: "image-to-base64",
    label: "Image to Base64",
    icon: FileText,
    description: "Convert any image (JPG, PNG, etc.) into a Base64 encoded string."
  },
  {
    id: "base64-to-image",
    label: "Base64 to Image",
    icon: FileText,
    description: "Decode Base64 string back into an image file."
  },
  {
    id: "png-to-base64",
    label: "PNG to Base64",
    icon: FileText,
    description: "Convert PNG images into Base64 encoded format."
  },
  {
    id: "jpg-to-base64",
    label: "JPG to Base64",
    icon: FileText,
    description: "Convert JPG or JPEG images into Base64 encoded format."
  },
  {
    id: "json-to-base64",
    label: "JSON to Base64",
    icon: FileText,
    description: "Convert JSON data into Base64 encoded string."
  },
  {
    id: "xml-to-base64",
    label: "XML to Base64",
    icon: FileText,
    description: "Convert XML data into Base64 encoded string."
  },
  {
    id: "yaml-to-base64",
    label: "YAML to Base64",
    icon: FileText,
    description: "Convert YAML content into Base64 encoded format."
  },
  {
    id: "base64-to-json",
    label: "Base64 to JSON",
    icon: FileText,
    description: "Decode Base64 encoded text into JSON format."
  },
  {
    id: "base64-to-xml",
    label: "Base64 to XML",
    icon: FileText,
    description: "Decode Base64 encoded data into XML content."
  },
  {
    id: "base64-to-yaml",
    label: "Base64 to YAML",
    icon: FileText,
    description: "Decode Base64 encoded string into readable YAML format."
  },
  {
    id: "csv-to-base64",
    label: "CSV to Base64",
    icon: FileText,
    description: "Convert CSV data files into Base64 encoded format."
  },
  {
    id: "base64-to-csv",
    label: "Base64 to CSV",
    icon: FileText,
    description: "Decode Base64 encoded text back into CSV data."
  },
  {
    id: "tsv-to-base64",
    label: "TSV to Base64",
    icon: FileText,
    description: "Convert TSV (tab-separated) data into Base64 encoded format."
  },
  {
    id: "base64-to-tsv",
    label: "Base64 to TSV",
    icon: FileText,
    description: "Decode Base64 encoded string into TSV (tab-separated) format."
  },
  {
    id: "binary-to-base64",
    label: "Binary to Base64",
    icon: FileText,
    description: "Convert binary data or files into Base64 encoded format."
  },
  {
    id: "base64-to-binary",
    label: "Base64 to Binary",
    icon: FileText,
    description: "Decode Base64 string back into binary data."
  },
  {
    id: "hex-to-base64",
    label: "Hex to Base64",
    icon: FileText,
    description: "Convert hexadecimal text or values into Base64 encoded format."
  },
  {
    id: "base64-to-hex",
    label: "Base64 to Hex",
    icon: FileText,
    description: "Decode Base64 encoded data into hexadecimal format."
  },
  {
    id: "octal-to-base64",
    label: "Octal to Base64",
    icon: FileText,
    description: "Convert octal numbers or text into Base64 encoded format."
  },
  {
    id: "more-base64-tools",
    label: "More Base64 Tools",
    icon: FileText,
    description: "Explore more tools for Base64 encoding and decoding operations."
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

    const handlestrtobase64 = () => {
        setImg(base64ToImage(selectedConverter))
       
    }
    console.log(img)
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
                <div className=" mx-auto">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">
                            {selectedOption?.label}
                        </h2>
                        <p className="text-muted-foreground">
                            {selectedOption?.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Input</label>
                                <textarea value={selectedConverter} onChange={(e) => setSelectedConverter(e.target.value)} className="border-2 border-dashed border-gray-300 rounded-lg pt-2 px-4 w-full h-full" rows={5} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Output</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                    {img ? (
                                        <>
                                            <Download className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                            <p className="text-sm text-gray-500">Converted files will appear here</p>
                                        </>
                                    ) : (
                                        <Image src={img} width={50} height={50} alt="Converted Image" />
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <Button onClick={handlestrtobase64} >Convert</Button>
                        <Button variant="outline">Clear</Button>
                    </div>
                </div>
            </SidebarContentWrapper>
        </ReusableSidebar>
    );
}