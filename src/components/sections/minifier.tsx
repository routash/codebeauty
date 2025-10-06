
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

export function Minifier() {
    const [selectedConverter, setSelectedConverter] = useState("")
    const [img, setImg] = useState('')

    const converterOptions: SidebarOption[] = [
      
       {
    id: "json-minify",
    label: "JSON Minify",
    icon: FileText,
    description: "Remove whitespace and line breaks from JSON to produce compact output."
  },
  {
    id: "xml-minify",
    label: "XML Minify",
    icon: FileText,
    description: "Minify XML files by removing unnecessary spaces and line breaks."
  },
  {
    id: "js-minify",
    label: "Minify JS",
    icon: FileText,
    description: "Compress JavaScript code by removing whitespace, comments, and newlines."
  },
  {
    id: "css-minify",
    label: "CSS Minify",
    icon: FileText,
    description: "Minify CSS code to reduce file size and improve loading speed."
  },
  {
    id: "sql-minifier",
    label: "SQL Minifier",
    icon: FileText,
    description: "Compress SQL queries by removing extra spaces and line breaks."
  },
  {
    id: "html-minify",
    label: "Minify HTML",
    icon: FileText,
    description: "Minify HTML code for faster page load and smaller file size."
  },
  {
    id: "lua-minifier",
    label: "Lua Minifier",
    icon: FileText,
    description: "Minify Lua scripts by removing unnecessary whitespace and comments."
  },
  {
    id: "text-minifier",
    label: "Text Minifier",
    icon: FileText,
    description: "Compress plain text by removing unnecessary spaces and line breaks."
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