"use client"
import React, { useState, useRef } from 'react';

export default function XmlFormatterPage() {
  const [inputXml, setInputXml] = useState('');
  const [outputXml, setOutputXml] = useState('');
  const [tabSpace, setTabSpace] = useState('2');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateXml = () => {
    setError('');
    setSuccess('');
    if (!inputXml.trim()) {
      setError('Please enter XML data');
      return;
    }
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(inputXml, 'text/xml');
      const parseError = xmlDoc.getElementsByTagName('parsererror');
      
      if (parseError.length > 0) {
        setError('Invalid XML: ' + parseError[0].textContent);
      } else {
        setSuccess('✓ Valid XML');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (e: any) {
      setError('Error: ' + (e instanceof Error ? e.message : 'Unknown error'));
    }
  };

  const formatBeautify = () => {
    setError('');
    setSuccess('');
    if (!inputXml.trim()) {
      setError('Please enter XML data');
      return;
    }
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(inputXml, 'text/xml');
      const parseError = xmlDoc.getElementsByTagName('parsererror');
      
      if (parseError.length > 0) {
        setError('Invalid XML');
        return;
      }
      
      const formatted = formatXml(inputXml, parseInt(tabSpace));
      setOutputXml(formatted);
      setSuccess('✓ XML Formatted Successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e: any) {
      setError('Error: ' + (e instanceof Error ? e.message : 'Unknown error'));
    }
  };

  const formatXml = (xml: string, spaces: number): string => {
    const PADDING = ' '.repeat(spaces);
    const reg = /(>)(<)(\/*)/g;
    let pad = 0;
    
    xml = xml.replace(reg, '$1\n$2$3');
    
    return xml.split('\n').map((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) {
          pad -= 1;
        }
      } else if (node.match(/^<\w([^>]*[^\/])?>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }
      
      const padding = PADDING.repeat(pad);
      pad += indent;
      
      return padding + node;
    }).join('\n');
  };

  const minifyCompact = () => {
    setError('');
    setSuccess('');
    if (!inputXml.trim()) {
      setError('Please enter XML data');
      return;
    }
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(inputXml, 'text/xml');
      const parseError = xmlDoc.getElementsByTagName('parsererror');
      
      if (parseError.length > 0) {
        setError('Invalid XML');
        return;
      }
      
      const minified = inputXml.replace(/>\s+</g, '><').trim();
      setOutputXml(minified);
      setSuccess('✓ XML Minified Successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e: any) {
      setError('Error: ' + (e instanceof Error ? e.message : 'Unknown error'));
    }
  };

  const xmlToJson = () => {
    setError('');
    setSuccess('');
    if (!inputXml.trim()) {
      setError('Please enter XML data');
      return;
    }
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(inputXml, 'text/xml');
      const parseError = xmlDoc.getElementsByTagName('parsererror');
      
      if (parseError.length > 0) {
        setError('Invalid XML');
        return;
      }
      
      const json = xmlToJsonConverter(xmlDoc.documentElement);
      setOutputXml(JSON.stringify(json, null, 2));
      setSuccess('✓ Converted to JSON');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e: any) {
      setError('Error: ' + (e instanceof Error ? e.message : 'Unknown error'));
    }
  };

  const xmlToJsonConverter = (xml: any): any => {
    let result: any = {};
    
    if (xml.nodeType === 1) {
      if (xml.attributes.length > 0) {
        result['@attributes'] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes.item(j);
          if (attribute) {
            result['@attributes'][attribute.nodeName] = attribute.nodeValue;
          }
        }
      }
    } else if (xml.nodeType === 3) {
      return xml.nodeValue;
    }
    
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        if (!item) continue;
        
        const tagName = item.nodeName;
        const converted = xmlToJsonConverter(item);
        
        if (typeof result[tagName] === 'undefined') {
          result[tagName] = converted;
        } else {
          if (!Array.isArray(result[tagName])) {
            const old = result[tagName];
            result[tagName] = [old];
          }
          result[tagName].push(converted);
        }
      }
    }
    return result;
  };

  const showXmlTree = () => {
    setError('');
    setSuccess('');
    if (!inputXml.trim()) {
      setError('Please enter XML data');
      return;
    }
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(inputXml, 'text/xml');
      const parseError = xmlDoc.getElementsByTagName('parsererror');
      
      if (parseError.length > 0) {
        setError('Invalid XML');
        return;
      }
      
      const tree = buildXmlTree(xmlDoc.documentElement, 0);
      setOutputXml(tree);
      setSuccess('✓ XML Tree Generated');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e: any) {
      setError('Error: ' + (e instanceof Error ? e.message : 'Unknown error'));
    }
  };

  const buildXmlTree = (node: any, level: number): string => {
    const indent = '  '.repeat(level);
    let tree = '';
    
    if (node.nodeType === 1) {
      tree += `${indent}├─ <${node.nodeName}>\n`;
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        if (child.nodeType === 1) {
          tree += buildXmlTree(child, level + 1);
        } else if (child.nodeType === 3 && child.nodeValue && child.nodeValue.trim()) {
          tree += `${indent}  └─ "${child.nodeValue.trim()}"\n`;
        }
      }
    }
    
    return tree;
  };

  const copyToClipboard = () => {
    if (!outputXml) return;
    navigator.clipboard.writeText(outputXml);
    setSuccess('✓ Copied to Clipboard');
    setTimeout(() => setSuccess(''), 2000);
  };

  const downloadXml = () => {
    if (!outputXml) return;
    const blob = new Blob([outputXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.xml';
    a.click();
    URL.revokeObjectURL(url);
    setSuccess('✓ Downloaded');
    setTimeout(() => setSuccess(''), 2000);
  };

  const clearAll = () => {
    setInputXml('');
    setOutputXml('');
    setError('');
    setSuccess('');
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setInputXml(result);
          setSuccess('✓ File Loaded Successfully');
          setTimeout(() => setSuccess(''), 2000);
        }
      };
      reader.readAsText(file);
    }
  };

  const loadSample = () => {
    const sample = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book category="cooking">
    <title lang="en">Everyday Italian</title>
    <author>Giada De Laurentiis</author>
    <year>2005</year>
    <price>30.00</price>
  </book>
  <book category="children">
    <title lang="en">Harry Potter</title>
    <author>J K. Rowling</author>
    <year>2005</year>
    <price>29.99</price>
  </book>
</bookstore>`;
    setInputXml(sample);
    setSuccess('✓ Sample Loaded');
    setTimeout(() => setSuccess(''), 2000);
  };

  const getLineNumbers = (text: string): number[] => {
    const lines = text.split('\n').length;
    return Array.from({ length: lines }, (_, i) => i + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600">
      <main className="max-w-[1600px] mx-auto p-4">
        <div className="mb-4 h-10">
          {error && (
            <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm font-semibold animate-pulse">
              ❌ {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border-2 border-green-400 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold">
              {success}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-120px)]">
          <div className="lg:col-span-5 bg-white rounded-lg shadow-xl flex flex-col h-full">
            <div className="bg-slate-700 px-4 py-2 flex items-center justify-between rounded-t-lg flex-shrink-0">
              <span className="text-white font-semibold text-sm">Input XML</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={loadSample}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-xs font-semibold transition-all"
                  title="Load Sample"
                >
                  Sample
                </button>
                <button 
                  onClick={() => setInputXml('')}
                  className="text-white hover:bg-slate-600 p-1 rounded text-sm"
                  title="Clear"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex h-full">
                <div className="w-12 bg-gray-100 text-gray-500 text-xs text-right pr-2 pt-4 flex-shrink-0 overflow-y-hidden">
                  {getLineNumbers(inputXml).map(num => (
                    <div key={num} style={{ lineHeight: '1.5', height: '21px' }}>{num}</div>
                  ))}
                </div>
                <textarea
                  value={inputXml}
                  onChange={(e) => setInputXml(e.target.value)}
                  className="flex-1 p-4 font-mono text-sm focus:outline-none resize-none bg-gray-50"
                  placeholder="Paste or type your XML here..."
                  style={{ lineHeight: '1.5' }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3 h-full">
            <div className="bg-teal-500 rounded-lg shadow-xl flex flex-col gap-3 p-4 overflow-y-auto">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xml"
                onChange={uploadFile}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-white hover:bg-gray-100 text-teal-700 py-3 px-4 rounded-lg font-bold text-sm border-2 border-teal-300 transition-all"
              >
                 Load Data
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
                onClick={validateXml}
                className="bg-white hover:bg-gray-100 text-teal-700 py-3 px-4 rounded-lg font-bold text-sm border-2 border-teal-300 transition-all"
              >
                 Validate XML
              </button>

              <button
                onClick={formatBeautify}
                className="bg-white hover:bg-gray-100 text-teal-700 py-3 px-4 rounded-lg font-bold text-sm border-2 border-teal-300 transition-all"
              >
                 Format / Beautify
              </button>

              <button
                onClick={showXmlTree}
                className="bg-white hover:bg-gray-100 text-teal-700 py-3 px-4 rounded-lg font-bold text-sm border-2 border-teal-300 transition-all"
              >
                 XML Tree
              </button>

              <button
                onClick={minifyCompact}
                className="bg-white hover:bg-gray-100 text-teal-700 py-3 px-4 rounded-lg font-bold text-sm border-2 border-teal-300 transition-all"
              >
                 Minify / Compact
              </button>

              <button
                onClick={xmlToJson}
                className="bg-white hover:bg-gray-100 text-teal-700 py-3 px-4 rounded-lg font-bold text-sm border-2 border-teal-300 transition-all"
              >
                 XML to JSON
              </button>

              <button
                onClick={downloadXml}
                disabled={!outputXml}
                className="bg-white hover:bg-gray-100 text-teal-700 py-3 px-4 rounded-lg font-bold text-sm border-2 border-teal-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 Download
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-lg shadow-xl flex flex-col h-full">
            <div className="bg-slate-700 px-4 py-2 flex items-center justify-between rounded-t-lg flex-shrink-0">
              <span className="text-white font-semibold text-sm">Formatted XML</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={copyToClipboard}
                  disabled={!outputXml}
                  className="text-white hover:bg-slate-600 p-1 rounded disabled:opacity-50 text-sm transition-all"
                  title="Copy"
                >
                  
                </button>
                <button 
                  onClick={() => setOutputXml('')}
                  className="text-white hover:bg-slate-600 p-1 rounded text-sm"
                  title="Clear"
                >
                  ✕
                </button>
                <button 
                  onClick={downloadXml}
                  disabled={!outputXml}
                  className="text-white hover:bg-slate-600 p-1 rounded disabled:opacity-50 text-sm transition-all"
                  title="Download"
                >
                  
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex h-full">
                <div className="w-12 bg-gray-100 text-gray-500 text-xs text-right pr-2 pt-4 flex-shrink-0 overflow-y-hidden">
                  {getLineNumbers(outputXml).map(num => (
                    <div key={num} style={{ lineHeight: '1.5', height: '21px' }}>{num}</div>
                  ))}
                </div>
                <textarea
                  value={outputXml}
                  readOnly
                  className="flex-1 p-4 font-mono text-sm bg-gray-50 resize-none focus:outline-none"
                  placeholder="Output will appear here..."
                  style={{ lineHeight: '1.5' }}
                />
              </div>
            </div>
          </div>
        </div>

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