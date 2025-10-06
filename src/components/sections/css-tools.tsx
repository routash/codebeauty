
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

export function CssTools() {
    const [selectedConverter, setSelectedConverter] = useState("")
    const [img, setImg] = useState('')

    const converterOptions: SidebarOption[] = [
      
       {
    id: "css-beautifier",
    label: "CSS Beautifier",
    icon: FileText,
    description: "Format and beautify CSS code for better readability."
  },
  {
    id: "css-to-less",
    label: "CSS to LESS",
    icon: FileText,
    description: "Convert standard CSS code into LESS syntax."
  },
  {
    id: "css-to-scss",
    label: "CSS to SCSS",
    icon: FileText,
    description: "Transform CSS code into SCSS syntax for Sass preprocessor."
  },
  {
    id: "css-to-sass",
    label: "CSS to SASS",
    icon: FileText,
    description: "Convert CSS code into indented SASS syntax."
  },
  {
    id: "css-to-stylus",
    label: "CSS to Stylus",
    icon: FileText,
    description: "Convert CSS into Stylus preprocessor format."
  },
  {
    id: "stylus-compiler",
    label: "Stylus Compiler",
    icon: FileText,
    description: "Compile Stylus code into standard CSS."
  },
  {
    id: "stylus-to-css",
    label: "Stylus to CSS",
    icon: FileText,
    description: "Convert Stylus files directly into CSS code."
  },
  {
    id: "stylus-to-less",
    label: "Stylus to LESS",
    icon: FileText,
    description: "Convert Stylus code into LESS format."
  },
  {
    id: "stylus-to-scss",
    label: "Stylus to SCSS",
    icon: FileText,
    description: "Transform Stylus code into SCSS syntax."
  },
  {
    id: "stylus-to-sass",
    label: "Stylus to SASS",
    icon: FileText,
    description: "Convert Stylus files into indented SASS syntax."
  },
  {
    id: "less-compiler",
    label: "LESS Compiler",
    icon: FileText,
    description: "Compile LESS code into standard CSS."
  },
  {
    id: "less-to-css",
    label: "LESS to CSS",
    icon: FileText,
    description: "Convert LESS files directly into CSS."
  },
  {
    id: "less-to-stylus",
    label: "LESS to Stylus",
    icon: FileText,
    description: "Transform LESS code into Stylus syntax."
  },
  {
    id: "less-to-scss",
    label: "LESS to SCSS",
    icon: FileText,
    description: "Convert LESS files into SCSS format."
  },
  {
    id: "less-to-sass",
    label: "LESS to SASS",
    icon: FileText,
    description: "Transform LESS code into indented SASS syntax."
  },
  {
    id: "scss-compiler",
    label: "SCSS Compiler",
    icon: FileText,
    description: "Compile SCSS code into standard CSS."
  },
  {
    id: "scss-to-css",
    label: "SCSS to CSS",
    icon: FileText,
    description: "Convert SCSS files directly into CSS."
  },
  {
    id: "scss-to-stylus",
    label: "SCSS to Stylus",
    icon: FileText,
    description: "Transform SCSS code into Stylus syntax."
  },
  {
    id: "scss-to-less",
    label: "SCSS to LESS",
    icon: FileText,
    description: "Convert SCSS files into LESS format."
  },
  {
    id: "scss-to-sass",
    label: "SCSS to SASS",
    icon: FileText,
    description: "Transform SCSS code into indented SASS syntax."
  },
  {
    id: "sass-compiler",
    label: "SASS Compiler",
    icon: FileText,
    description: "Compile SASS code into standard CSS."
  },
  {
    id: "sass-to-css",
    label: "SASS to CSS",
    icon: FileText,
    description: "Convert SASS files directly into CSS."
  },
  {
    id: "sass-to-stylus",
    label: "SASS to Stylus",
    icon: FileText,
    description: "Transform SASS code into Stylus syntax."
  },
  {
    id: "sass-to-scss",
    label: "SASS to SCSS",
    icon: FileText,
    description: "Convert SASS files into SCSS syntax."
  },
  {
    id: "sass-to-less",
    label: "SASS to LESS",
    icon: FileText,
    description: "Transform SASS code into LESS format."
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