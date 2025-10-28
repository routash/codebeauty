'use client';

import { useState, useRef } from 'react';
import { removeBackground } from '@imgly/background-removal';

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [customColor, setCustomColor] = useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const presetColors = [
    { name: 'Transparent', value: 'transparent', gradient: 'repeating-conic-gradient(#e5e7eb 0% 25%, #ffffff 0% 50%)' },
    { name: 'White', value: '#ffffff', gradient: null },
    { name: 'Black', value: '#000000', gradient: null },
    { name: 'Red', value: '#ef4444', gradient: null },
    { name: 'Blue', value: '#3b82f6', gradient: null },
    { name: 'Green', value: '#10b981', gradient: null },
    { name: 'Purple', value: '#a855f7', gradient: null },
    { name: 'Yellow', value: '#eab308', gradient: null },
    { name: 'Pink', value: '#ec4899', gradient: null },
    { name: 'Orange', value: '#f97316', gradient: null },
    { name: 'Teal', value: '#14b8a6', gradient: null },
    { name: 'Indigo', value: '#6366f1', gradient: null },
    { name: 'Gradient Purple', value: 'gradient1', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'Gradient Pink', value: 'gradient2', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { name: 'Gradient Blue', value: 'gradient3', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { name: 'Gradient Sunset', value: 'gradient4', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsProcessing(true);
    setProgress(0);
    setProcessedImage(null);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const imageBlob = await removeBackground(file);

      clearInterval(progressInterval);
      setProgress(100);

      const url = URL.createObjectURL(imageBlob);
      setProcessedImage(url);
    } catch (error) {
      console.error('Error removing background:', error);
      alert('Background remove karne me error aaya. Koi aur image try karo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getBackgroundStyle = () => {
    const selected = presetColors.find(c => c.value === backgroundColor);
    if (selected?.gradient) {
      return { backgroundImage: selected.gradient, backgroundSize: '20px 20px' };
    }
    if (backgroundColor === 'custom') {
      return { backgroundColor: customColor };
    }
    if (backgroundColor === 'transparent') {
      return { 
        backgroundImage: 'repeating-conic-gradient(#e5e7eb 0% 25%, #ffffff 0% 50%)',
        backgroundSize: '20px 20px'
      };
    }
    return { backgroundColor };
  };

  const getCurrentColorStyle = () => {
    const selected = presetColors.find(c => c.value === backgroundColor);
    if (selected?.gradient) {
      return { backgroundImage: selected.gradient };
    }
    if (backgroundColor === 'custom') {
      return { backgroundColor: customColor };
    }
    if (backgroundColor === 'transparent') {
      return { 
        backgroundImage: 'repeating-conic-gradient(#e5e7eb 0% 25%, #ffffff 0% 50%)',
        backgroundSize: '10px 10px'
      };
    }
    return { backgroundColor };
  };

  const handleDownload = async () => {
    if (!processedImage || !canvasRef.current) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;

      if (backgroundColor === 'transparent') {
        // Transparent background
      } else if (backgroundColor.startsWith('gradient')) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (backgroundColor === 'custom') {
        ctx.fillStyle = customColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `background-removed-${Date.now()}.png`;
          link.click();
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    };
    img.src = processedImage;
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setProgress(0);
    setBackgroundColor('transparent');
    setShowColorPicker(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="py-12 px-4">
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Background Remover
        </h2>
        <p className="text-gray-600">
          Remove background and add custom colors
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Upload Section */}
        {!originalImage && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="bg-file-upload"
            />
            <label htmlFor="bg-file-upload" className="cursor-pointer flex flex-col items-center">
              <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-lg font-medium text-gray-700 mb-1">
                Click to upload image
              </span>
              <span className="text-sm text-gray-500">
                PNG, JPG, JPEG (Max 10MB)
              </span>
            </label>
          </div>
        )}

        {/* Processing/Result Section */}
        {originalImage && (
          <div>
            {/* Progress Bar */}
            {isProcessing && (
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Processing...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Images Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Original Image */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Original Image
                </h3>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                  <img src={originalImage} alt="Original" className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Processed Image */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Result
                  </h3>
                  
                  {/* Color Picker Button */}
                  {processedImage && (
                    <div className="relative">
                      <button
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors"
                      >
                        <div 
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={getCurrentColorStyle()}
                        />
                        <span className="text-sm font-medium text-gray-700">Change Color</span>
                        <svg className={`w-4 h-4 text-gray-500 transition-transform ${showColorPicker ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Color Picker Dropdown */}
                      {showColorPicker && (
                        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-10 w-80">
                          <div className="mb-3">
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Preset Colors</p>
                            <div className="grid grid-cols-6 gap-2">
                              {presetColors.slice(0, 12).map((color) => (
                                <button
                                  key={color.value}
                                  onClick={() => {
                                    setBackgroundColor(color.value);
                                  }}
                                  className={`h-10 w-10 rounded-full border-2 transition-all hover:scale-110 ${
                                    backgroundColor === color.value
                                      ? 'border-blue-500 ring-2 ring-blue-200'
                                      : 'border-gray-200'
                                  }`}
                                  style={
                                    color.gradient
                                      ? { backgroundImage: color.gradient, backgroundSize: color.value === 'transparent' ? '8px 8px' : 'cover' }
                                      : { backgroundColor: color.value }
                                  }
                                  title={color.name}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="mb-3">
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Gradients</p>
                            <div className="grid grid-cols-4 gap-2">
                              {presetColors.slice(12).map((color) => (
                                <button
                                  key={color.value}
                                  onClick={() => {
                                    setBackgroundColor(color.value);
                                  }}
                                  className={`h-10 rounded-lg border-2 transition-all hover:scale-105 ${
                                    backgroundColor === color.value
                                      ? 'border-blue-500 ring-2 ring-blue-200'
                                      : 'border-gray-200'
                                  }`}
                                  style={{ backgroundImage: color.gradient }}
                                  title={color.name}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="pt-3 border-t border-gray-100">
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Custom Color</p>
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={customColor}
                                onChange={(e) => {
                                  setCustomColor(e.target.value);
                                  setBackgroundColor('custom');
                                }}
                                className="h-10 w-16 rounded border border-gray-300 cursor-pointer"
                              />
                              <input
                                type="text"
                                value={customColor}
                                onChange={(e) => {
                                  setCustomColor(e.target.value);
                                  setBackgroundColor('custom');
                                }}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono"
                                placeholder="#ffffff"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                  {processedImage ? (
                    <div className="w-full h-full" style={getBackgroundStyle()}>
                      <img src={processedImage} alt="Processed" className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-50">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-3"></div>
                        <p className="text-sm text-gray-500">Processing...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleReset}
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md transition-colors"
              >
                Upload New
              </button>
              {processedImage && (
                <button
                  onClick={handleDownload}
                  className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors"
                >
                  Download
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>✨ AI-powered • Custom backgrounds • 100% Free</p>
      </div>
    </section>
  );
}