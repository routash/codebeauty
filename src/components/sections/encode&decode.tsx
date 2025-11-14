"use client";

import { useState } from "react";
import {
  ReusableSidebar,
  SidebarContentWrapper,
  SidebarOption,
} from "@/components/ui/reusable-sidebar";
import { Button } from "@/components/ui/button";
import { FileText, Settings, Palette } from "lucide-react";
import { encode as base32Encode, decode as base32Decode } from "hi-base32";
import bs58 from "bs58";

export default function EncodeDecode({ defaultTool }: { defaultTool?: string }) {
  const [selectedConverter, setSelectedConverter] = useState(defaultTool || "");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const converterOptions: SidebarOption[] = [
    { id: "base32-encode", label: "Base32 Encode", icon: FileText, description: "Encode text or data into Base32 format." },
    { id: "base32-decode", label: "Base32 Decode", icon: FileText, description: "Decode Base32 encoded text back to its original form." },
    { id: "base58-encode", label: "Base58 Encode", icon: FileText, description: "Encode text or data into Base58 format." },
    { id: "base58-decode", label: "Base58 Decode", icon: FileText, description: "Decode Base58 encoded text into readable data." },
    { id: "base64-encode", label: "Base64 Encode", icon: FileText, description: "Convert text or binary data into Base64 encoding." },
    { id: "base64-decode", label: "Base64 Decode", icon: FileText, description: "Decode Base64 encoded strings to plain text." },
    { id: "url-encode", label: "URL Encode", icon: FileText, description: "Encode URLs safely for the web." },
    { id: "url-decode", label: "URL Decode", icon: FileText, description: "Decode encoded URLs back to readable format." },
    { id: "json-url-encode", label: "JSON URL Encode", icon: FileText, description: "Encode JSON into a URL-safe string." },
    { id: "json-url-decode", label: "JSON URL Decode", icon: FileText, description: "Decode URL-encoded JSON." },
    { id: "html-encode", label: "HTML Encode", icon: FileText, description: "Convert HTML special characters into entities." },
    { id: "html-decode", label: "HTML Decode", icon: FileText, description: "Decode HTML entities back into text." },
    { id: "xml-url-encode", label: "XML URL Encode", icon: FileText, description: "Encode XML safely for URLs." },
    { id: "xml-url-decode", label: "XML URL Decode", icon: FileText, description: "Decode URL-encoded XML content." },
    { id: "utf8-converter", label: "UTF8 Encode", icon: FileText, description: "Convert text into UTF-8 bytes." },
    { id: "utf8-decode", label: "UTF8 Decode", icon: FileText, description: "Convert UTF-8 bytes back into text." },
    { id: "hex-to-utf8", label: "Hex to UTF8", icon: FileText, description: "Convert hex string into readable UTF8 text." },
    { id: "json-decode-online", label: "JSON Decode", icon: FileText, description: "Pretty-print or decode JSON strings." },
    { id: "json-encode-online", label: "JSON Encode", icon: FileText, description: "Convert objects into JSON strings." },
  ];

  const footerOptions: SidebarOption[] = [
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const selectedOption = converterOptions.find(
    (opt) => opt.id === selectedConverter
  );

  const handleConverterChange = (converterId: string) => {
    setSelectedConverter(converterId);
    setInput("");
    setOutput("");
  };

  const handleConvert = () => {
    try {
      let result = "";

      switch (selectedConverter) {
        // Base32
        case "base32-encode":
          result = base32Encode(input);
          break;
        case "base32-decode":
          result = base32Decode(input.toUpperCase().replace(/\s/g, ""));
          break;

        // Base58
        case "base58-encode":
          result = bs58.encode(new TextEncoder().encode(input));
          break;
        case "base58-decode": {
          const cleanInput = input.trim();
          if (!cleanInput) throw new Error("Input cannot be empty");
          const base58Regex = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/;
          if (!base58Regex.test(cleanInput))
            throw new Error("Invalid Base58 string. Avoid: 0, O, I, l");
          const decoded = bs58.decode(cleanInput);
          result = new TextDecoder().decode(decoded);
          break;
        }

        // Base64
        case "base64-encode":
          result = btoa(unescape(encodeURIComponent(input)));
          break;
        case "base64-decode":
          result = decodeURIComponent(escape(atob(input)));
          break;

        // URL
        case "url-encode":
          result = encodeURIComponent(input);
          break;
        case "url-decode":
          result = decodeURIComponent(input);
          break;

        // JSON URL
        case "json-url-encode":
          try {
            const parsed = JSON.parse(input);
            result = encodeURIComponent(JSON.stringify(parsed));
          } catch {
            result = encodeURIComponent(input);
          }
          break;
        case "json-url-decode":
          result = JSON.stringify(
            JSON.parse(decodeURIComponent(input)),
            null,
            2
          );
          break;

        // HTML
        case "html-encode":
          result = input.replace(
            /[\u00A0-\u9999<>&"']/g,
            (i) => `&#${i.charCodeAt(0)};`
          );
          break;
        case "html-decode": {
          const textarea = document.createElement("textarea");
          textarea.innerHTML = input;
          result = textarea.value;
          break;
        }

        // XML
        case "xml-url-encode":
          result = encodeURIComponent(input);
          break;
        case "xml-url-decode":
          result = decodeURIComponent(input);
          break;

        // UTF-8
        case "utf8-converter":
          result = Array.from(new TextEncoder().encode(input)).join(", ");
          break;
        case "utf8-decode": {
          const bytes = input
            .split(",")
            .map((s) => parseInt(s.trim()))
            .filter((n) => !isNaN(n));
          result = new TextDecoder().decode(Uint8Array.from(bytes));
          break;
        }

        // Hex
        case "hex-to-utf8": {
          const hexStr = input.replace(/^0x/, "").replace(/\s/g, "");
          if (!/^[0-9a-fA-F]*$/.test(hexStr))
            throw new Error("Invalid hex string.");
          const hexBytes: number[] = [];
          for (let i = 0; i < hexStr.length; i += 2) {
            hexBytes.push(parseInt(hexStr.substr(i, 2), 16));
          }
          result = new TextDecoder().decode(Uint8Array.from(hexBytes));
          break;
        }

        // JSON
        case "json-decode-online":
          result = JSON.stringify(JSON.parse(input), null, 2);
          break;
        case "json-encode-online":
          try {
            const parsed = JSON.parse(input);
            result = JSON.stringify(parsed);
          } catch {
            result = JSON.stringify(input);
          }
          break;

        default:
          result = "⚠️ Please select a valid conversion type.";
      }

      setOutput(result);
    } catch (error: any) {
      setOutput(`❌ Error: ${error.message || "Invalid input or format"}`);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ReusableSidebar
      title="Encode & Decode Tools"
      icon={Palette}
      options={converterOptions}
      selectedOption={selectedConverter}
      onOptionSelect={handleConverterChange}
      footerOptions={footerOptions}
    >
      <SidebarContentWrapper selectedOption={selectedOption}>
        <div className="mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {selectedOption?.label || "Select a Tool"}
            </h2>
            <p className="text-muted-foreground">
              {selectedOption?.description ||
                "Choose an encoding or decoding tool to begin."}
            </p>
          </div>

          {selectedConverter === "base58-decode" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <p className="font-semibold text-blue-900 mb-1">
                ℹ️ Base58 Character Set
              </p>
              <p className="text-blue-800">
                Valid:{" "}
                <code className="bg-blue-100 px-1 rounded font-mono">
                  123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz
                </code>
              </p>
              <p className="text-blue-800 mt-1">
                Invalid:{" "}
                <code className="bg-red-100 px-1 rounded font-mono">
                  0 O I l
                </code>{" "}
                (zero, capital O, capital I, lowercase L)
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Input</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border-2 border-dashed border-gray-300 rounded-lg p-3 w-full h-48 font-mono"
                placeholder="Enter your text or data here..."
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Output</label>
              <textarea
                value={output}
                readOnly
                className="border-2 border-dashed border-gray-300 rounded-lg p-3 w-full h-48 bg-gray-50 font-mono"
                placeholder="Your result will appear here..."
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert}>Convert</Button>
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </SidebarContentWrapper>
    </ReusableSidebar>
  );
}
