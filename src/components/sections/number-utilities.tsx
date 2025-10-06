
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

export function NumberUtilities() {
    const [selectedConverter, setSelectedConverter] = useState("")
    const [img, setImg] = useState('')

    const converterOptions: SidebarOption[] = [
      
        {
    id: "all-numbers-converter",
    label: "All Numbers Converter",
    icon: FileText,
    description: "Convert numbers between decimal, binary, octal, and hexadecimal."
  },
  {
    id: "decimal-to-binary",
    label: "Decimal to Binary",
    icon: FileText,
    description: "Convert decimal numbers into binary format."
  },
  {
    id: "decimal-to-octal",
    label: "Decimal to Octal",
    icon: FileText,
    description: "Convert decimal numbers into octal format."
  },
  {
    id: "binary-to-decimal",
    label: "Binary to Decimal",
    icon: FileText,
    description: "Convert binary numbers into decimal format."
  },
  {
    id: "binary-to-hex",
    label: "Binary to Hex",
    icon: FileText,
    description: "Convert binary numbers into hexadecimal format."
  },
  {
    id: "binary-to-octal",
    label: "Binary to Octal",
    icon: FileText,
    description: "Convert binary numbers into octal format."
  },
  {
    id: "hex-to-decimal",
    label: "Hex to Decimal",
    icon: FileText,
    description: "Convert hexadecimal numbers into decimal format."
  },
  {
    id: "hex-to-binary",
    label: "Hex to Binary",
    icon: FileText,
    description: "Convert hexadecimal numbers into binary format."
  },
  {
    id: "hex-to-octal",
    label: "Hex to Octal",
    icon: FileText,
    description: "Convert hexadecimal numbers into octal format."
  },
  {
    id: "octal-to-decimal",
    label: "Octal to Decimal",
    icon: FileText,
    description: "Convert octal numbers into decimal format."
  },
  {
    id: "octal-to-binary",
    label: "Octal to Binary",
    icon: FileText,
    description: "Convert octal numbers into binary format."
  },
  {
    id: "octal-to-hex",
    label: "Octal to Hex",
    icon: FileText,
    description: "Convert octal numbers into hexadecimal format."
  },
  {
    id: "binary-to-text",
    label: "Binary to Text",
    icon: FileText,
    description: "Convert binary data into readable text."
  },
  {
    id: "text-to-binary",
    label: "Text to Binary",
    icon: FileText,
    description: "Convert text characters into binary representation."
  },
  {
    id: "ascii-to-text",
    label: "ASCII to Text",
    icon: FileText,
    description: "Convert ASCII codes into readable text characters."
  },
  {
    id: "char-to-ascii",
    label: "Char to ASCII",
    icon: FileText,
    description: "Convert characters into their corresponding ASCII codes."
  },
  {
    id: "reverse-hex",
    label: "Reverse Hex",
    icon: FileText,
    description: "Reverse hexadecimal strings or byte order."
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