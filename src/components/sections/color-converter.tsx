
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

export function ColorConverter() {
    const [selectedConverter, setSelectedConverter] = useState("")
    const [img, setImg] = useState('')

    const converterOptions: SidebarOption[] = [
       {
    id: "hex-to-pantone",
    label: "HEX to Pantone Converter",
    icon: FileText,
    description: "Convert HEX color codes to closest Pantone colors."
  },
  {
    id: "rgb-to-pantone",
    label: "RGB to Pantone Converter",
    icon: FileText,
    description: "Convert RGB values into their matching Pantone shades."
  },
  {
    id: "hsv-to-pantone",
    label: "HSV to Pantone Converter",
    icon: FileText,
    description: "Find the Pantone color that matches your HSV color value."
  },
  {
    id: "cmyk-to-pantone",
    label: "CMYK to Pantone Converter",
    icon: FileText,
    description: "Convert CMYK color values to the nearest Pantone color."
  },
  {
    id: "cmyk-to-hex",
    label: "CMYK to HEX Converter",
    icon: FileText,
    description: "Convert CMYK color values into HEX color codes."
  },
  {
    id: "cmyk-to-rgb",
    label: "CMYK to RGB Converter",
    icon: FileText,
    description: "Convert CMYK color model values to RGB format."
  },
  {
    id: "cmyk-to-hsv",
    label: "CMYK to HSV Converter",
    icon: FileText,
    description: "Convert CMYK color values into HSV (Hue, Saturation, Value) format."
  },
  {
    id: "hsv-to-hex",
    label: "HSV to HEX Converter",
    icon: FileText,
    description: "Convert HSV color values to HEX color codes."
  },
  {
    id: "hsv-to-rgb",
    label: "HSV to RGB Converter",
    icon: FileText,
    description: "Convert HSV color values to RGB format easily."
  },
  {
    id: "hsv-to-cmyk",
    label: "HSV to CMYK Converter",
    icon: FileText,
    description: "Transform HSV color model values into CMYK format."
  },
  {
    id: "hex-to-hsv",
    label: "HEX to HSV Converter",
    icon: FileText,
    description: "Convert HEX color codes into HSV values."
  },
  {
    id: "rgb-to-hex",
    label: "RGB to HEX Converter",
    icon: FileText,
    description: "Convert RGB color values into HEX color codes."
  },
  {
    id: "rgb-to-hsv",
    label: "RGB to HSV Converter",
    icon: FileText,
    description: "Convert RGB color values into HSV color space."
  },
  {
    id: "rgb-to-cmyk",
    label: "RGB to CMYK Converter",
    icon: FileText,
    description: "Convert RGB color values into CMYK format."
  },
  {
    id: "hex-to-rgb",
    label: "HEX to RGB Converter",
    icon: FileText,
    description: "Convert HEX color codes into RGB values."
  },
  {
    id: "hex-to-cmyk",
    label: "HEX to CMYK Converter",
    icon: FileText,
    description: "Convert HEX color codes into CMYK format."
  },
  {
    id: "pantone-to-hex",
    label: "Pantone to HEX Converter",
    icon: FileText,
    description: "Convert Pantone colors into HEX codes."
  },
  {
    id: "pantone-to-rgb",
    label: "Pantone to RGB Converter",
    icon: FileText,
    description: "Convert Pantone colors into RGB values."
  },
  {
    id: "pantone-to-cmyk",
    label: "Pantone to CMYK Converter",
    icon: FileText,
    description: "Convert Pantone colors into CMYK format."
  },
  {
    id: "pantone-to-hsv",
    label: "Pantone to HSV Converter",
    icon: FileText,
    description: "Convert Pantone colors into HSV (Hue, Saturation, Value) values."
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