"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Upload, X, Check, Share2, Download, Link } from 'lucide-react';

export default function RandomToolsPage() {
  const [step, setStep] = useState('upload');
  const [file, setFile] = useState(null);
  const [shareLink, setShareLink] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [peerId, setPeerId] = useState('');
  const [status, setStatus] = useState('disconnected');
  const [progress, setProgress] = useState(0);
  const [receivedFile, setReceivedFile] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const peerRef = useRef(null);
  const connectionRef = useRef(null);
  const fileInputRef = useRef(null);
  const receivedChunksRef = useRef([]);
  const fileInfoRef = useRef(null);

  useEffect(() => {
    const id = Math.random().toString(36).substring(2, 15);
    setPeerId(id);
    
    const urlParams = new URLSearchParams(window.location.search);
    const shareId = urlParams.get('share');
    if (shareId) {
      setStep('receiving');
      initializeReceiver(shareId);
    }
  }, []);

  const generateQRCode = (text) => {
    const size = 200;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
    return qrUrl;
  };

  const initializeSender = async () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    });
    
    peerRef.current = pc;
    
    const channel = pc.createDataChannel('fileTransfer', {
      ordered: true
    });
    
    setupDataChannel(channel, 'sender');
    
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    
    const shareId = peerId;
    const domain = window.location.origin;
    const link = `${domain}?share=${shareId}`;
    setShareLink(link);
    setQrCode(generateQRCode(link));
    
    window.shareData = window.shareData || {};
    window.shareData[shareId] = {
      offer: offer,
      file: file,
      sender: pc
    };
    
    setStep('sharing');
    setStatus('waiting');
  };

  const initializeReceiver = async (shareId) => {
    const shareData = window.shareData?.[shareId];
    
    if (!shareData) {
      alert('Invalid or expired share link');
      return;
    }
    
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    });
    
    peerRef.current = pc;
    
    pc.ondatachannel = (event) => {
      setupDataChannel(event.channel, 'receiver');
    };
    
    await pc.setRemoteDescription(shareData.offer);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    
    await shareData.sender.setRemoteDescription(answer);
    
    setStatus('connected');
  };

  const setupDataChannel = (channel, role) => {
    connectionRef.current = channel;
    
    channel.onopen = () => {
      setStatus('connected');
      if (role === 'sender') {
        sendFile();
      }
    };
    
    channel.onclose = () => {
      setStatus('disconnected');
    };
    
    if (role === 'receiver') {
      channel.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'fileInfo') {
            fileInfoRef.current = data;
            receivedChunksRef.current = [];
            setProgress(0);
          } else if (data.type === 'chunk') {
            receivedChunksRef.current.push(data.data);
            const currentProgress = (receivedChunksRef.current.length / data.totalChunks) * 100;
            setProgress(Math.round(currentProgress));
            
            if (receivedChunksRef.current.length === data.totalChunks) {
              const blob = new Blob(receivedChunksRef.current.map(chunk => 
                Uint8Array.from(atob(chunk), c => c.charCodeAt(0))
              ), { type: fileInfoRef.current.type });
              
              setReceivedFile({
                blob: blob,
                name: fileInfoRef.current.name,
                size: fileInfoRef.current.size
              });
              setProgress(100);
            }
          }
        } catch (error) {
          console.error('Error receiving data:', error);
        }
      };
    }
  };

  const sendFile = async () => {
    if (!file || !connectionRef.current || connectionRef.current.readyState !== 'open') {
      return;
    }
    
    setProgress(0);
    
    connectionRef.current.send(JSON.stringify({
      type: 'fileInfo',
      name: file.name,
      size: file.size,
      type: file.type
    }));
    
    const chunkSize = 16384;
    const totalChunks = Math.ceil(file.size / chunkSize);
    
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      
      const reader = new FileReader();
      await new Promise((resolve) => {
        reader.onload = () => {
          const base64 = btoa(
            new Uint8Array(reader.result).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          
          connectionRef.current.send(JSON.stringify({
            type: 'chunk',
            data: base64,
            totalChunks: totalChunks
          }));
          
          setProgress(Math.round(((i + 1) / totalChunks) * 100));
          resolve();
        };
        reader.readAsArrayBuffer(chunk);
      });
      
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  };

  const handleFileSelect = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      initializeSender();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Copy failed');
    }
  };

  const downloadReceivedFile = () => {
    if (!receivedFile) return;
    
    const url = URL.createObjectURL(receivedFile.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = receivedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const resetApp = () => {
    setStep('upload');
    setFile(null);
    setShareLink('');
    setQrCode('');
    setProgress(0);
    setReceivedFile(null);
    setStatus('disconnected');
    if (connectionRef.current) {
      connectionRef.current.close();
    }
    if (peerRef.current) {
      peerRef.current.close();
    }
  };

  if (step === 'receiving') {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {!receivedFile ? (
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-slate-700">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-4 shadow-lg shadow-orange-500/50">
                  <Download size={36} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Receiving File</h2>
                <p className="text-slate-400">Connecting to sender...</p>
              </div>

              {status === 'connected' && progress > 0 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>Downloading...</span>
                      <span className="font-semibold text-orange-400">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-4 rounded-full transition-all duration-300 shadow-lg shadow-orange-500/50"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {status === 'disconnected' && (
                <div className="text-center py-6">
                  <div className="animate-spin w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-slate-400 mt-4">Establishing connection...</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-slate-700">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 shadow-lg shadow-green-500/50">
                  <Check size={36} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">File Received!</h2>
              </div>

              <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-5 mb-6 border border-slate-600">
                <p className="text-white font-semibold text-lg truncate">{receivedFile.name}</p>
                <p className="text-slate-400 text-sm mt-1">{formatFileSize(receivedFile.size)}</p>
              </div>

              <button
                onClick={downloadReceivedFile}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 flex items-center justify-center gap-2"
              >
                <Download size={22} />
                Download File
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === 'sharing') {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 overflow-hidden">
        <div className="max-w-md w-full">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-slate-700 relative">
            <button
              onClick={resetApp}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-all hover:rotate-90 duration-300"
            >
              <X size={24} />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-1 truncate">{file.name}</h2>
              <p className="text-slate-400 text-lg">{formatFileSize(file.size)}</p>
            </div>

            <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 mb-6 font-mono text-sm text-slate-300 break-all border border-slate-600">
              {shareLink}
            </div>

            {qrCode && (
              <div className="bg-white rounded-xl p-5 mb-6 flex justify-center shadow-lg">
                <img src={qrCode} alt="QR Code" className="w-48 h-48" />
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 mb-6">
              <button className="bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-full p-4 flex items-center justify-center transition-all shadow-lg hover:scale-105">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
              <button className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full p-4 flex items-center justify-center transition-all shadow-lg hover:scale-105">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="bg-gradient-to-br from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 rounded-full p-4 flex items-center justify-center transition-all shadow-lg hover:scale-105">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 text-slate-300 hover:text-white transition cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-orange-500" />
                <span className="text-sm">Share with nearby devices</span>
              </label>
              <label className="flex items-center gap-3 text-slate-300 hover:text-white transition cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-orange-500" />
                <span className="text-sm">Use fallback when no direct connection can be made</span>
              </label>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-yellow-500 font-semibold mb-2 flex items-center gap-2">
                ⚠️ Please note:
              </p>
              <p className="text-yellow-200 text-sm leading-relaxed">
                Closing this page means you stop sharing! Keep this page open in the background to continue sharing.
              </p>
            </div>

            {status === 'connected' && progress > 0 && (
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Sending...</span>
                  <span className="font-semibold text-orange-400">{progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-4 rounded-full transition-all duration-300 shadow-lg shadow-orange-500/50"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-1">
            <input
              ref={fileInputRef}
              type="file"
              onChange={(e) => handleFileSelect(e.target.files[0])}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`bg-slate-800/50 backdrop-blur-sm rounded-3xl border-4 border-dashed ${
                isDragging ? 'border-orange-500 bg-slate-700/50 scale-105' : 'border-slate-600'
              } p-16 cursor-pointer hover:border-orange-500 hover:bg-slate-700/50 transition-all duration-300 shadow-2xl`}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-6 shadow-lg shadow-orange-500/50 animate-pulse">
                  <Upload size={48} className="text-white" />
                </div>
                <p className="text-white text-2xl font-semibold mb-3">
                  Drop your file here
                </p>
                <p className="text-slate-400 text-lg">
                  or click to browse
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-white space-y-6 order-2">
            <div>
              <h1 className="text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Share files directly from your device
              </h1>
              <p className="text-slate-300 text-xl">
                Send files of any size directly from your device without ever storing anything online.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 hover:border-orange-500 transition-all">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="bg-orange-500/10 p-2 rounded-lg">
                    <Link size={20} className="text-orange-500" />
                  </div>
                  <span className="font-medium">No size limit</span>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 hover:border-orange-500 transition-all">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="bg-orange-500/10 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                  <span className="font-medium">Peer-to-peer</span>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 hover:border-orange-500 transition-all">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="bg-orange-500/10 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="font-medium">Blazingly fast</span>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 hover:border-orange-500 transition-all">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="bg-orange-500/10 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="font-medium">Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}