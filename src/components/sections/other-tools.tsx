
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

export function OtherTools() {
    const [selectedConverter, setSelectedConverter] = useState("")
    const [img, setImg] = useState('')

    const converterOptions: SidebarOption[] = [
      
       {
    id: "lorem-ipsum",
    label: "Lorem-Ipsum",
    icon: FileText,
    description: "Generate placeholder text for design or content purposes."
  },
  {
    id: "sharelink-generator",
    label: "Sharelink Generator",
    icon: FileText,
    description: "Create shareable links for files or web content."
  },
  {
    id: "hostname-to-ip",
    label: "Hostname to IP",
    icon: FileText,
    description: "Resolve a hostname to its corresponding IP address."
  },
  {
    id: "ip-to-hostname",
    label: "IP to Hostname",
    icon: FileText,
    description: "Find the hostname associated with a given IP address."
  },
  {
    id: "phone-to-ip-address",
    label: "Phone to IP Address",
    icon: FileText,
    description: "Retrieve the IP address associated with a phone number."
  },
  {
    id: "ip-address-to-phone",
    label: "IP Address to Phone",
    icon: FileText,
    description: "Find the phone number linked to a given IP address."
  },
  {
    id: "dns-lookup",
    label: "DNS Lookup",
    icon: FileText,
    description: "Perform a DNS lookup to retrieve domain records."
  },
  {
    id: "mx-lookup",
    label: "MX Lookup",
    icon: FileText,
    description: "Check the mail exchange (MX) records of a domain."
  },
  {
    id: "nameserver-lookup",
    label: "Nameserver Lookup",
    icon: FileText,
    description: "Retrieve the nameservers associated with a domain."
  },
  {
    id: "website-to-ip-address",
    label: "Website to IP Address",
    icon: FileText,
    description: "Resolve a website URL to its IP address."
  },
  {
    id: "open-port-checker",
    label: "Open Port Checker",
    icon: FileText,
    description: "Check if a specific port on your IP or server is open."
  },
  {
    id: "webcam-test",
    label: "Webcam Test",
    icon: FileText,
    description: "Test your webcam functionality directly online."
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