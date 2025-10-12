"use client";

import { useState } from "react";
import { ReusableSidebar, SidebarContentWrapper, SidebarOption } from "@/components/ui/reusable-sidebar";
import { Button } from "@/components/ui/button";
import { FileText, Settings, Palette, Sparkles } from "lucide-react";
import { css as cssBeautify } from "js-beautify";
import less from "less"; // yarn add less
import * as sass from "sass"; // yarn add sass
// import stylus from "stylus"; // yarn add stylus

export function CssTools() {
  const [selectedTool, setSelectedTool] = useState("");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);

  const tools: SidebarOption[] = [
    { id: "css-beautifier", label: "CSS Beautifier", icon: Sparkles, description: "Beautify and format messy CSS code." },

    // CSS conversions
    { id: "css-to-less", label: "CSS to LESS", icon: FileText, description: "Convert plain CSS to LESS syntax." },
    { id: "css-to-scss", label: "CSS to SCSS", icon: FileText, description: "Convert CSS to SCSS format." },
    { id: "css-to-sass", label: "CSS to SASS", icon: FileText, description: "Convert CSS to indented SASS syntax." },
    { id: "css-to-stylus", label: "CSS to Stylus", icon: FileText, description: "Convert CSS to Stylus syntax." },

    // Stylus tools
    { id: "stylus-compiler", label: "Stylus Compiler", icon: FileText, description: "Compile Stylus code to CSS." },
    { id: "stylus-to-css", label: "Stylus to CSS", icon: FileText, description: "Convert Stylus to CSS output." },
    { id: "stylus-to-less", label: "Stylus to LESS", icon: FileText, description: "Convert Stylus to LESS syntax." },
    { id: "stylus-to-scss", label: "Stylus to SCSS", icon: FileText, description: "Convert Stylus to SCSS syntax." },
    { id: "stylus-to-sass", label: "Stylus to SASS", icon: FileText, description: "Convert Stylus to SASS syntax." },

    // LESS tools
    { id: "less-compiler", label: "LESS Compiler", icon: FileText, description: "Compile LESS code to CSS." },
    { id: "less-to-css", label: "LESS to CSS", icon: FileText, description: "Convert LESS to CSS output." },
    { id: "less-to-stylus", label: "LESS to Stylus", icon: FileText, description: "Convert LESS to Stylus syntax." },
    { id: "less-to-scss", label: "LESS to SCSS", icon: FileText, description: "Convert LESS to SCSS syntax." },
    { id: "less-to-sass", label: "LESS to SASS", icon: FileText, description: "Convert LESS to SASS syntax." },

    // SCSS tools
    { id: "scss-compiler", label: "SCSS Compiler", icon: FileText, description: "Compile SCSS code to CSS." },
    { id: "scss-to-css", label: "SCSS to CSS", icon: FileText, description: "Convert SCSS to CSS output." },
    { id: "scss-to-stylus", label: "SCSS to Stylus", icon: FileText, description: "Convert SCSS to Stylus syntax." },
    { id: "scss-to-less", label: "SCSS to LESS", icon: FileText, description: "Convert SCSS to LESS syntax." },
    { id: "scss-to-sass", label: "SCSS to SASS", icon: FileText, description: "Convert SCSS to SASS syntax." },

    // SASS tools
    { id: "sass-compiler", label: "SASS Compiler", icon: FileText, description: "Compile SASS code to CSS." },
    { id: "sass-to-css", label: "SASS to CSS", icon: FileText, description: "Convert SASS to CSS output." },
    { id: "sass-to-stylus", label: "SASS to Stylus", icon: FileText, description: "Convert SASS to Stylus syntax." },
    { id: "sass-to-scss", label: "SASS to SCSS", icon: FileText, description: "Convert SASS to SCSS syntax." },
    { id: "sass-to-less", label: "SASS to LESS", icon: FileText, description: "Convert SASS to LESS syntax." },
  ];

  const footerOptions: SidebarOption[] = [{ id: "settings", label: "Settings", icon: Settings }];

  const selectedOption = tools.find((tool) => tool.id === selectedTool);

  const handleConvert = async () => {
    if (!selectedTool) return;
    setLoading(true);
    let output = "";

    try {
      switch (selectedTool) {
        case "css-beautifier":
          output = cssBeautify(inputText, { indent_size: 2 });
          break;

        // Compilers
        case "less-compiler":
        case "less-to-css":
          output = (await less.render(inputText)).css;
          break;

        case "scss-compiler":
        case "scss-to-css":
          output = sass.compileString(inputText).css;
          break;

        case "sass-compiler":
        case "sass-to-css":
          output = sass.compileString(inputText, { syntax: "indented" }).css;
          break;

        case "stylus-compiler":
        case "stylus-to-css":
          output = await new Promise((resolve, reject) => {
            stylus.render(inputText, (err: any, css: string) => (err ? reject(err) : resolve(css)));
          });
          break;

        // Simple syntax conversions
        default:
          output = inputText
            .replace(/\{/g, "")
            .replace(/\}/g, "")
            .replace(/;/g, "")
            .replace(/  /g, "  ");
      }
    } catch (err: any) {
      output = "⚠️ Error: " + err.message;
    }

    setOutputText(output);
    setLoading(false);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <ReusableSidebar
      title="CSS Tools"
      icon={Palette}
      options={tools}
      selectedOption={selectedTool}
      onOptionSelect={setSelectedTool}
      footerOptions={footerOptions}
    >
      <SidebarContentWrapper selectedOption={selectedOption}>
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-1">{selectedOption?.label}</h2>
            <p className="text-gray-500 text-sm">{selectedOption?.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Input</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your CSS/LESS/SCSS/SASS/Stylus code..."
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Output</label>
              <div className="border border-gray-300 rounded-lg p-3 min-h-[200px] bg-gray-50 overflow-auto">
                {outputText ? (
                  <pre className="text-xs whitespace-pre-wrap text-gray-800">{outputText}</pre>
                ) : (
                  <p className="text-gray-400 text-sm">Converted output will appear here...</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button onClick={handleConvert} disabled={loading}>
              {loading ? "Converting..." : "Convert"}
            </Button>
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </SidebarContentWrapper>
    </ReusableSidebar>
  );
}
