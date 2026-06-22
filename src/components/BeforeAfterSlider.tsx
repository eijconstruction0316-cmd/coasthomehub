"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  height?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE (1980s Original)",
  afterLabel = "AFTER (CoastAI Renovation)",
  height = "380px",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none"
      style={{
        height,
        width: "100%",
        borderRadius: "24px",
        boxShadow: "0 24px 64px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.08)",
        cursor: isDragging ? "ew-resize" : "default",
      }}
    >
      {/* Before Image (Base layer) */}
      <div className="absolute inset-0 w-100 h-100">
        <Image
          src={beforeImage}
          alt="Before renovation"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          style={{ objectFit: "cover", pointerEvents: "none" }}
        />
        <div
          className="absolute left-6 top-6 px-4 py-2 text-xs font-bold tracking-wider text-white"
          style={{
            background: "rgba(239, 68, 68, 0.75)",
            backdropFilter: "blur(8px)",
            borderRadius: "50px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          {beforeLabel}
        </div>
      </div>

      {/* After Image (Top layer, cropped) */}
      <div
        className="absolute inset-0 h-100"
        style={{
          width: `${sliderPosition}%`,
          overflow: "hidden",
          borderRight: "1px solid rgba(255, 255, 255, 0.3)",
          transition: isDragging ? "none" : "width 0.1s ease-out",
        }}
      >
        <div
          style={{
            width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "500px",
            height: "100%",
            position: "relative",
          }}
        >
          <Image
            src={afterImage}
            alt="After renovation"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            style={{ objectFit: "cover", pointerEvents: "none" }}
          />
        </div>
        <div
          className="absolute right-6 top-6 px-4 py-2 text-xs font-bold tracking-wider text-white"
          style={{
            background: "rgba(31, 122, 114, 0.85)",
            backdropFilter: "blur(8px)",
            borderRadius: "50px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            whiteSpace: "nowrap",
          }}
        >
          ✨ {afterLabel}
        </div>
      </div>

      {/* Sliding Handle Bar */}
      <div
        className="absolute top-0 bottom-0 flex items-center justify-center"
        style={{
          left: `${sliderPosition}%`,
          width: "2px",
          backgroundColor: "#ffffff",
          zIndex: 10,
          cursor: "ew-resize",
          transition: isDragging ? "none" : "left 0.1s ease-out",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Handle circle */}
        <div
          className="absolute flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            border: "4px solid var(--ocean-500)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
            color: "var(--ocean-500)",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          ↔
        </div>
      </div>

      {/* Helper text on overlay hover */}
      <div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-xs text-white opacity-80 pointer-events-none transition-opacity hover:opacity-0"
        style={{
          background: "rgba(26, 35, 50, 0.7)",
          backdropFilter: "blur(4px)",
          letterSpacing: "0.05em",
        }}
      >
        Drag the slider to compare Before & After
      </div>
    </div>
  );
}
