"use client";
import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Code, Rocket, Zap, ArrowRight } from "lucide-react";

export default function WelcomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseVisible, setIsMouseVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (isInside) {
          setMousePosition({ x: e.clientX, y: e.clientY });
          setIsMouseVisible(true);
        } else {
          setIsMouseVisible(false);
        }
      }
    };

    const handleMouseLeave = () => setIsMouseVisible(false);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const tools = [
    { name: "JSON Beautifier", emoji: "✨", color: "from-purple-500 to-pink-500" },
    { name: "HTML Viewer", emoji: "🌐", color: "from-pink-500 to-red-500" },
    { name: "Number to Words", emoji: "🔢", color: "from-blue-500 to-cyan-500" },
    { name: "SQL Formatter", emoji: "💾", color: "from-green-500 to-emerald-500" },
    { name: "Image to Base64", emoji: "🖼️", color: "from-orange-500 to-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden relative">
      {/* Main Content */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div
            ref={heroRef}
            className="text-center mb-16 min-h-[80vh] flex flex-col justify-center relative overflow-hidden rounded-3xl"
          >
            {/* Mouse Tracker Circle */}
            {isMouseVisible && windowSize.width > 0 && (
              <>
                <div
                  className="fixed pointer-events-none z-50"
                  style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    transform: "translate(-50%, -50%)",
                    width: "300px",
                    height: "300px",
                    background:
                      "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 70%)",
                    borderRadius: "50%",
                    transition: "all 0.3s ease-out",
                  }}
                />
                <div
                  className="fixed pointer-events-none z-50"
                  style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    transform: "translate(-50%, -50%)",
                    width: "20px",
                    height: "20px",
                    border: "2px solid rgba(168, 85, 247, 0.5)",
                    borderRadius: "50%",
                    transition: "all 0.1s ease-out",
                  }}
                />
              </>
            )}

            {/* Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute w-96 h-96 bg-purple-400/30 rounded-full blur-3xl"
                style={{
                  top: "10%",
                  left: "10%",
                  animation: "float 15s ease-in-out infinite",
                  transform: isMouseVisible && windowSize.width > 0
                    ? `translate(${(mousePosition.x - windowSize.width / 2) * 0.05}px, ${
                        (mousePosition.y - windowSize.height / 2) * 0.05
                      }px)`
                    : "translate(0, 0)",
                  transition: "transform 0.5s ease-out",
                }}
              />
              <div
                className="absolute w-[500px] h-[500px] bg-pink-400/30 rounded-full blur-3xl"
                style={{
                  bottom: "5%",
                  right: "5%",
                  animation: "float 20s ease-in-out infinite reverse",
                  transform: isMouseVisible && windowSize.width > 0
                    ? `translate(-${
                        (mousePosition.x - windowSize.width / 2) * 0.03
                      }px, -${
                        (mousePosition.y - windowSize.height / 2) * 0.03
                      }px)`
                    : "translate(0, 0)",
                  transition: "transform 0.5s ease-out",
                }}
              />
              <div
                className="absolute w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: isMouseVisible && windowSize.width > 0
                    ? `translate(${(mousePosition.x - windowSize.width / 2) * 0.08}px, ${
                        (mousePosition.y - windowSize.height / 2) * 0.08
                      }px)`
                    : "translate(-50%, -50%)",
                  transition: "transform 0.3s ease-out",
                }}
              />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => {
                const baseX = (i * 37) % 100;
                const baseY = (i * 73) % 100;
                let offsetX = 0;
                let offsetY = 0;

                if (isMouseVisible && heroRef.current) {
                  const rect = heroRef.current.getBoundingClientRect();
                  const particleX = rect.left + (rect.width * baseX) / 100;
                  const particleY = rect.top + (rect.height * baseY) / 100;
                  const distance = Math.sqrt(
                    Math.pow(mousePosition.x - particleX, 2) +
                      Math.pow(mousePosition.y - particleY, 2)
                  );
                  const force = Math.max(0, 150 - distance / 2);
                  const angle = Math.atan2(
                    mousePosition.y - particleY,
                    mousePosition.x - particleX
                  );
                  offsetX = Math.cos(angle) * force * 0.3;
                  offsetY = Math.sin(angle) * force * 0.3;
                }

                return (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-purple-400/40 rounded-full"
                    style={{
                      left: `${baseX}%`,
                      top: `${baseY}%`,
                      animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 5}s`,
                      transform: `translate(${offsetX}px, ${offsetY}px)`,
                      transition: "transform 0.3s ease-out",
                    }}
                  />
                );
              })}
            </div>

            {/* Text Content */}
            <div className="relative z-10">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                  ✨ Built for Developers
                </span>
              </div>

              <h2
                className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight"
                style={{
                  transform: isMouseVisible && windowSize.width > 0
                    ? `perspective(1000px) rotateX(${
                        (mousePosition.y - windowSize.height / 2) * 0.015
                      }deg) rotateY(${
                        (mousePosition.x - windowSize.width / 2) * 0.015
                      }deg)`
                    : "none",
                  transition: "transform 0.3s ease-out",
                }}
              >
                <span
                  className="inline-block"
                  style={{ animation: "wave 2s ease-in-out infinite" }}
                >
                  👋
                </span>{" "}
                <span className="text-gray-800">Welcome to</span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  CodeBeauty
                </span>
              </h2>

              <p
                className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
                style={{
                  transform: isMouseVisible && windowSize.width > 0
                    ? `translateX(${(mousePosition.x - windowSize.width / 2) * 0.01}px)`
                    : "none",
                  transition: "transform 0.3s ease-out",
                }}
              >
                Empower your creativity — build, learn, and explore{" "}
                <span className="font-semibold text-purple-600">
                  powerful developer tools
                </span>{" "}
                with clean design and seamless experience.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Try JSON Formatter
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="px-8 py-4 bg-white text-purple-700 text-lg font-semibold rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                  🖼️ Convert Image to Base64
                </button>
              </div>

              {/* Floating Icons */}
              <div className="flex items-center justify-center gap-8 flex-wrap">
                {[
                  { Icon: Code, color: "text-purple-600", delay: "0s", baseX: -100 },
                  { Icon: Rocket, color: "text-pink-600", delay: "0.5s", baseX: 0 },
                  { Icon: Sparkles, color: "text-blue-600", delay: "1s", baseX: 100 },
                ].map((item, idx) => {
                  let offsetX = 0;
                  let offsetY = 0;

                  if (isMouseVisible && heroRef.current) {
                    const rect = heroRef.current.getBoundingClientRect();
                    const iconX = rect.left + rect.width / 2 + item.baseX;
                    const iconY = rect.top + rect.height / 2 + 250;
                    const distX = mousePosition.x - iconX;
                    const distY = mousePosition.y - iconY;
                    const distance = Math.sqrt(distX * distX + distY * distY);
                    const maxDistance = 250;
                    const force = Math.max(0, 1 - distance / maxDistance);
                    offsetX = distX * force * 0.4;
                    offsetY = distY * force * 0.4;
                  }

                  return (
                    <div
                      key={idx}
                      className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer"
                      style={{
                        animation: `float 3s ease-in-out infinite ${item.delay}`,
                        transform: `translate(${offsetX}px, ${offsetY}px)`,
                        transition: "transform 0.3s ease-out",
                      }}
                    >
                      <item.Icon className={`w-8 h-8 ${item.color}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Popular Functionality */}
          <div className="mt-20">
            <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">
              Popular Functionality
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {tools.map((tool, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-200"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  >
                    {tool.emoji}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {tool.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-20deg); }
        }
      `}</style>
    </div>
  );
}