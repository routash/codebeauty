"use client"

import { useState } from "react"
import { ReusableSidebar, SidebarContentWrapper, SidebarOption } from "@/components/ui/reusable-sidebar"
import { Button } from "@/components/ui/button"
import { FileText, Settings, Palette } from "lucide-react"

export function HtmlConverters() {
  const [selectedConverter, setSelectedConverter] = useState("")
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")

  const converterOptions: SidebarOption[] = [
    { id: "html-stripper", label: "HTML Stripper", icon: FileText, description: "Remove all HTML tags from content to get plain text." },
    { id: "html-table-generator", label: "HTML Table Generator", icon: FileText, description: "Create HTML tables from structured data or text inputs." },
    { id: "html-to-csv", label: "HTML to CSV Converter", icon: FileText, description: "Convert HTML tables into CSV format for spreadsheets." },
    { id: "html-to-tsv", label: "HTML to TSV Converter", icon: FileText, description: "Convert HTML tables into TSV (tab-separated values) format." },
    { id: "html-to-json", label: "HTML to JSON", icon: FileText, description: "Transform HTML table data into JSON format." },
    { id: "html-to-text", label: "HTML to Text", icon: FileText, description: "Extract plain text from HTML content." },
    { id: "text-to-html-entities", label: "Text to HTML Entities", icon: FileText, description: "Convert special characters in text into HTML entities." },
    { id: "html-entities-to-text", label: "HTML Entities to Text", icon: FileText, description: "Decode HTML entities back into readable text." },
    { id: "html-to-markdown", label: "HTML to Markdown", icon: FileText, description: "Convert HTML content into Markdown format for documentation." },
    { id: "markdown-to-html", label: "Markdown to HTML", icon: FileText, description: "Convert Markdown text into HTML content." },
    { id: "html-to-bbcode", label: "HTML to BBCode Converter", icon: FileText, description: "Convert HTML formatting into BBCode for forums and posts." },
    { id: "bbcode-to-html", label: "BBCode to HTML Converter", icon: FileText, description: "Convert BBCode content back into HTML format." },
  ]

  const footerOptions: SidebarOption[] = [{ id: "settings", label: "Settings", icon: Settings }]

  const selectedOption = converterOptions.find(opt => opt.id === selectedConverter)

  const handleConvert = () => {
    let output = ""
    try {
      switch (selectedConverter) {
        case "html-stripper":
          output = inputText.replace(/<[^>]*>/g, "")
          break
        case "html-to-text":
          output = inputText.replace(/<[^>]+>/g, "")
          break
        case "html-to-csv":
        case "html-to-tsv":
          const sep = selectedConverter === "html-to-csv" ? "," : "\t"
          const parser = new DOMParser()
          const doc = parser.parseFromString(inputText, "text/html")
          const rows = Array.from(doc.querySelectorAll("tr"))
          output = rows.map(r => Array.from(r.querySelectorAll("td, th")).map(cell => cell.textContent?.trim()).join(sep)).join("\n")
          break
        case "html-to-json":
          const docJson = new DOMParser().parseFromString(inputText, "text/html")
          const tableRows = Array.from(docJson.querySelectorAll("tr"))
          const headers = tableRows.shift()?.querySelectorAll("th, td") || []
          const data = tableRows.map(r => {
            const cells = Array.from(r.querySelectorAll("td, th"))
            const obj: any = {}
            headers.forEach((h, i) => obj[h.textContent || `col${i}`] = cells[i]?.textContent || "")
            return obj
          })
          output = JSON.stringify(data, null, 2)
          break
        case "text-to-html-entities":
          output = inputText.replace(/[\u00A0-\u9999<>&]/g, (i) => `&#${i.charCodeAt(0)};`)
          break
        case "html-entities-to-text":
          const txt = document.createElement("textarea")
          txt.innerHTML = inputText
          output = txt.value
          break
        case "html-to-markdown":
          output = inputText.replace(/<h1>(.*?)<\/h1>/gi, "# $1\n")
            .replace(/<h2>(.*?)<\/h2>/gi, "## $1\n")
            .replace(/<h3>(.*?)<\/h3>/gi, "### $1\n")
            .replace(/<b>(.*?)<\/b>/gi, "**$1**")
            .replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
            .replace(/<i>(.*?)<\/i>/gi, "_$1_")
            .replace(/<em>(.*?)<\/em>/gi, "_$1_")
            .replace(/<a .*?href="(.*?)".*?>(.*?)<\/a>/gi, "[$2]($1)")
            .replace(/<[^>]+>/g, "")
          break
        case "markdown-to-html":
          output = inputText
            .replace(/^### (.*)$/gm, "<h3>$1</h3>")
            .replace(/^## (.*)$/gm, "<h2>$1</h2>")
            .replace(/^# (.*)$/gm, "<h1>$1</h1>")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/_(.*?)_/g, "<em>$1</em>")
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
          break
        case "html-to-bbcode":
          output = inputText
            .replace(/<b>(.*?)<\/b>/gi, "[b]$1[/b]")
            .replace(/<i>(.*?)<\/i>/gi, "[i]$1[/i]")
            .replace(/<u>(.*?)<\/u>/gi, "[u]$1[/u]")
            .replace(/<a .*?href="(.*?)".*?>(.*?)<\/a>/gi, "[url=$1]$2[/url]")
            .replace(/<[^>]+>/g, "")
          break
        case "bbcode-to-html":
          output = inputText
            .replace(/\[b\](.*?)\[\/b\]/gi, "<b>$1</b>")
            .replace(/\[i\](.*?)\[\/i\]/gi, "<i>$1</i>")
            .replace(/\[u\](.*?)\[\/u\]/gi, "<u>$1</u>")
            .replace(/\[url=(.*?)\](.*?)\[\/url\]/gi, '<a href="$1">$2</a>')
          break
        default:
          output = "Conversion not implemented yet."
      }
    } catch (e) {
      output = "Error converting input."
    }

    setOutputText(output)
  }

  const handleClear = () => {
    setInputText("")
    setOutputText("")
  }

  return (
    <ReusableSidebar
      title="HTML Converters"
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
              <label className="text-sm font-medium mb-2 block">Input</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="border-2 border-dashed border-gray-300 rounded-lg pt-2 px-4 w-full h-full"
                rows={10}
                placeholder="Paste your HTML or text here"
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
