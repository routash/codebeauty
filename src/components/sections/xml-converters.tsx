"use client";

import { useState } from "react";
import {
  ReusableSidebar,
  SidebarContentWrapper,
  SidebarOption,
} from "@/components/ui/reusable-sidebar";
import { Button } from "@/components/ui/button";
import { FileText, Settings, Code } from "lucide-react";

export default function XmlConverters() {
  const [selectedConverter, setSelectedConverter] = useState("");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const converterOptions: SidebarOption[] = [
    {
      id: "xml-to-json",
      label: "XML to JSON",
      icon: FileText,
      description: "Convert XML data into JSON format.",
    },
    {
      id: "json-to-xml",
      label: "JSON to XML",
      icon: FileText,
      description: "Convert JSON structure back into XML format.",
    },
  ];

  const footerOptions: SidebarOption[] = [
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const selectedOption = converterOptions.find(
    (opt) => opt.id === selectedConverter
  );

  const handleConverterChange = (converterId: string) => {
    setSelectedConverter(converterId);
    setInputText("");
    setOutputText("");
  };

  const xmlToJson = (xmlString: string) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");

      const traverse = (node: any): any => {
        const obj: any = {};
        if (node.nodeType === 1) {
          // Element
          if (node.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let attr of node.attributes) {
              obj["@attributes"][attr.name] = attr.value;
            }
          }
        } else if (node.nodeType === 3) {
          // Text
          return node.nodeValue.trim();
        }

        for (let child of node.childNodes) {
          const childObj = traverse(child);
          if (child.nodeType === 3 && !childObj) continue;
          const nodeName = child.nodeName;
          if (obj[nodeName]) {
            if (!Array.isArray(obj[nodeName])) {
              obj[nodeName] = [obj[nodeName]];
            }
            obj[nodeName].push(childObj);
          } else {
            obj[nodeName] = childObj;
          }
        }

        return obj;
      };

      const result = traverse(xmlDoc);
      return JSON.stringify(result, null, 2);
    } catch (err) {
      return "Invalid XML format!";
    }
  };

  const jsonToXml = (jsonString: string) => {
    try {
      const obj = JSON.parse(jsonString);
      const convert = (obj: any) => {
        let xml = "";
        for (let prop in obj) {
          if (prop === "@attributes") {
            continue;
          }
          if (Array.isArray(obj[prop])) {
            for (let item of obj[prop]) {
              xml += `<${prop}>${convert(item)}</${prop}>`;
            }
          } else if (typeof obj[prop] === "object") {
            xml += `<${prop}>${convert(obj[prop])}</${prop}>`;
          } else {
            xml += `<${prop}>${obj[prop]}</${prop}>`;
          }
        }
        return xml;
      };
      return `<root>${convert(obj)}</root>`;
    } catch (err) {
      return "Invalid JSON format!";
    }
  };

  const convertXml = (input: string, type: string) => {
    if (!input.trim()) return "Please enter input text";

    switch (type) {
      case "xml-to-json":
        return xmlToJson(input);
      case "json-to-xml":
        return jsonToXml(input);
      default:
        return "Please select a converter";
    }
  };

  const handleConvert = () => {
    if (!selectedConverter) {
      setOutputText("Please select a converter from the sidebar");
      return;
    }
    setOutputText(convertXml(inputText, selectedConverter));
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
    }
  };

  return (
    <ReusableSidebar
      title="XML Converter Tools"
      icon={Code}
      options={converterOptions}
      selectedOption={selectedConverter}
      onOptionSelect={handleConverterChange}
      footerOptions={footerOptions}
    >
      <SidebarContentWrapper selectedOption={selectedOption}>
        <div className="mx-auto">
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
              <label className="text-sm font-medium mb-2 block">Input</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-full h-[400px] font-mono text-sm"
                placeholder="Paste your XML or JSON here"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium mb-2 block">Output</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-[400px] overflow-auto">
                {outputText ? (
                  <pre className="text-sm whitespace-pre-wrap">
                    {outputText}
                  </pre>
                ) : (
                  <p className="text-gray-400">
                    Converted output will appear here
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Button onClick={handleConvert}>Convert</Button>
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
            {outputText && (
              <Button variant="outline" onClick={handleCopy}>
                Copy
              </Button>
            )}
          </div>
        </div>
      </SidebarContentWrapper>
    </ReusableSidebar>
  );
}
