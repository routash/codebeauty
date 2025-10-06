
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

export function EncodeDecode() {
    const [selectedConverter, setSelectedConverter] = useState("")
    const [img, setImg] = useState('')

    const converterOptions: SidebarOption[] = [
      
  {
    id: "base32-encode",
    label: "Base32 Encode",
    icon: FileText,
    description: "Encode text or data into Base32 format."
  },
  {
    id: "base32-decode",
    label: "Base32 Decode",
    icon: FileText,
    description: "Decode Base32 encoded text back to its original form."
  },
  {
    id: "base58-encode",
    label: "Base58 Encode",
    icon: FileText,
    description: "Encode text or data into Base58 format (commonly used in crypto)."
  },
  {
    id: "base58-decode",
    label: "Base58 Decode",
    icon: FileText,
    description: "Decode Base58 encoded text into readable data."
  },
  {
    id: "base64-encode",
    label: "Base64 Encode",
    icon: FileText,
    description: "Convert text or binary data into Base64 encoding."
  },
  {
    id: "base64-decode",
    label: "Base64 Decode",
    icon: FileText,
    description: "Decode Base64 encoded strings to plain text or data."
  },
  {
    id: "url-encode",
    label: "URL Encode Online",
    icon: FileText,
    description: "Encode URLs by converting special characters into safe web format."
  },
  {
    id: "url-decode",
    label: "URL Decode Online",
    icon: FileText,
    description: "Decode encoded URLs back to their normal readable format."
  },
  {
    id: "json-url-encode",
    label: "JSON URL Encode",
    icon: FileText,
    description: "Encode JSON objects into URL-safe encoded format."
  },
  {
    id: "json-url-decode",
    label: "JSON URL Decode",
    icon: FileText,
    description: "Decode URL-encoded JSON strings into readable JSON data."
  },
  {
    id: "html-encode",
    label: "HTML Encode",
    icon: FileText,
    description: "Convert HTML special characters into safe encoded entities."
  },
  {
    id: "html-decode",
    label: "HTML Decode",
    icon: FileText,
    description: "Decode HTML entities back into readable HTML characters."
  },
  {
    id: "xml-url-encode",
    label: "XML URL Encoding",
    icon: FileText,
    description: "Encode XML content into a URL-safe format."
  },
  {
    id: "xml-url-decode",
    label: "XML URL Decoding",
    icon: FileText,
    description: "Decode URL-encoded XML back to its original format."
  },
  {
    id: "utf8-converter",
    label: "UTF8 Converter",
    icon: FileText,
    description: "Convert text into UTF-8 encoded format for universal compatibility."
  },
  {
    id: "utf8-decode",
    label: "UTF8 Decode",
    icon: FileText,
    description: "Decode UTF-8 encoded text back into readable form."
  },
  {
    id: "hex-to-utf8",
    label: "Hex to UTF8",
    icon: FileText,
    description: "Convert hexadecimal text values into UTF-8 characters."
  },
  {
    id: "json-decode-online",
    label: "JSON Decode Online",
    icon: FileText,
    description: "Decode JSON strings into formatted and readable structure."
  },
  {
    id: "json-encode-online",
    label: "JSON Encode Online",
    icon: FileText,
    description: "Convert data or objects into properly formatted JSON."
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