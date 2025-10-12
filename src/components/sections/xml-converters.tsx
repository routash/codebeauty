"use client"

import { useState } from "react"
import { ReusableSidebar, SidebarContentWrapper, SidebarOption } from "@/components/ui/reusable-sidebar"
import { Button } from "@/components/ui/button"
import { FileText, Settings, Palette, Download } from "lucide-react"
import Image from "next/image"

export function XmlConverters() {
  const [selectedConverter, setSelectedConverter] = useState("")
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")

  const converterOptions: SidebarOption[] = [
    { id: "xml-converter", label: "XML Converter", icon: FileText, description: "All-in-one XML conversion tool to transform XML data into various formats." },
    { id: "xml-to-json", label: "XML to JSON", icon: FileText, description: "Convert XML documents into structured JSON format for web and API use." },
    { id: "xml-to-yaml", label: "XML to YAML", icon: FileText, description: "Convert XML content into clean and readable YAML format." },
    { id: "xml-to-csv", label: "XML to CSV", icon: FileText, description: "Transform XML data into tabular CSV format for spreadsheets." },
    { id: "xml-to-tsv", label: "XML to TSV", icon: FileText, description: "Convert XML data into TSV (tab-separated values) format." },
    { id: "xml-to-text", label: "XML to Text", icon: FileText, description: "Flatten XML data into simple plain text for easy reading." },
    { id: "xml-xsl-transform", label: "XML-XSL Transform", icon: FileText, description: "Apply XSL transformations to XML documents for custom formatting." },
    { id: "xml-to-html", label: "XML to HTML", icon: FileText, description: "Convert XML data into formatted HTML tables or web-ready structure." },
    { id: "xml-to-excel", label: "XML to Excel", icon: FileText, description: "Export XML data directly into Excel (.xlsx) spreadsheets." },
    { id: "xml-to-java", label: "XML to JAVA", icon: FileText, description: "Generate Java classes from XML data with fields and types mapped." },
  ]

  const footerOptions: SidebarOption[] = [{ id: "settings", label: "Settings", icon: Settings }]

  const selectedOption = converterOptions.find(opt => opt.id === selectedConverter)

  const parseXml = (xml: string) => {
    try {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xml, "text/xml")
      return xmlDoc
    } catch {
      return null
    }
  }

  const xmlToJson = (xml: any) => {
    const obj: any = {}
    if (!xml) return obj
    const traverse = (node: any, target: any) => {
      if (node.nodeType === 1) {
        const children = Array.from(node.childNodes).filter((n: any) => n.nodeType === 1)
        if (children.length > 0) {
          target[node.nodeName] = {}
          children.forEach((c: any) => traverse(c, target[node.nodeName]))
        } else {
          target[node.nodeName] = node.textContent
        }
      }
    }
    traverse(xml.documentElement, obj)
    return obj
  }

  const convertXml = (xml: string, type: string) => {
    try {
      const xmlDoc = parseXml(xml)
      if (!xmlDoc) return "Invalid XML input"

      switch (type) {
        case "xml-to-json":
          return JSON.stringify(xmlToJson(xmlDoc), null, 2)
        case "xml-to-yaml":
          return Object.entries(xmlToJson(xmlDoc)).map(([k, v]) => `${k}: ${v}`).join("\n")
        case "xml-to-csv":
        case "xml-to-tsv":
          const jsonObj = xmlToJson(xmlDoc)
          const keys = Object.keys(jsonObj)
          const sep = type === "xml-to-csv" ? "," : "\t"
          return [keys.join(sep), keys.map(k => jsonObj[k]).join(sep)].join("\n")
        case "xml-to-text":
          return xml
        case "xml-to-html":
          const json = xmlToJson(xmlDoc)
          const htmlKeys = Object.keys(json)
          return `<table border="1"><tr>${htmlKeys.map(k => `<th>${k}</th>`).join("")}</tr><tr>${htmlKeys.map(k => `<td>${json[k]}</td>`).join("")}</tr></table>`
        case "xml-to-java":
          return Object.keys(xmlToJson(xmlDoc))
            .map(k => `private String ${k};`)
            .join("\n")
        case "xml-xsl-transform":
          return "XSL Transform placeholder (use XSLT processor for real transformation)"
        case "xml-to-excel":
          return "Excel export placeholder (use XLSX library for full functionality)"
        default:
          return "Unsupported converter"
      }
    } catch (e) {
      return "Error converting XML"
    }
  }

  const handleConvert = () => {
    setOutputText(convertXml(inputText, selectedConverter))
  }

  const handleClear = () => {
    setInputText("")
    setOutputText("")
  }

  return (
    <ReusableSidebar
      title="XML Converters"
      icon={Palette}
      options={converterOptions}
      selectedOption={selectedConverter}
      onOptionSelect={setSelectedConverter}
      footerOptions={footerOptions}
    >
      <SidebarContentWrapper selectedOption={selectedOption}>
        <div className="mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{selectedOption?.label}</h2>
            <p className="text-muted-foreground">{selectedOption?.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-sm font-medium mb-2 block">Input XML</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="border-2 border-dashed border-gray-300 rounded-lg pt-2 px-4 w-full h-full"
                rows={10}
                placeholder="Paste your XML here"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium mb-2 block">Output</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[200px] overflow-auto">
                {outputText ? <pre className="text-sm">{outputText}</pre> : <p className="text-gray-400">Converted output will appear here</p>}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Button onClick={handleConvert}>Convert</Button>
            <Button variant="outline" onClick={handleClear}>Clear</Button>
          </div>
        </div>
      </SidebarContentWrapper>
    </ReusableSidebar>
  )
}
