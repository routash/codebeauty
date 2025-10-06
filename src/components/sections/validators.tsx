
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

export function Validators() {
    const [selectedConverter, setSelectedConverter] = useState("")
    const [img, setImg] = useState('')

    const converterOptions: SidebarOption[] = [
     {
    id: "css-validator",
    label: "CSS Validator",
    icon: FileText,
    description: "Validate CSS code for syntax errors and compatibility issues."
  },
  {
    id: "javascript-validator",
    label: "JavaScript Validator",
    icon: FileText,
    description: "Check JavaScript code for syntax errors and coding issues."
  },
  {
    id: "json-validator",
    label: "JSON Validator",
    icon: FileText,
    description: "Validate JSON data for proper syntax and formatting."
  },
  {
    id: "json5-validator",
    label: "JSON5 Validator",
    icon: FileText,
    description: "Validate JSON5 files for syntax correctness and structure."
  },
  {
    id: "xml-validator",
    label: "XML Validator",
    icon: FileText,
    description: "Check XML files for syntax errors and well-formedness."
  },
  {
    id: "credit-card-validator",
    label: "Credit Card Validator",
    icon: FileText,
    description: "Validate credit card numbers using standard algorithms."
  },
  {
    id: "api-test",
    label: "API Test",
    icon: FileText,
    description: "Test APIs by sending requests and inspecting responses."
  },
  {
    id: "yaml-validator",
    label: "YAML Validator",
    icon: FileText,
    description: "Validate YAML files for syntax and formatting errors."
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