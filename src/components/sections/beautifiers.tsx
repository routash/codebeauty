
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

export function Beautifiers() {
    const [selectedConverter, setSelectedConverter] = useState("")
    const [img, setImg] = useState('')

    const converterOptions: SidebarOption[] = [
      
      {
    id: "json-beautifier",
    label: "JSON Beautifier",
    icon: FileText,
    description: "Format and beautify JSON code for better readability."
  },
  {
    id: "css-beautifier",
    label: "CSS Beautifier",
    icon: FileText,
    description: "Format and beautify CSS code for improved clarity."
  },
  {
    id: "xml-beautifier",
    label: "XML Beautifier",
    icon: FileText,
    description: "Beautify XML files with proper indentation and structure."
  },
  {
    id: "javascript-beautifier",
    label: "Javascript Beautifier",
    icon: FileText,
    description: "Format JavaScript code to make it clean and readable."
  },
  {
    id: "yaml-beautifier",
    label: "YAML Beautifier",
    icon: FileText,
    description: "Beautify YAML content with proper indentation and structure."
  },
  {
    id: "csharp-beautifier",
    label: "C# Beautifier",
    icon: FileText,
    description: "Format C# code for better readability and consistency."
  },
  {
    id: "java-beautifier",
    label: "Java Beautifier",
    icon: FileText,
    description: "Beautify Java source code for cleaner structure and style."
  },
  {
    id: "c-beautifier",
    label: "C Beautifier",
    icon: FileText,
    description: "Format C code with proper indentation and readability."
  },
  {
    id: "cpp-beautifier",
    label: "C++ Beautifier",
    icon: FileText,
    description: "Beautify C++ code to improve readability and structure."
  },
  {
    id: "typescript-formatter",
    label: "TypeScript Formatter",
    icon: FileText,
    description: "Format and beautify TypeScript code with proper indentation."
  },
  {
    id: "sql-formatter",
    label: "SQL Formatter",
    icon: FileText,
    description: "Beautify SQL queries for better readability and debugging."
  },
  {
    id: "babel-formatter",
    label: "Babel Formatter",
    icon: FileText,
    description: "Format JavaScript code using Babel for clean and standardized syntax."
  },
  {
    id: "markdown-formatter",
    label: "Markdown Formatter",
    icon: FileText,
    description: "Beautify Markdown files with proper spacing and structure."
  },
  {
    id: "mdx-formatter",
    label: "MDX Formatter",
    icon: FileText,
    description: "Format MDX (Markdown + JSX) files for readability."
  },
  {
    id: "less-beautifier",
    label: "LESS Beautifier",
    icon: FileText,
    description: "Beautify LESS code for cleaner styling structure."
  },
  {
    id: "scss-beautifier",
    label: "SCSS Beautifier",
    icon: FileText,
    description: "Format SCSS code to make it more readable and organized."
  },
  {
    id: "graphql-beautifier",
    label: "GraphQL Beautifier",
    icon: FileText,
    description: "Beautify GraphQL queries and schema definitions for clarity."
  },
  {
    id: "php-beautifier",
    label: "PHP Beautifier",
    icon: FileText,
    description: "Format PHP code with proper indentation and readability."
  },
  {
    id: "python-beautifier",
    label: "Python Beautifier",
    icon: FileText,
    description: "Beautify Python code for cleaner structure and style."
  },
  {
    id: "perl-beautifier",
    label: "Perl Beautifier",
    icon: FileText,
    description: "Format Perl scripts for improved readability."
  },
  {
    id: "ruby-beautifier",
    label: "Ruby Beautifier",
    icon: FileText,
    description: "Beautify Ruby code for better readability and style."
  },
  {
    id: "angular-formatter",
    label: "Angular Formatter",
    icon: FileText,
    description: "Format Angular component and template code for clarity."
  },
  {
    id: "react-formatter",
    label: "React Formatter",
    icon: FileText,
    description: "Beautify React JSX and component code for cleaner structure."
  },
  {
    id: "lua-beautifier",
    label: "Lua Beautifier",
    icon: FileText,
    description: "Format Lua scripts with proper indentation and readability."
  },
  {
    id: "xaml-beautifier",
    label: "XAML Beautifier",
    icon: FileText,
    description: "Beautify XAML files for better readability and structure."
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