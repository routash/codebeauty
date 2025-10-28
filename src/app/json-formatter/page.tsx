"use client"
import React, { useState } from 'react';
import { Copy, Download, AlertCircle, CheckCircle, Upload } from 'lucide-react';

export default function JsonFormatterTool() {
  const [inputJson, setInputJson] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [tabSpace, setTabSpace] = useState('2');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showConvertDropdown, setShowConvertDropdown] = useState(false);

  const validateJson = () => {
    setError('');
    setSuccess('');
    if (!inputJson.trim()) {
      setError('Please enter JSON data');
      return;
    }
    try {
      JSON.parse(inputJson);
      setSuccess('✓ Valid JSON');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e: any) {
      setError('Invalid JSON: ' + e.message);
    }
  };

  const formatBeautify = () => {
    setError('');
    setSuccess('');
    if (!inputJson.trim()) {
      setError('Please enter JSON data');
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, parseInt(tabSpace));
      setOutputJson(formatted);
      setSuccess('✓ JSON Beautified Successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e: any) {
      setError('Error: ' + e.message);
    }
  };

  const minifyCompact = () => {
    setError('');
    setSuccess('');
    if (!inputJson.trim()) {
      setError('Please enter JSON data');
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setSuccess('✓ JSON Minified Successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e: any) {
      setError('Error: ' + e.message);
    }
  };

  const copyToClipboard = () => {
    if (!outputJson) return;
    navigator.clipboard.writeText(outputJson);
    setSuccess('✓ Copied to Clipboard');
    setTimeout(() => setSuccess(''), 2000);
  };

  const downloadJson = () => {
    if (!outputJson) return;
    const blob = new Blob([outputJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
    setSuccess('✓ Downloaded');
    setTimeout(() => setSuccess(''), 2000);
  };

  const clearAll = () => {
    setInputJson('');
    setOutputJson('');
    setError('');
    setSuccess('');
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInputJson(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const loadSample = () => {
    const sample = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "hobbies": ["reading", "coding", "traveling"]
}`;
    setInputJson(sample);
  };

  const convertToXML = () => {
    setError('');
    setSuccess('');
    if (!inputJson.trim()) {
      setError('Please enter JSON data');
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      const xml = jsonToXML(parsed);
      setOutputJson(xml);
      setSuccess('✓ Converted to XML');
      setTimeout(() => setSuccess(''), 3000);
      setShowConvertDropdown(false);
    } catch (e: any) {
      setError('Error: ' + e.message);
    }
  };

  const convertToCSV = () => {
    setError('');
    setSuccess('');
    if (!inputJson.trim()) {
      setError('Please enter JSON data');
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      const csv = jsonToCSV(parsed);
      setOutputJson(csv);
      setSuccess('✓ Converted to CSV');
      setTimeout(() => setSuccess(''), 3000);
      setShowConvertDropdown(false);
    } catch (e: any) {
      setError('Error: ' + e.message);
    }
  };

  const convertToYAML = () => {
    setError('');
    setSuccess('');
    if (!inputJson.trim()) {
      setError('Please enter JSON data');
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      const yaml = jsonToYAML(parsed);
      setOutputJson(yaml);
      setSuccess('✓ Converted to YAML');
      setTimeout(() => setSuccess(''), 3000);
      setShowConvertDropdown(false);
    } catch (e: any) {
      setError('Error: ' + e.message);
    }
  };

  const jsonToXML = (obj: any, indent: number = 0): string => {
    let xml = '';
    const spaces = '  '.repeat(indent);
    
    if (Array.isArray(obj)) {
      obj.forEach(item => {
        xml += `${spaces}<item>\n${jsonToXML(item, indent + 1)}${spaces}</item>\n`;
      });
    } else if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
          xml += `${spaces}<${key}>\n${jsonToXML(value, indent + 1)}${spaces}</${key}>\n`;
        } else {
          xml += `${spaces}<${key}>${value}</${key}>\n`;
        }
      });
    }
    
    return xml;
  };

  const jsonToCSV = (obj: any): string => {
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '';
      const headers = Object.keys(obj[0]);
      let csv = headers.join(',') + '\n';
      obj.forEach(row => {
        csv += headers.map(header => {
          const value = row[header];
          return typeof value === 'string' ? `"${value}"` : value;
        }).join(',') + '\n';
      });
      return csv;
    } else if (typeof obj === 'object') {
      const headers = Object.keys(obj);
      let csv = headers.join(',') + '\n';
      csv += headers.map(key => {
        const value = obj[key];
        return typeof value === 'string' ? `"${value}"` : value;
      }).join(',');
      return csv;
    }
    return String(obj);
  };

  const jsonToYAML = (obj: any, indent: number = 0): string => {
    let yaml = '';
    const spaces = '  '.repeat(indent);
    
    if (Array.isArray(obj)) {
      obj.forEach(item => {
        if (typeof item === 'object' && item !== null) {
          yaml += `${spaces}-\n${jsonToYAML(item, indent + 1)}`;
        } else {
          yaml += `${spaces}- ${item}\n`;
        }
      });
    } else if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
          yaml += `${spaces}${key}:\n${jsonToYAML(value, indent + 1)}`;
        } else {
          yaml += `${spaces}${key}: ${value}\n`;
        }
      });
    }
    
    return yaml;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600">
      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-120px)]">
          {/* Left Panel - Input */}
          <div className="lg:col-span-5 bg-white rounded-lg shadow-xl flex flex-col h-full">
            <div className="bg-slate-700 px-4 py-2 flex items-center gap-2 rounded-t-lg flex-shrink-0">
              <div className="flex items-center gap-2 flex-1">
                <button className="text-white hover:bg-slate-600 p-1 rounded" title="Format">≡</button>
                <button className="text-white hover:bg-slate-600 p-1 rounded" title="Align">☰</button>
                <button className="text-white hover:bg-slate-600 p-1 rounded" title="Sort">⇅</button>
                <button className="text-white hover:bg-slate-600 p-1 rounded" title="Filter">⚲</button>
                <button className="text-white hover:bg-slate-600 p-1 rounded" title="Tools">🔧</button>
                <button className="text-white hover:bg-slate-600 p-1 rounded" title="Undo">↶</button>
              </div>
              <button 
                onClick={loadSample}
                className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm font-semibold"
              >
                Sample
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <textarea
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                className="w-full h-full p-4 font-mono text-sm focus:outline-none resize-none bg-gray-50"
                placeholder="Paste your JSON here..."
                style={{ lineHeight: '1.5' }}
              />
            </div>
            <div className="px-4 py-2 bg-gray-100 text-xs text-gray-600 flex-shrink-0">
              Ln: 1  Col: 1
            </div>
          </div>

          {/* Middle Panel - Controls */}
          <div className="lg:col-span-2 flex flex-col gap-3 h-full">
            <div className="bg-teal-500 rounded-lg shadow-xl flex flex-col gap-3 p-4 flex-1">
              <div className="relative">
                <button
                  className="w-full bg-white hover:bg-gray-100 text-teal-700 py-3 px-4 rounded-lg font-bold text-sm border-2 border-teal-300 transition-all"
                >
                  Upload Data
                </button>
                <input
                  type="file"
                  accept=".json"
                  onChange={uploadFile}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              <button
                onClick={validateJson}
                className="bg-white hover:bg-gray-100 text-teal-700 py-3 px-4 rounded-lg font-bold text-sm border-2 border-teal-300 transition-all"
              >
                Validate
              </button>

              <select
                value={tabSpace}
                onChange={(e) => setTabSpace(e.target.value)}
                className="bg-white text-teal-700 py-3 px-4 rounded-lg font-bold text-sm border-2 border-teal-300 focus:outline-none"
              >
                <option value="2">2 Tab Space</option>
                <option value="3">3 Tab Space</option>
                <option value="4">4 Tab Space</option>
              </select>

              <button
                onClick={formatBeautify}
                className="bg-white hover:bg-gray-100 text-teal-700 py-3 px-4 rounded-lg font-bold text-sm border-2 border-teal-300 transition-all"
              >
                Format / Beautify
              </button>

              <button
                onClick={minifyCompact}
                className="bg-white hover:bg-gray-100 text-teal-700 py-3 px-4 rounded-lg font-bold text-sm border-2 border-teal-300 transition-all"
              >
                Minify / Compact
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowConvertDropdown(!showConvertDropdown)}
                  className="w-full bg-white hover:bg-gray-100 text-teal-700 py-3 px-4 rounded-lg font-bold text-sm border-2 border-teal-300 transition-all"
                >
                  Convert JSON to-
                </button>
                
                {showConvertDropdown && (
                  <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border-2 border-teal-300 overflow-hidden z-10">
                    <button
                      onClick={convertToXML}
                      className="w-full text-left px-4 py-3 hover:bg-teal-50 text-gray-800 font-semibold text-sm border-b border-gray-200"
                    >
                      JSON to XML
                    </button>
                    <button
                      onClick={convertToCSV}
                      className="w-full text-left px-4 py-3 hover:bg-teal-50 text-gray-800 font-semibold text-sm border-b border-gray-200"
                    >
                      JSON to CSV
                    </button>
                    <button
                      onClick={convertToYAML}
                      className="w-full text-left px-4 py-3 hover:bg-teal-50 text-gray-800 font-semibold text-sm"
                    >
                      JSON to YAML
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={downloadJson}
                disabled={!outputJson}
                className="bg-white hover:bg-gray-100 text-teal-700 py-3 px-4 rounded-lg font-bold text-sm border-2 border-teal-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Download
              </button>

              <div className="mt-auto pt-4 border-t-2 border-white/30">
                <div className="text-center text-white">
                  <p className="font-bold text-sm mb-1">JSON Full Form</p>
                  <p className="text-xs">JavaScript Object Notation</p>
                </div>
              </div>

              {/* Status Messages */}
              {error && (
                <div className="bg-red-100 border-2 border-red-400 text-red-700 px-3 py-2 rounded-lg text-xs">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-100 border-2 border-green-400 text-green-700 px-3 py-2 rounded-lg text-xs">
                  {success}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Output */}
          <div className="lg:col-span-5 bg-white rounded-lg shadow-xl flex flex-col h-full">
            <div className="bg-slate-700 px-4 py-2 flex items-center gap-2 rounded-t-lg flex-shrink-0">
              <div className="flex items-center gap-2 flex-1">
                <button className="text-white hover:bg-slate-600 p-1 rounded" title="Format">≡</button>
                <button className="text-white hover:bg-slate-600 p-1 rounded" title="Align">☰</button>
                <button className="text-white hover:bg-slate-600 p-1 rounded" title="Sort">⇅</button>
                <button className="text-white hover:bg-slate-600 p-1 rounded" title="Filter">⚲</button>
                <button className="text-white hover:bg-slate-600 p-1 rounded" title="Tools">🔧</button>
              </div>
              <select className="bg-slate-600 text-white px-2 py-1 rounded text-sm">
                <option>Code</option>
              </select>
              <button 
                onClick={copyToClipboard}
                disabled={!outputJson}
                className="text-white hover:bg-slate-600 p-1 rounded disabled:opacity-50"
                title="Copy"
              >
                📋
              </button>
              <button className="text-white hover:bg-slate-600 p-1 rounded" title="Clear">✕</button>
            </div>
            <div className="flex-1 overflow-hidden">
              <textarea
                value={outputJson}
                readOnly
                className="w-full h-full p-4 font-mono text-sm bg-gray-50 resize-none focus:outline-none"
                placeholder="Output will appear here..."
                style={{ lineHeight: '1.5' }}
              />
            </div>
            <div className="px-4 py-2 bg-gray-100 text-xs text-gray-600 flex-shrink-0">
              Ln: 1  Col: 1
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="mt-4 flex gap-4 justify-center">
          <button
            onClick={clearAll}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg font-bold text-sm transition-all shadow-lg"
          >
            Clear All
          </button>
        </div>
      </main>
    </div>
  );
}