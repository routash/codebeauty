
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

export function XmlConverters() {
    const [selectedConverter, setSelectedConverter] = useState("")
    const [img, setImg] = useState('')

    const converterOptions: SidebarOption[] = [
      
     {
    id: "xml-converter",
    label: "XML Converter",
    icon: FileText,
    description: "All-in-one XML conversion tool to transform XML data into various formats."
  },
  {
    id: "xml-to-json",
    label: "XML to JSON",
    icon: FileText,
    description: "Convert XML documents into structured JSON format for web and API use."
  },
  {
    id: "xml-to-yaml",
    label: "XML to YAML",
    icon: FileText,
    description: "Convert XML content into clean and readable YAML format."
  },
  {
    id: "xml-to-csv",
    label: "XML to CSV",
    icon: FileText,
    description: "Transform XML data into tabular CSV format for spreadsheets."
  },
  {
    id: "xml-to-tsv",
    label: "XML to TSV",
    icon: FileText,
    description: "Convert XML data into TSV (tab-separated values) format."
  },
  {
    id: "xml-to-text",
    label: "XML to Text",
    icon: FileText,
    description: "Flatten XML data into simple plain text for easy reading."
  },
  {
    id: "xml-xsl-transform",
    label: "XML-XSL Transform",
    icon: FileText,
    description: "Apply XSL transformations to XML documents for custom formatting."
  },
  {
    id: "xml-to-html",
    label: "XML to HTML",
    icon: FileText,
    description: "Convert XML data into formatted HTML tables or web-ready structure."
  },
  {
    id: "xml-to-excel",
    label: "XML to Excel",
    icon: FileText,
    description: "Export XML data directly into Excel (.xlsx) spreadsheets."
  },
  {
    id: "xml-to-java",
    label: "XML to JAVA",
    icon: FileText,
    description: "Generate Java classes from XML data with fields and types mapped."
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