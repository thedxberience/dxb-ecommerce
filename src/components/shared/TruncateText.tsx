"use client";
import React, { useLayoutEffect, useRef, useState, CSSProperties } from "react";

type TruncateTextProps = {
  /** Exact container height in px */
  height: number;
  /** The full string you want to show/truncate */
  text: string;
  /** Optional extra styles (width must be set somehow!) */
  style?: CSSProperties;
  /** Optional className */
  className?: string;
};

export function TruncateText({
  height,
  text,
  style,
  className
}: TruncateTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState(text);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // reset to full text to measure
    el.textContent = text;
    // if it already fits, nothing to do
    if (el.scrollHeight <= height) {
      setDisplayText(text);
      return;
    }

    // binary-search the longest substring that fits
    let low = 0;
    let high = text.length;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      el.textContent = text.slice(0, mid) + "…";

      if (el.scrollHeight <= height) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    // low is now the first length that overflows
    const fitText = text.slice(0, low - 1) + "…";
    setDisplayText(fitText);
  }, [text, height]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        height, // exact height
        overflow: "hidden", // clip anything beyond
        whiteSpace: "normal", // allow wrapping
        ...style
      }}
    >
      {displayText}
    </div>
  );
}
