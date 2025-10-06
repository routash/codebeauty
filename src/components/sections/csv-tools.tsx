
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

export function CsvTools() {
    const [selectedConverter, setSelectedConverter] = useState("")
    const [img, setImg] = useState('')

    const converterOptions: SidebarOption[] = [
      
         {
    id: "csv-viewer",
    label: "CSV Viewer",
    icon: FileText,
    description: "View CSV data in a readable tabular format."
  },
  {
    id: "csv-to-xml-json",
    label: "CSV to XML/JSON",
    icon: FileText,
    description: "Convert CSV files into both XML and JSON formats."
  },
  {
    id: "csv-to-xml",
    label: "CSV to XML",
    icon: FileText,
    description: "Transform CSV data into structured XML format."
  },
  {
    id: "csv-to-json",
    label: "CSV to JSON",
    icon: FileText,
    description: "Convert CSV data into JSON objects for easy processing."
  },
  {
    id: "csv-to-html",
    label: "CSV to HTML",
    icon: FileText,
    description: "Convert CSV data into an HTML table format."
  },
  {
    id: "csv-to-tsv",
    label: "CSV to TSV",
    icon: FileText,
    description: "Transform CSV files into TSV (tab-separated values) format."
  },
  {
    id: "csv-to-multiline-data",
    label: "CSV to MULTILINE DATA",
    icon: FileText,
    description: "Convert CSV rows into multiline text or data format."
  },
  {
    id: "csv-to-sql",
    label: "CSV to SQL",
    icon: FileText,
    description: "Generate SQL insert statements from CSV data."
  },
  {
    id: "csv-to-excel",
    label: "CSV to Excel",
    icon: FileText,
    description: "Convert CSV files into Excel (.xlsx) format."
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