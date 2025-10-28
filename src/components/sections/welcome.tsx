"use client";

import { useState } from "react";
import {
  Download,
  Globe,
  FileText,
  FileImage,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function Welcome() {
  const [activeTab, setActiveTab] = useState("website");
  const [inputValue, setInputValue] = useState("");
  const [qrText, setQrText] = useState("Scan me!");
  const [textColor, setTextColor] = useState("#0f172a");
  const [qrColor, setQrColor] = useState("#111111");
  const [bgColor, setBgColor] = useState("#ffffff");

  const tabs = [
    { id: "website", label: "Website", icon: Globe },
    { id: "text", label: "Text", icon: FileText },
    { id: "pdf", label: "PDF", icon: FileText },
    { id: "image", label: "Images", icon: FileImage },
  ];

  const downloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    canvas.width = 1000;
    canvas.height = 1000;

    img.onload = () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 100, 100, 800, 800);

      const link = document.createElement("a");
      link.download = "qrcode-" + Date.now() + ".png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    const base64 = btoa(
      encodeURIComponent(svgData).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
    img.src = "data:image/svg+xml;base64," + base64;
  };

  return (
    // 👇 scroll issue fixed: removed min-h-screen, reduced py-16 → py-8
    <section className="min-h-[calc(100vh-120px)] bg-gradient-to-b from-gray-50 via-white to-gray-100 py-8 px-6 overflow-hidden">
      <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-10 items-start">
        {/* LEFT SIDE */}
        <div className="space-y-10">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
            <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
              <span className="w-7 h-7 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold">
                1
              </span>
              <h2 className="font-bold text-gray-800 text-lg">
                Complete the Content & Design QR
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* QR Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select QR Type
                </label>
                <div className="flex flex-wrap gap-3">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 ${
                          activeTab === tab.id
                            ? "border-blue-500 text-blue-600 bg-blue-50 shadow-sm"
                            : "border-gray-200 hover:border-blue-400 hover:text-blue-500"
                        }`}
                      >
                        <Icon size={16} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your{" "}
                  {activeTab === "website" ? "Website URL" : "Custom Text"}
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    activeTab === "website"
                      ? "https://example.com"
                      : "Enter your text here..."
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                {inputValue && (
                  <p className="text-xs text-green-600 mt-1 font-medium">
                    ✓ Looks good
                  </p>
                )}
              </div>

              {/* Display Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Text
                </label>
                <input
                  type="text"
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                  placeholder="Scan me!"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Color Pickers */}
              <div className="flex gap-4 mt-2">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-700 mb-1">Text</span>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-8 h-8 rounded-full cursor-pointer border border-gray-200"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-700 mb-1">QR</span>
                  <input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-8 h-8 rounded-full cursor-pointer border border-gray-200"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-700 mb-1">BG</span>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded-full cursor-pointer border border-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 sticky top-10 hover:shadow-lg transition-all">
          <h2 className="font-bold text-gray-800 flex items-center gap-2 text-lg mb-5">
            <span className="w-7 h-7 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold">
              2
            </span>
            Live Preview & Download
          </h2>

          <div className="border border-gray-200 rounded-xl p-8 mb-8 flex flex-col items-center justify-center bg-gray-50">
            {inputValue ? (
              <>
                <p
                  className="font-semibold mb-3 text-sm"
                  style={{ color: textColor }}
                >
                  {qrText}
                </p>
                <QRCodeSVG
                  id="qr-code-svg"
                  value={inputValue}
                  size={230}
                  level="H"
                  fgColor={qrColor}
                  bgColor={bgColor}
                  className="rounded-lg shadow-sm transition-transform duration-300 hover:scale-105"
                />
              </>
            ) : (
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-3">🎨</div>
                <p className="text-sm">Enter content to generate QR</p>
              </div>
            )}
          </div>

          {inputValue && (
            <button
              onClick={downloadQR}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Download size={18} /> Download QR
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
