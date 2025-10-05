
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

export function Converter() {
    const [selectedConverter, setSelectedConverter] = useState("text")

    const converterOptions: SidebarOption[] = [
        {
            id: "text",
            label: "Text Converter",
            icon: FileText,
            description: "Convert text formats"
        },
        {
            id: "code",
            label: "Code Converter",
            icon: Code,
            description: "Convert between programming languages"
        },
        {
            id: "image",
            label: "Image Converter",
            icon: Image,
            description: "Convert image formats"
        },
        {
            id: "file",
            label: "File Converter",
            icon: File,
            description: "Convert file formats"
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
                                <input className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center" type="text">
                              
                                </input>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Output</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                    <Download className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                    <p className="text-sm text-gray-500">Converted files will appear here</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <Button>Convert</Button>
                        <Button variant="outline">Clear</Button>
                    </div>
                </div>
            </SidebarContentWrapper>
        </ReusableSidebar>
    );
}