
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

export function JsonConverters() {
    const [selectedConverter, setSelectedConverter] = useState("")
    const [img, setImg] = useState('')

    const converterOptions: SidebarOption[] = [
      
    {
    id: "json-to-java",
    label: "JSON to JAVA",
    icon: FileText,
    description: "Convert JSON data into Java class objects with fields and data types."
  },
  {
    id: "json-to-xml",
    label: "JSON to XML",
    icon: FileText,
    description: "Transform JSON objects into structured XML format."
  },
  {
    id: "json-to-yaml",
    label: "JSON to YAML",
    icon: FileText,
    description: "Convert JSON data into clean and human-readable YAML format."
  },
  {
    id: "json-to-csv",
    label: "JSON to CSV",
    icon: FileText,
    description: "Convert JSON arrays or objects into tabular CSV data."
  },
  {
    id: "json-to-tsv",
    label: "JSON to TSV",
    icon: FileText,
    description: "Convert JSON data into TSV (tab-separated values) format."
  },
  {
    id: "json-to-text",
    label: "JSON to Text",
    icon: FileText,
    description: "Flatten and convert JSON content into simple plain text format."
  },
  {
    id: "json-to-excel",
    label: "JSON to Excel",
    icon: FileText,
    description: "Export JSON data into Excel (.xlsx) spreadsheet format."
  },
  {
    id: "json-to-html",
    label: "JSON to HTML",
    icon: FileText,
    description: "Convert JSON objects into formatted HTML tables for web use."
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