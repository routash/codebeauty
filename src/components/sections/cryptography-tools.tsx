
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

export function CryptographyTools() {
    const [selectedConverter, setSelectedConverter] = useState("")
    const [img, setImg] = useState('')

    const converterOptions: SidebarOption[] = [
      
    {
    id: "encryption-decryption",
    label: "Encryption-Decryption",
    icon: FileText,
    description: "Encrypt or decrypt text and data using various algorithms."
  },
  {
    id: "hmac-generator",
    label: "HMAC Generator",
    icon: FileText,
    description: "Generate HMAC signatures for secure data integrity verification."
  },
  {
    id: "md2-hash-generator",
    label: "MD2 Hash Generator",
    icon: FileText,
    description: "Generate MD2 hash values for text or data."
  },
  {
    id: "md4-hash-generator",
    label: "MD4 Hash Generator",
    icon: FileText,
    description: "Generate MD4 hash values for text or data."
  },
  {
    id: "md5-hash-generator",
    label: "MD5 Hash Generator",
    icon: FileText,
    description: "Generate MD5 hash values for text, files, or strings."
  },
  {
    id: "md6-hash-generator",
    label: "MD6 Hash Generator",
    icon: FileText,
    description: "Generate MD6 hash values for secure hashing."
  },
  {
    id: "ntlm-hash-generator",
    label: "NTLM Hash Generator",
    icon: FileText,
    description: "Generate NTLM hashes for Windows authentication."
  },
  {
    id: "sha1-hash-generator",
    label: "SHA1 Hash Generator",
    icon: FileText,
    description: "Generate SHA-1 hash values for secure text hashing."
  },
  {
    id: "sha2-hash-generator",
    label: "SHA2 Hash Generator",
    icon: FileText,
    description: "Generate SHA-2 hash values for secure hashing."
  },
  {
    id: "sha224-hash-generator",
    label: "SHA224 Hash Generator",
    icon: FileText,
    description: "Generate SHA-224 hash values for text or data."
  },
  {
    id: "sha256-hash-generator",
    label: "SHA256 Hash Generator",
    icon: FileText,
    description: "Generate SHA-256 hash values for secure text or file hashing."
  },
  {
    id: "sha384-hash-generator",
    label: "SHA384 Hash Generator",
    icon: FileText,
    description: "Generate SHA-384 hash values for secure text or files."
  },
  {
    id: "sha512-hash-generator",
    label: "SHA512 Hash Generator",
    icon: FileText,
    description: "Generate SHA-512 hash values for highly secure hashing."
  },
  {
    id: "sha512-224-hash-generator",
    label: "SHA512/224 Hash Generator",
    icon: FileText,
    description: "Generate SHA-512/224 hash values for advanced cryptography."
  },
  {
    id: "sha512-256-hash-generator",
    label: "SHA512/256 Hash Generator",
    icon: FileText,
    description: "Generate SHA-512/256 hash values for secure hashing."
  },
  {
    id: "sha3-224-hash-generator",
    label: "SHA3-224 Hash Generator",
    icon: FileText,
    description: "Generate SHA3-224 hash values for cryptography purposes."
  },
  {
    id: "sha3-256-hash-generator",
    label: "SHA3-256 Hash Generator",
    icon: FileText,
    description: "Generate SHA3-256 hash values for secure data hashing."
  },
  {
    id: "sha3-384-hash-generator",
    label: "SHA3-384 Hash Generator",
    icon: FileText,
    description: "Generate SHA3-384 hash values for high-security requirements."
  },
  {
    id: "sha3-512-hash-generator",
    label: "SHA3-512 Hash Generator",
    icon: FileText,
    description: "Generate SHA3-512 hash values for maximum security."
  },
  {
    id: "crc16-hash-generator",
    label: "CRC-16 Hash Generator",
    icon: FileText,
    description: "Generate CRC-16 hash values for data integrity checks."
  },
  {
    id: "crc32-hash-generator",
    label: "CRC-32 Hash Generator",
    icon: FileText,
    description: "Generate CRC-32 hash values to verify data integrity."
  },
  {
    id: "shake-128-hash-generator",
    label: "Shake-128 Hash Generator",
    icon: FileText,
    description: "Generate Shake-128 hash values for extendable output security."
  },
  {
    id: "shake-256-hash-generator",
    label: "Shake-256 Hash Generator",
    icon: FileText,
    description: "Generate Shake-256 hash values for flexible cryptography."
  },
  {
    id: "whirlpool-hash-generator",
    label: "Whirlpool Hash Generator",
    icon: FileText,
    description: "Generate Whirlpool hash values for secure, large-size hashing."
  },
  {
    id: "wordpress-password-hash-generator",
    label: "Wordpress Password Hash Generator",
    icon: FileText,
    description: "Generate password hashes compatible with WordPress authentication."
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