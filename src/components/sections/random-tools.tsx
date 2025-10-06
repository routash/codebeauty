
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

export function RandomTools() {
    const [selectedConverter, setSelectedConverter] = useState("")
    const [img, setImg] = useState('')

    const converterOptions: SidebarOption[] = [
      
       {
    id: "random-ip-address",
    label: "Random IP Address",
    icon: FileText,
    description: "Generate random IPv4 or IPv6 addresses."
  },
  {
    id: "random-time-generator",
    label: "Random Time Generator",
    icon: FileText,
    description: "Generate random timestamps or time values."
  },
  {
    id: "random-uuid-generator",
    label: "Random UUID Generator",
    icon: FileText,
    description: "Generate random UUIDs for unique identifiers."
  },
  {
    id: "random-json-generator",
    label: "Random JSON Generator",
    icon: FileText,
    description: "Create random JSON objects for testing or mock data."
  },
  {
    id: "random-xml-generator",
    label: "Random XML Generator",
    icon: FileText,
    description: "Generate random XML data structures."
  },
  {
    id: "random-data-from-regex",
    label: "Random Data from Regex",
    icon: FileText,
    description: "Generate random data matching a given regex pattern."
  },
  {
    id: "random-csv-generator",
    label: "Random CSV Generator",
    icon: FileText,
    description: "Create random CSV files with test data."
  },
  {
    id: "random-number-generator",
    label: "Random Number Generator",
    icon: FileText,
    description: "Generate random numbers for testing or calculations."
  },
  {
    id: "random-integer-generator",
    label: "Random Integer Generator",
    icon: FileText,
    description: "Generate random integers within a specified range."
  },
  {
    id: "random-prime-generator",
    label: "Random Prime Generator",
    icon: FileText,
    description: "Generate random prime numbers for mathematical use."
  },
  {
    id: "random-date-generator",
    label: "Random Date Generator",
    icon: FileText,
    description: "Generate random dates within a specified range."
  },
  {
    id: "random-bitmap-generator",
    label: "Random Bitmap Generator",
    icon: FileText,
    description: "Create random bitmap images or pixel data."
  },
  {
    id: "random-name-picker",
    label: "Random Name Picker",
    icon: FileText,
    description: "Select random names from a list or dataset."
  },
  {
    id: "text-lines-shuffler",
    label: "Text Lines Shuffler",
    icon: FileText,
    description: "Randomly shuffle lines of text."
  },
  {
    id: "mac-address-generator",
    label: "MAC Address Generator",
    icon: FileText,
    description: "Generate random MAC addresses."
  },
  {
    id: "random-hex-generator",
    label: "Random Hex Generator",
    icon: FileText,
    description: "Generate random hexadecimal numbers or strings."
  },
  {
    id: "random-tsv-generator",
    label: "Random TSV Generator",
    icon: FileText,
    description: "Create random TSV files for testing or mock data."
  },
  {
    id: "random-string-generator",
    label: "Random String Generator",
    icon: FileText,
    description: "Generate random alphanumeric or custom strings."
  },
  {
    id: "random-fraction-generator",
    label: "Random Fraction Generator",
    icon: FileText,
    description: "Generate random fractional numbers."
  },
  {
    id: "random-integer-range-generator",
    label: "Random Integer Range Generator",
    icon: FileText,
    description: "Generate random integers within a user-defined range."
  },
  {
    id: "random-binary-generator",
    label: "Random Binary Generator",
    icon: FileText,
    description: "Generate random binary numbers (0s and 1s)."
  },
  {
    id: "random-byte-generator",
    label: "Random Byte Generator",
    icon: FileText,
    description: "Generate random bytes for testing or binary operations."
  },
  {
    id: "random-decimal-generator",
    label: "Random Decimal Generator",
    icon: FileText,
    description: "Generate random decimal numbers."
  },
  {
    id: "random-alphanumeric-generator",
    label: "Random Alphanumeric Generator",
    icon: FileText,
    description: "Generate random alphanumeric strings or codes."
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