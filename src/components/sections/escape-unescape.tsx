
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

export function EscapeUnescape() {
    const [selectedConverter, setSelectedConverter] = useState("")
    const [img, setImg] = useState('')

    const converterOptions: SidebarOption[] = [
      
      {
    id: "html-escape-unescape",
    label: "HTML Escape Unescape",
    icon: FileText,
    description: "Encode or decode special HTML characters to/from entities."
  },
  {
    id: "xml-escape-unescape",
    label: "XML Escape Unescape",
    icon: FileText,
    description: "Escape or unescape special characters in XML documents."
  },
  {
    id: "java-escape-unescape",
    label: "Java Escape Unescape",
    icon: FileText,
    description: "Escape or unescape Java strings with proper syntax."
  },
  {
    id: "csharp-escape-unescape",
    label: "C# Escape Unescape",
    icon: FileText,
    description: "Escape or unescape C# strings for safe code usage."
  },
  {
    id: "javascript-escape-unescape",
    label: "Javascript Escape Unescape",
    icon: FileText,
    description: "Encode or decode JavaScript strings with special characters."
  },
  {
    id: "csv-escape-unescape",
    label: "CSV Escape Unescape",
    icon: FileText,
    description: "Escape or unescape special characters in CSV files."
  },
  {
    id: "sql-escape-unescape",
    label: "SQL Escape Unescape",
    icon: FileText,
    description: "Escape or unescape SQL strings to prevent syntax issues."
  },
  {
    id: "json-escape-unescape",
    label: "JSON Escape Unescape",
    icon: FileText,
    description: "Escape or unescape JSON strings safely for data transfer."
  },
  {
    id: "un-google-link",
    label: "Un-Google Link",
    icon: FileText,
    description: "Convert Google redirect links into direct URLs."
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