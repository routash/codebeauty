
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

export function Viewers() {
    const [selectedConverter, setSelectedConverter] = useState("")
    const [img, setImg] = useState('')

    const converterOptions: SidebarOption[] = [
      
     {
    id: "json-viewer",
    label: "JSON Viewer",
    icon: FileText,
    description: "View and explore JSON data in a formatted, readable structure."
  },
  {
    id: "xml-viewer",
    label: "XML Viewer",
    icon: FileText,
    description: "Visualize XML documents with proper indentation and structure."
  },
  {
    id: "yaml-viewer",
    label: "YAML Viewer",
    icon: FileText,
    description: "Display YAML content in a clear and structured format."
  },
  {
    id: "mxml-viewer",
    label: "MXML Viewer",
    icon: FileText,
    description: "View MXML (Flex XML) files in a readable and organized layout."
  },
  {
    id: "html-viewer",
    label: "HTML Viewer",
    icon: FileText,
    description: "Preview HTML code with proper formatting and structure."
  },
  {
    id: "javascript-viewer",
    label: "JavaScript Viewer",
    icon: FileText,
    description: "Display JavaScript code with syntax highlighting for readability."
  },
  {
    id: "rss-viewer",
    label: "RSS Viewer",
    icon: FileText,
    description: "Visualize RSS feeds in a readable and structured layout."
  },
  {
    id: "source-code-viewer",
    label: "SOURCE CODE Viewer",
    icon: FileText,
    description: "View source code files in a clean, syntax-highlighted format."
  },
  {
    id: "opml-viewer",
    label: "OPML Viewer",
    icon: FileText,
    description: "Display OPML files in a structured outline format."
  },
  {
    id: "csv-viewer",
    label: "CSV Viewer",
    icon: FileText,
    description: "Visualize CSV data in a readable tabular format."
  },
  {
    id: "bbcode-viewer",
    label: "BBCode Viewer",
    icon: FileText,
    description: "Render and view BBCode content in formatted style."
  },
  {
    id: "markdown-viewer",
    label: "Markdown Viewer",
    icon: FileText,
    description: "Preview Markdown text with proper formatting and style."
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